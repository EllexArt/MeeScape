import React from 'react';
import { Box, Typography } from '@mui/material';
import { useChannel } from '../logic/useChannel';
import { sidebarLeftStyles, serverBannerStyles, serverTitleStyles, channelListStyles, channelSectionStyles, channelIconStyles, channelNameStyles } from '../theme/styles';
import bannerImg from '../assets/banners/banner.jpg';

const ChannelList: React.FC = () => {
  const { channels, currentChannel, setCurrentChannel } = useChannel();
  
  const textChannels = channels.filter(c => c.type === 'text');
  const voiceChannels = channels.filter(c => c.type === 'voice');
  
  return (
    <Box sx={sidebarLeftStyles}>
      {/* Server Banner */}
      <Box sx={serverBannerStyles}>
        <Box
          component="img"
          src={bannerImg}
          alt="Bannière du serveur"
          sx={{ display: 'none' }}
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            const target = e.currentTarget as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        <Typography sx={serverTitleStyles}>DuoLang Club</Typography>
      </Box>
      
      {/* Channel List */}
      <Box sx={channelListStyles}>
        {/* Text Channels Section */}
        <Typography sx={channelSectionStyles}>Salons textuels</Typography>
        {textChannels.map(channel => (
          <Box
            key={channel.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              padding: '6px 8px',
              margin: '1px 0',
              borderRadius: 1,
              color: currentChannel.id === channel.id ? '#fff' : '#949ba4',
              backgroundColor: currentChannel.id === channel.id ? '#404249' : 'transparent',
              cursor: 'pointer',
              transition: 'all 0.15s',
              '&:hover': {
                backgroundColor: '#35373c',
                color: '#dbdee1',
              },
            }}
            onClick={() => setCurrentChannel(channel)}
          >
            <Typography component="span" sx={channelIconStyles}>
              {channel.icon || '#'}
            </Typography>
            <Typography component="span" sx={channelNameStyles}>
              {channel.name}
            </Typography>
          </Box>
        ))}
        
        {/* Voice Channels Section */}
        {voiceChannels.length > 0 && (
          <>
            <Typography sx={channelSectionStyles}>Vocaux</Typography>
            {voiceChannels.map(channel => (
              <Box
                key={channel.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  padding: '6px 8px',
                  margin: '1px 0',
                  borderRadius: 1,
                  color: currentChannel.id === channel.id ? '#fff' : '#949ba4',
                  backgroundColor: currentChannel.id === channel.id ? '#404249' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  '&:hover': {
                    backgroundColor: '#35373c',
                    color: '#dbdee1',
                  },
                }}
                onClick={() => setCurrentChannel(channel)}
              >
                <Typography component="span" sx={channelIconStyles}>
                  {channel.icon || '🔊'}
                </Typography>
                <Typography component="span" sx={channelNameStyles}>
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