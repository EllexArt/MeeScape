import React from 'react';
import { useChannel } from '../../logic/useChannel';

const ChannelList: React.FC = () => {
  const { channels, currentChannel, setCurrentChannel } = useChannel();
  return (
    <aside className="channel-list">
      <div className="server-banner">
        <img src="assets/banner.png" alt="Bannière du serveur" className="server-banner-img" />
        <div className="server-title">DuoLang Club</div>
      </div>
      <div className="channel-section">Salons textuels</div>
      {channels.filter(c => c.type === 'text').map(channel => (
        <div
          key={channel.id}
          className={`channel${currentChannel.id === channel.id ? ' channel-active' : ''}`}
          onClick={() => setCurrentChannel(channel)}
        >
          <span className="channel-icon">#</span>
          <span className="channel-name">{channel.name}</span>
        </div>
      ))}
      <div className="channel-section">Vocaux</div>
      {channels.filter(c => c.type === 'voice').map(channel => (
        <div
          key={channel.id}
          className={`channel channel-voice${currentChannel.id === channel.id ? ' channel-active' : ''}`}
          onClick={() => setCurrentChannel(channel)}
        >
          <span className="channel-icon">🔊</span>
          <span className="channel-name">{channel.name}</span>
        </div>
      ))}
    </aside>
  );
};

export default ChannelList;
