import React, { useState } from 'react';

import AppLayout from './components/AppLayout';
import HomePage from './pages/HomePage';
import { useDialogue } from './logic/useDialogue';
import { useLanguage } from './logic/useLanguage';
import { useProfile } from './logic/useProfile';
import { useChannel } from './logic/useChannel';
import { SavesManager } from './components/saves-manager';
import { Channel } from './types/channel.type';

const App = () => {
  const [showHome, setShowHome] = useState(true);
  const [showSaves, setShowSaves] = useState(false);
  
  const { lang, setLang } = useLanguage('fr');
  const { profile, setProfile } = useProfile();
  const { currentChannel, setCurrentChannel } = useChannel();
  const { messages, choices, onChoice, resetDialogue } = useDialogue('start');

  // Quitter l'application (Electron)
  const handleQuit = () => {
    if (confirm('Êtes-vous sûr de vouloir quitter ?')) {
      window.close();
    }
  };

  // Obtenir l'état actuel du jeu pour la sauvegarde
  const getCurrentGameState = () => ({
    profile,
    lang,
    currentChannel,
    messages,
    timestamp: new Date().toISOString()
  });

  // Charger une sauvegarde
  const handleLoadSave = (data: unknown) => {
    const saveData = data as {
      profile?: unknown;
      lang?: string;
      currentChannel?: Channel;
    };
    if (saveData.profile) setProfile(saveData.profile);
    if (saveData.lang) setLang(saveData.lang);
    if (saveData.currentChannel) setCurrentChannel(saveData.currentChannel);
    // Pour les messages, il faudrait une fonction dans useDialogue
    // Pour l'instant, on recharge juste l'app
    setShowSaves(false);
    setShowHome(false);
  };

  // Commencer une nouvelle partie
  const handleStart = () => {
    resetDialogue();
    setShowHome(false);
  };

  if (showHome) {
    return (
      <HomePage 
        onStart={handleStart} 
        onLoadSave={handleLoadSave}
      />
    );
  }

  return (
    <>
      <AppLayout
        lang={lang}
        setLang={setLang}
        profile={profile}
        setProfile={setProfile}
        currentChannel={currentChannel}
        messages={messages}
        choices={choices || []}
        onChoice={onChoice}
        onQuit={handleQuit}
        onReset={resetDialogue}
        goHome={() => setShowHome(true)}
        onShowSaves={() => setShowSaves(true)}
      />
      
      {/* Saves Manager Modal */}
      {showSaves && (
        <SavesManager
          currentGameState={getCurrentGameState()}
          onLoad={handleLoadSave}
          onClose={() => setShowSaves(false)}
        />
      )}
    </>
  );
};

export default App;