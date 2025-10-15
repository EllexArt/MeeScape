import { useState, useEffect, useCallback } from 'react';
import { getNodeById } from './dialogueEngine';

const DIALOGUE_KEY = 'meescape_dialogue';

export function useDialogue(initialId = 'start') {
  // Chargement initial depuis le localStorage
  const [currentId, setCurrentId] = useState(() => {
    const saved = localStorage.getItem(DIALOGUE_KEY);
    return saved ? JSON.parse(saved).currentId : initialId;
  });
  const [messages, setMessages] = useState<any[]>(() => {
    const saved = localStorage.getItem(DIALOGUE_KEY);
    return saved ? JSON.parse(saved).messages : [];
  });
  const node = getNodeById(currentId);

  useEffect(() => {
    if (node && (!messages.length || messages[messages.length - 1].id !== node.id)) {
      setMessages(prev => [
        ...prev,
        {
          ...node,
          // Add role: 'BOT' for MEE6
          role: node.character === 'MEE6' ? 'BOT' : undefined
        }
      ]);
    }
    // eslint-disable-next-line
  }, [currentId]);

  // Sauvegarde automatique à chaque modification
  useEffect(() => {
    localStorage.setItem(DIALOGUE_KEY, JSON.stringify({ currentId, messages }));
  }, [currentId, messages]);

  const makeChoice = useCallback((nextId: string, choiceText?: string) => {
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
      const choice = node?.choices?.find((c: any) => c.next === nextId);
      makeChoice(nextId, choice?.text);
    };
  }, [node, makeChoice]);

  // Fonction pour réinitialiser la sauvegarde
  const resetDialogue = () => {
    setCurrentId(initialId);
    setMessages([]);
    localStorage.removeItem(DIALOGUE_KEY);
  };

  return {
    messages,
    choices: node?.choices,
    onChoice: getChoiceHandler(),
    resetDialogue,
  };
}
