import React, { useState } from 'react';

import AppLayout from './components/AppLayout';
import HomePage from './pages/HomePage';
import { useDialogue } from './logic/useDialogue';
import { useLanguage } from './logic/useLanguage';
import { useProfile } from './logic/useProfile';
import { useChannel } from './logic/useChannel';
import { SavesManager, saveCurrent } from './components/saves-manager';

const App = () => {
  const [showHome, setShowHome] = useState(true);
  const [showSaves, setShowSaves] = useState(false);
  const [showSavePopup, setShowSavePopup] = useState(false);
  const [saveName, setSaveName] = useState('');
  const { lang, setLang } = useLanguage('fr');
  const { profile, setProfile } = useProfile();
  const { currentChannel } = useChannel();
  const { messages, choices, onChoice, resetDialogue } = useDialogue('start');

  // Quitter l'application (Electron)
  const handleQuit = () => {
    window.close();
  };

  // Sauvegarder l'état actuel
  const handleSave = () => {
    setShowSavePopup(true);
  };
  const confirmSave = () => {
    saveCurrent(saveName || 'Sauvegarde', {
      profile,
      lang,
      currentChannel,
      messages
    });
    setShowSavePopup(false);
    setShowSaves(true);
    setSaveName('');
  };

  // Charger une sauvegarde
  const handleLoad = (data: any) => {
    // TODO: appliquer la sauvegarde (profile, lang, channel, messages)
    window.location.reload(); // Pour l'instant, recharger l'app
  };

  if (showHome) {
    return <HomePage onStart={() => setShowHome(false)} />;
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
        onSave={handleSave}
        onShowSaves={() => setShowSaves(true)}
      />
      {showSaves && <SavesManager onLoad={handleLoad} onClose={() => setShowSaves(false)} />}
      {showSavePopup && (
        <div className="profile-popup">
          <div className="profile-popup-content">
            <div className="profile-popup-title">Nom de la sauvegarde</div>
            <input
              className="profile-edit-name"
              value={saveName}
              onChange={e => setSaveName(e.target.value)}
              maxLength={30}
              autoFocus
            />
            <div className="profile-popup-actions">
              <button className="profile-popup-btn" onClick={confirmSave}>Valider</button>
              <button className="profile-popup-btn cancel" onClick={() => setShowSavePopup(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;