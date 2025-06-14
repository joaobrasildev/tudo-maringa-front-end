// src/theme.js
import { createTheme } from '@mui/material/styles';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
// ou: import '@fontsource/roboto/300.css'; ... caso opte por Roboto

const theme = createTheme({
  palette: {
    primary: {
      main: '#009b3a',
      dark: '#007b2e',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#f2f2f2',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#5f6368',
    },
  },
  typography: {
    fontFamily: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`, // usa Inter > Roboto > fallback
    h3: {
      fontWeight: 400,
      fontSize: '2.25rem',
    },
    h6: {
      fontWeight: 300,
      fontSize: '1.25rem',
    },
  },
});
export default theme;
