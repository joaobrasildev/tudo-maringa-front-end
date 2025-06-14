import { Box, Button, IconButton, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import tudoMaringaLogo from '../../assets/tudomaringa_logo.webp';
import { HeaderContainer, NavContainer, Logo } from './header.style';

const Header = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isLoggedIn = true; // Troque por lógica real

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleAuth = () => {
    navigate('/');
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
      <Logo src={tudoMaringaLogo} alt="TUDO Maringá Logo" />

      {!isMobile && (
        <>
          <NavContainer>
            <Button color="primary" onClick={() => navigate('/home')}>Home</Button>
            <Button color="primary" onClick={() => navigate('/neighborhoods/00c818c8-c6cf-4d3d-9c13-f65d0a9de03c')}>Bairros</Button>
            <Button color="primary" onClick={() => navigate('/duvidas')}>Perguntas | Dúvidas</Button>
          </NavContainer>

          <Button color="primary" onClick={handleAuth}>
            {isLoggedIn ? 'Logout' : 'Login'}
          </Button>
        </>
      )}

      {isMobile && (
        <>
          <Box sx={{ flexGrow: 1 }} />

          <IconButton color="inherit" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={() => handleMenuItemClick('/home')}>Home</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/neighborhoods/00c818c8-c6cf-4d3d-9c13-f65d0a9de03c')}>Bairros</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/duvidas')}>Perguntas | Dúvidas</MenuItem>
            <MenuItem onClick={handleAuth}>{isLoggedIn ? 'Logout' : 'Login'}</MenuItem>
          </Menu>
        </>
      )}
    </HeaderContainer>
  );
};

export default Header;