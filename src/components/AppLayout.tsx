import React from 'react';
import { Box } from '@mui/material';

import ServerList from './server-list';
import ChannelList from './sidebar/ChannelList';
import MemberList from './member-list';
import ProfileBar from './profile-bar';
import ChannelHeader from './sidebar/ChannelHeader';
import LanguageSelector from './language/LanguageSelector';
import ChatWindow from './chat-window';

export type Profile = {
  name: string;
  avatar: string;
  status: string;
  role: string;
  language: string;
};

export type Channel = {
  id: string;
  name: string;
  type: string;
};

export interface AppLayoutProps {
  lang: string;
  setLang: (lang: string) => void;
  profile: Profile;
  setProfile: (profile: Profile) => void;
  currentChannel: Channel;
  messages: any[];
  choices: any[];
  onChoice: (choice: any) => void;
  onQuit: () => void;
  onReset?: () => void;
  goHome?: () => void;
  onSave?: () => void;
  onShowSaves?: () => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  lang,
  setLang,
  profile,
  setProfile,
  currentChannel,
  messages,
  choices,
  onChoice,
  onQuit,
  onReset,
  goHome,
  onSave,
  onShowSaves,
}) => (
  <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
    {/* Sidebar gauche (serveurs) */}
    <Box sx={{ width: 60, borderRight: 1, borderColor: 'divider' }}>
      <ServerList
        onQuit={onQuit}
        onReset={onReset}
        goHome={goHome}
        onSave={onSave}
        onShowSaves={onShowSaves}
      />
    </Box>

    {/* Sidebar centrale (salons + profil) */}
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: 280,
        borderRight: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <ChannelList />
      <ProfileBar profile={profile} setProfile={setProfile} />
    </Box>

    {/* Zone principale de chat */}
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <ChannelHeader channelName={currentChannel.name}>
        <LanguageSelector lang={lang} setLang={setLang} />
      </ChannelHeader>
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <ChatWindow messages={messages} choices={choices} onChoice={onChoice} />
      </Box>
    </Box>

    {/* Sidebar droite (membres) */}
    <Box
      sx={{
        width: 200,
        borderLeft: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <MemberList />
    </Box>
  </Box>
);

export default AppLayout;
