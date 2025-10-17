import React from 'react';
import { Box, IconButton, Tooltip, Avatar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import StorageIcon from '@mui/icons-material/Storage';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { RestartAlt } from '@mui/icons-material';

type Server = {
  id: string;
  name: string;
  icon: string;
};

const servers: Server[] = [
  { id: '1', name: 'MeeScape', icon: '🟣' },
];

type ServerListProps = {
  onQuit?: () => void;
  onReset?: () => void;
  goHome?: () => void;
  onShowSaves?: () => void;
};

const ServerList: React.FC<ServerListProps> = ({
  onQuit,
  onReset,
  goHome,
  onShowSaves
}) => {
  return (
    <Box
      className="server-list"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 72,
        p: 1,
        gap: 1,
      }}
    >
      {/* Liste des serveurs */}
      <Box  className={'server-icon'} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {servers.map((server) => (
          <Tooltip key={server.id} title={server.name} placement="right">
            <Avatar sx={{ bgcolor: 'primary.main' }}>{server.icon}</Avatar>
          </Tooltip>
        ))}
      </Box>

      {/* Séparateur */}
      <Box
       sx={{ 
        width: '32px', 
        height: '2px', 
        background: '#232428', 
        borderRadius: '1px',
        margin: '4px 0'
      }}></Box>

      {/* Actions */}
      <Box className="server-actions" sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
        {goHome && (
          <Tooltip title="Accueil" placement="right">
            <IconButton className="server-action-btn" color="primary" onClick={goHome}>
              <HomeIcon />
            </IconButton>
          </Tooltip>
        )}
        {onShowSaves && (
          <Tooltip title="Sauvegardes" placement="right">
            <IconButton className="server-action-btn"  color="primary" onClick={onShowSaves}>
              <StorageIcon />
            </IconButton>
          </Tooltip>
        )}
        {onReset && (
          <Tooltip title="Réinitialiser" placement="right">
            <IconButton className="server-action-btn" color="warning" onClick={onReset}>
              <RestartAlt />
            </IconButton>
          </Tooltip>
        )}
        {onQuit && (
          <Tooltip title="Quitter" placement="right">
            <IconButton className="server-action-btn" color="error" onClick={onQuit}>
              <PowerSettingsNewIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};

export default ServerList;
