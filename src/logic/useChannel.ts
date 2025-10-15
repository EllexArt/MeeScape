import { useState } from 'react';

const defaultChannels = [
  { id: '1', name: 'général-tournesol', type: 'text' },
  { id: '2', name: 'général-tulipe', type: 'text' },
  { id: '3', name: 'Vocal 1', type: 'voice' },
];

export function useChannel() {
  const [currentChannel, setCurrentChannel] = useState(defaultChannels[0]);
  return { currentChannel, setCurrentChannel, channels: defaultChannels };
}
