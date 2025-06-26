import React from 'react';
import { Drawer, List, ListItem, Box, ListItemButton, ListItemText, Avatar, Divider } from '@mui/material';
import theme from '../../theme';

interface SideDrawerMenuProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
  isLoggedIn: boolean;
}

const SideDrawerMenu: React.FC<SideDrawerMenuProps> = ({ open, onClose, onNavigate, isLoggedIn }) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
      <Avatar
          sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
          src="https://yt3.ggpht.com/grfYgQadT8iNg9WPb-jkrKB-9224y_DBDXAOtV4Yt7cyQmtR47J_453uveQOTDsp_dRSH851TMM=s108-c-k-c0x00ffffff-no-rj"
      />
      </Box>
      <Divider />
 
      <Box sx={{ width: 250 }} role="presentation" onClick={onClose} onKeyDown={onClose}>
        <List>
          <ListItem disablePadding >
            <ListItemButton onClick={() => onNavigate('/home')}>
                <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding >
            <ListItemButton onClick={() => onNavigate('/question')}>
                <ListItemText primary="Dúvidas (bairros)" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={() => onNavigate('/login')}>
            <ListItemButton  onClick={() => onNavigate('/login')}>
                <ListItemText primary={isLoggedIn ? 'Logout' : 'Login'} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default SideDrawerMenu;
