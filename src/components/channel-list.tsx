import React from 'react';
import { Box, Typography, List, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import Image from '../assets/banner.png'; // Assure-toi que ton loader webpack gère les images

type Channel = {
  id: string;
  name: string;
  type: 'text' | 'voice';
  icon: string;
};

const channels: Channel[] = [
  { id: '1', name: 'annonce', type: 'text', icon: '❗' },
  { id: '2', name: 'général-bazar', type: 'text', icon: '📢' },
  { id: '3', name: 'général-apprentissage', type: 'text', icon: '📚' },
  { id: '4', name: 'réactions-duo', type: 'text', icon: '🌸' },
  { id: '5', name: 'multimédia', type: 'text', icon: '🎬' },
  { id: '6', name: 'help-discord', type: 'text', icon: '🆘' },
  { id: '7', name: 'Vocal 1', type: 'voice', icon: '🔊' },
  { id: '8', name: 'Vocal 2', type: 'voice', icon: '🔊' },
];

const ChannelList: React.FC = () => (
  <Box
    component="aside"
    sx={{
      width: 250,
      bgcolor: 'background.paper',
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
        Tiboudouboudou
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
);

export default ChannelList;
