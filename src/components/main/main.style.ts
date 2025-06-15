import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const Content = styled(Box)(({ theme }) => ({
  marginTop: '60px', // ← Ajuste este valor conforme a altura real do seu Header
  padding: theme.spacing(2),
  minHeight: '100vh', // ← Importante para forçar o Content a ocupar toda a tela
  boxSizing: 'border-box',
}));