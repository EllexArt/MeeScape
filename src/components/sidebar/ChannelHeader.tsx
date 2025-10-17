import React from 'react';

type ChannelHeaderProps = {
  channelName: string;
  children?: React.ReactNode;
};

const ChannelHeader: React.FC<ChannelHeaderProps> = ({ channelName, children }) => (
  <div className="channel-header">
    <div className="channel-title">{channelName}</div>
    {children}
  </div>
);

export default ChannelHeader;