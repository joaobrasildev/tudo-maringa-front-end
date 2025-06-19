import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const Content = styled(Box)(({ theme }) => ({
  marginTop: '60px',
  padding: theme.spacing(2),
  boxSizing: 'border-box',
  flex: 1
}));