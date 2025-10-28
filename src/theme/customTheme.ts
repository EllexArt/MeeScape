import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6a1b9a',
    },
    secondary: {
      main: '#ffb300',
    },
    background: {
      default: '#e3f2fd',
      paper: '#fffde7',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default customTheme;
