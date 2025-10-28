import React from 'react';
import { Box, IconButton, Tooltip, Avatar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import StorageIcon from '@mui/icons-material/Storage';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { RestartAlt } from '@mui/icons-material';
import { serverListStyles, serverIconStyles, serverActionsStyles, serverActionBtnStyles } from '../theme/styles';

type Server = {
  id: string;
  name: string;
  icon: string;
};

const servers: Server[] = [
  { id: '1', name: 'MeeScape', icon: '🟣' },
];

interface ServerListProps {
  onQuit?: () => void;
  onReset?: () => void;
  goHome?: () => void;
  onShowSaves?: () => void;
}

const ServerList: React.FC<ServerListProps> = ({
  onQuit,
  onReset,
  goHome,
  onShowSaves
}) => {
  return (
    <Box sx={serverListStyles}>
      {/* Liste des serveurs */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {servers.map((server) => (
          <Tooltip key={server.id} title={server.name} placement="right">
            <Avatar sx={serverIconStyles}>{server.icon}</Avatar>
          </Tooltip>
        ))}
      </Box>

      {/* Séparateur */}
      <Box
        sx={{
          width: 32,
          height: 2,
          backgroundColor: '#232428',
          borderRadius: '1px',
          margin: '4px 0'
        }}
      />

      {/* Actions */}
      <Box sx={serverActionsStyles}>
        {goHome && (
          <Tooltip title="Accueil" placement="right">
            <IconButton sx={serverActionBtnStyles} color="primary" onClick={goHome}>
              <HomeIcon />
            </IconButton>
          </Tooltip>
        )}
        {onShowSaves && (
          <Tooltip title="Sauvegardes" placement="right">
            <IconButton sx={serverActionBtnStyles} color="primary" onClick={onShowSaves}>
              <StorageIcon />
            </IconButton>
          </Tooltip>
        )}
        {onReset && (
          <Tooltip title="Réinitialiser" placement="right">
            <IconButton sx={serverActionBtnStyles} color="warning" onClick={onReset}>
              <RestartAlt />
            </IconButton>
          </Tooltip>
        )}
        {onQuit && (
          <Tooltip title="Quitter" placement="right">
            <IconButton sx={serverActionBtnStyles} color="error" onClick={onQuit}>
              <PowerSettingsNewIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};

export default ServerList;
