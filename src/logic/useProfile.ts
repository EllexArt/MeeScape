import { useState, useEffect } from 'react';

const PROFILE_KEY = 'meescape_profile';

export function useProfile() {
  // Chargement initial depuis le localStorage
  const [profile, setProfileState] = useState(() => {
    const saved = localStorage.getItem(PROFILE_KEY);
    return saved
      ? JSON.parse(saved)
      : {
          name: 'Ellexart ✨',
          avatar: 'user.png',
          status: 'online',
          role: 'Apprenant',
          language: 'fr',
        };
  });

  // Sauvegarde automatique à chaque modification
  useEffect(() => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  }, [profile]);

  // Setter qui déclenche la sauvegarde
  const setProfile = (p: typeof profile) => {
    setProfileState(p);
  };

  return { profile, setProfile };
}
