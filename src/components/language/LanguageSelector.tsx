import React from 'react';
import { Select, MenuItem, FormControl } from '@mui/material';

type LanguageSelectorProps = {
  lang: string;
  setLang: (lang: string) => void;
};

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ lang, setLang }) => (
  <FormControl size="small">
    <Select
      value={lang}
      onChange={(e) => setLang(e.target.value)}
      className="language-selector"
      sx={{
        bgcolor: '#1e1f22',
        color: '#dbdee1',
        border: '1px solid #1e1f22',
        borderRadius: '4px',
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none'
        },
        '&:hover': {
          border: '1px solid #232428',
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