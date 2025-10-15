import { useState } from 'react';

export const availableLanguages = [
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
];

export function useLanguage(defaultLang = 'fr') {
  const [lang, setLang] = useState(defaultLang);
  return { lang, setLang, availableLanguages };
}
