import React from 'react';
import { Box, List, ListItemButton, Typography } from '@mui/material';
import { useChannel } from '../logic/useChannel';
import bannerImg from '../assets/banners/banner.jpg';

const ChannelList: React.FC = () => {
  const { channels, currentChannel, setCurrentChannel } = useChannel();
  
  const textChannels = channels.filter(c => c.type === 'text');
  const voiceChannels = channels.filter(c => c.type === 'voice');
  
  return (
    <Box className="sidebar-left-inner">
      {/* Server Banner */}
      <Box className="server-banner">
        <Box
          component="img"
          src={bannerImg}
          alt="Bannière du serveur"
          className="server-banner-img"
          onError={(e: any) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <Typography className="server-title">DuoLang Club</Typography>
      </Box>
      
      {/* Channel List */}
      <Box className="channel-list">
        {/* Text Channels Section */}
        <Typography className="channel-section">Salons textuels</Typography>
        {textChannels.map(channel => (
          <Box
            key={channel.id}
            className={`channel${currentChannel.id === channel.id ? ' channel-active' : ''}`}
            onClick={() => setCurrentChannel(channel)}
          >
            <Typography component="span" className="channel-icon">
              {channel.icon || '#'}
            </Typography>
            <Typography component="span" className="channel-name">
              {channel.name}
            </Typography>
          </Box>
        ))}
        
        {/* Voice Channels Section */}
        {voiceChannels.length > 0 && (
          <>
            <Typography className="channel-section">Vocaux</Typography>
            {voiceChannels.map(channel => (
              <Box
                key={channel.id}
                className={`channel channel-voice${currentChannel.id === channel.id ? ' channel-active' : ''}`}
                onClick={() => setCurrentChannel(channel)}
              >
                <Typography component="span" className="channel-icon">
                  {channel.icon || '🔊'}
                </Typography>
                <Typography component="span" className="channel-name">
                  {channel.name}
                </Typography>
              </Box>
            ))}
          </>
        )}
      </Box>
    </Box>
  );
};

export default ChannelList;