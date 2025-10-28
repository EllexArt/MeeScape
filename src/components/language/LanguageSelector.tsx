import React from 'react';
import { Select, MenuItem, FormControl } from '@mui/material';
import { languageSelectorStyles } from '../../theme/styles';

interface LanguageSelectorProps {
  lang: string;
  setLang: (lang: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ lang, setLang }) => (
  <FormControl size="small">
    <Select
      value={lang}
      onChange={(e) => setLang(e.target.value)}
      sx={{
        ...languageSelectorStyles,
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none'
        },
        '&.Mui-focused': {
          border: '1px solid #5865f2',
        }
      }}
    >
      <MenuItem value="fr">Français</MenuItem>
      <MenuItem value="en">English</MenuItem>
    </Select>
  </FormControl>
);

export default LanguageSelector;