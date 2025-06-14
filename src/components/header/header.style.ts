import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const HeaderContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.primary.main,  // ← Aqui!
  color: theme.palette.primary.contrastText,    // ← Melhor ainda, usa o texto do theme
  display: 'flex',
  alignItems: 'center',
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  borderRadius: '0 0 16px 16px',
  margin: '0 auto',
}));

export const NavContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  flexGrow: 1,
});

export const Logo = styled('img')({
  height: '50px',
  borderRadius: '16px',
  marginRight: '16px',
});
