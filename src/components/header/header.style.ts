import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const HeaderContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  zIndex: 1100,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  display: 'flex',
  alignItems: 'center',
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  borderRadius: '0 0 16px 16px',
  margin: '0 auto',
  boxShadow: theme.shadows[4],
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
