import React from 'react';
import { Box, Typography } from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';
import { channelHeaderStyles, channelTitleStyles } from '../../theme/styles';

interface ChannelHeaderProps {
  channelName: string;
  children?: React.ReactNode;
}

const ChannelHeader: React.FC<ChannelHeaderProps> = ({ channelName, children }) => (
  <Box sx={channelHeaderStyles}>
    <Box sx={channelTitleStyles}>
      <TagIcon sx={{ color: '#80848e' }} />
      <Typography variant="h6">
        {channelName}
      </Typography>
    </Box>
    {children}
  </Box>
);

export default ChannelHeader;