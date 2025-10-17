import React from 'react';
import { Box, Typography, List, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import Image from '../assets/banners/banner.jpg'; // Assure-toi que ton loader webpack gère les images
import { useChannel } from '../logic/useChannel';

const ChannelList: React.FC = () => {
  const { channels } = useChannel();
  return (
  <Box
    component="aside"
    sx={{
      width: 250,
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid',
      borderColor: 'divider',
    }}
  >
    <Box sx={{ position: 'relative', p: 1 }}>
      <img src={Image} alt="Bannière du serveur" style={{ width: '100%', borderRadius: 4 }} />
      <Typography
        variant="h6"
        sx={{ position: 'absolute', bottom: 8, left: 8, color: 'white', fontWeight: 'bold' }}
      >
        Duolang Server
      </Typography>
    </Box>

    <List component="nav" dense>
      <Typography variant="subtitle2" sx={{ px: 2, mt: 1 }}>
        Salons et rôles
      </Typography>
      {channels.filter(c => c.type === 'text').map(channel => (
        <ListItemButton key={channel.id}>
          <ListItemIcon>
            <span>{channel.icon}</span>
          </ListItemIcon>
          <ListItemText primary={channel.name} />
        </ListItemButton>
      ))}

      <Divider sx={{ my: 1 }} />

      <Typography variant="subtitle2" sx={{ px: 2, mt: 1 }}>
        Vocaux
      </Typography>
      {channels.filter(c => c.type === 'voice').map(channel => (
        <ListItemButton key={channel.id}>
          <ListItemIcon>
            <span>{channel.icon}</span>
          </ListItemIcon>
          <ListItemText primary={channel.name} />
        </ListItemButton>
      ))}
    </List>
  </Box>
  )
};

export default ChannelList;
