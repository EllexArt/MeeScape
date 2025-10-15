import React from 'react';
import { Box, IconButton, Tooltip, Avatar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SaveIcon from '@mui/icons-material/Save';
import StorageIcon from '@mui/icons-material/Storage';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

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
  onSave?: () => void;
  onShowSaves?: () => void;
};

const ServerList: React.FC<ServerListProps> = ({
  onQuit,
  onReset,
  goHome,
  onSave,
  onShowSaves
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 72,
        bgcolor: 'background.paper',
        p: 1,
        gap: 1,
      }}
    >
      {/* Liste des serveurs */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {servers.map((server) => (
          <Tooltip key={server.id} title={server.name} placement="right">
            <Avatar sx={{ bgcolor: 'primary.main' }}>{server.icon}</Avatar>
          </Tooltip>
        ))}
      </Box>

      {/* Actions */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
        {goHome && (
          <Tooltip title="Accueil" placement="right">
            <IconButton color="primary" onClick={goHome}>
              <HomeIcon />
            </IconButton>
          </Tooltip>
        )}
        {onShowSaves && (
          <Tooltip title="Sauvegardes" placement="right">
            <IconButton color="primary" onClick={onShowSaves}>
              <StorageIcon />
            </IconButton>
          </Tooltip>
        )}
        {onSave && (
          <Tooltip title="Sauvegarder" placement="right">
            <IconButton color="primary" onClick={onSave}>
              <SaveIcon />
            </IconButton>
          </Tooltip>
        )}
        {onQuit && (
          <Tooltip title="Quitter" placement="right">
            <IconButton color="error" onClick={onQuit}>
              <PowerSettingsNewIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};

export default ServerList;
