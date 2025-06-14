import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const FooterContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  backgroundColor: 'var(--color-bg-alt)',
  textAlign: 'center',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  marginTop: 'auto',
}));