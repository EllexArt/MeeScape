import { useState, useEffect, useCallback, useRef } from 'react';
import { getNodeById, setLanguage, getCurrentLanguage } from './dialogueEngine';
import { Message } from '../types/message.type';

const DIALOGUE_KEY = 'meescape_dialogue';

export function useDialogue(initialId = 'start', lang = 'fr') {
  const previousLang = useRef(lang);
  const [currentId, setCurrentId] = useState(initialId);
  const [messages, setMessages] = useState<Message[]>([]);
  const [initialized, setInitialized] = useState(false);

  // ⚠️ Définir la langue au montage ET quand elle change
  useEffect(() => {
    console.log('🌍 Setting language to:', lang);
    setLanguage(lang);
    
    // Si la langue a vraiment changé (pas juste le premier render)
    if (previousLang.current !== lang && initialized) {
      console.log('🔄 Language changed from', previousLang.current, 'to', lang, '- reloading dialogue...');
      setCurrentId(initialId);
      setMessages([]);
      setInitialized(false);
      localStorage.removeItem(DIALOGUE_KEY);
    }
    
    previousLang.current = lang;
  }, [lang, initialId, initialized]);

  // Récupérer le nœud actuel
  const node = getNodeById(currentId);

  // Initialiser avec le premier message
  useEffect(() => {
    if (!initialized && node) {
      console.log('✅ Initializing with first node:', node);
      setMessages([{
        ...node,
        role: node.character === 'MEE6' ? 'BOT' : undefined
      }]);
      setInitialized(true);
    }
  }, [node, initialized]);

  // Ajouter un nouveau message quand currentId change (mais pas à l'init)
  useEffect(() => {
    if (initialized && node && currentId !== initialId) {
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage || lastMessage.id !== node.id) {
        console.log('➕ Adding new node:', node);
        setMessages(prev => [
          ...prev,
          {
            ...node,
            role: node.character === 'MEE6' ? 'BOT' : undefined
          }
        ]);
      }
    }
  }, [currentId, node, initialized, initialId, messages]);

  // Sauvegarder
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(DIALOGUE_KEY, JSON.stringify({ 
        currentId, 
        messages,
        lang: getCurrentLanguage()
      }));
    }
  }, [currentId, messages]);

  const makeChoice = useCallback((nextId: string, choiceText?: string) => {
    console.log('🎯 Choice made:', nextId, choiceText);
    
    if (choiceText) {
      setMessages(prev => [
        ...prev,
        {
          character: 'Vous',
          avatar: 'user.png',
          text: choiceText,
        },
      ]);
    }
    
    setCurrentId(nextId);
  }, []);

  const getChoiceHandler = useCallback(() => {
    return (nextId: string) => {
      const choice = node?.choices?.find((c) => c.next === nextId);
      makeChoice(nextId, choice?.text);
    };
  }, [node, makeChoice]);

  const resetDialogue = useCallback(() => {
    console.log('🔄 Resetting dialogue');
    setCurrentId(initialId);
    setMessages([]);
    setInitialized(false);
    localStorage.removeItem(DIALOGUE_KEY);
  }, [initialId]);

  console.log('📊 Current state:', {
    currentId,
    messagesCount: messages.length,
    hasNode: !!node,
    choices: node?.choices?.length || 0,
    initialized,
    lang
  });

  return {
    messages,
    choices: node?.choices,
    onChoice: getChoiceHandler(),
    resetDialogue,
  };
}