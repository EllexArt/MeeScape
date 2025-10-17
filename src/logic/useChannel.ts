import { useState } from 'react';
import {Channel} from '../types/channel.type';

const defaultChannels : Channel[] = [
  { id: '1', name: 'annonce', type: 'text', icon: '❗' },
  { id: '2', name: 'général-bazar', type: 'text', icon: '📢' },
  { id: '3', name: 'général-apprentissage', type: 'text', icon: '📚' },
  { id: '4', name: 'réactions-duo', type: 'text', icon: '🦉' },
  { id: '5', name: 'multimédia', type: 'text', icon: '🎬' },
  { id: '6', name: 'help-discord', type: 'text', icon: '🆘' },
  { id: '7', name: 'Vocal 1', type: 'voice', icon: '🔊' },
  { id: '8', name: 'Vocal 2', type: 'voice', icon: '🔊' },
];

export function useChannel() {
  const [currentChannel, setCurrentChannel] = useState(defaultChannels[0]);
  return { currentChannel, setCurrentChannel, channels: defaultChannels };
}
