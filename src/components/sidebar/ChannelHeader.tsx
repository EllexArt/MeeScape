import React from 'react';
import { Box, Typography } from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';

type ChannelHeaderProps = {
  channelName: string;
  children?: React.ReactNode;
};

const ChannelHeader: React.FC<ChannelHeaderProps> = ({ channelName, children }) => (
  <Box className="channel-header">
    <Box display="flex" alignItems="center" gap={1}>
      <TagIcon sx={{ color: '#80848e' }} />
      <Typography className="channel-title" variant="h6">
        {channelName}
      </Typography>
    </Box>
    {children}
  </Box>
);

export default ChannelHeader;