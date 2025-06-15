import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const AppContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  overflowX: 'hidden',
}));