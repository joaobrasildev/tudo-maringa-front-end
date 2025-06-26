import { Box, Button, IconButton, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import tudoMaringaLogo from '../../assets/tudomaringa_logo.png';
import { HeaderContainer, NavContainer, Logo } from './header.style';
import { useAuth } from '../../providers/auth.provider';
import SideDrawerMenu from '../menu/SideMenu';

const Header = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isLoggedIn, logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleAuth = () => {
    if (isLoggedIn) {
      logout();
      navigate('/login');
    } else {
      navigate('/home');
    }
  };

  const handleNavigate = (route: string) => {
    navigate(route);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <HeaderContainer as="header">
      {/* <Logo src={tudoMaringaLogo} alt="TUDO Maringá Logo" /> */}
      <Box sx={{ flexGrow: 1 }} />
      <IconButton color="inherit" onClick={() => setMenuOpen(true)}>
        <MenuIcon />
      </IconButton>

      <SideDrawerMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={handleNavigate}
        isLoggedIn={isLoggedIn}
      />
    </HeaderContainer>
  );
};

export default Header;