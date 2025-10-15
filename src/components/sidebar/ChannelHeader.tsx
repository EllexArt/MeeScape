import React from 'react';

type ChannelHeaderProps = {
  channelName: string;
  children?: React.ReactNode;
};

const ChannelHeader: React.FC<ChannelHeaderProps> = ({ channelName, children }) => (
  <div className="channel-header">
    <span className="channel-title">#{channelName}</span>
    {children}
  </div>
);

export default ChannelHeader;
