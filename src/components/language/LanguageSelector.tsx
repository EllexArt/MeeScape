import React from 'react';
import { availableLanguages } from '../../logic/useLanguage';

type LanguageSelectorProps = {
  lang: string;
  setLang: (lang: string) => void;
};

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ lang, setLang }) => (
  <select className="language-selector" value={lang} onChange={e => setLang(e.target.value)}>
    {availableLanguages.map(l => (
      <option key={l.code} value={l.code}>{l.label}</option>
    ))}
  </select>
);

export default LanguageSelector;
