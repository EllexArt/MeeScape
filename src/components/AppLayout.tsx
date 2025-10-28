import React from 'react';
import ServerList from './server-list';
import MemberList from './member-list';
import ProfileBar from './profile-bar';
import ChatWindow from './chat-window';
import ChannelList from './channel-list';
import LanguageSelector from './language/LanguageSelector';
import ChannelHeader from './sidebar/ChannelHeader';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import lightTheme from '../theme/lightTheme';
import { discordLayoutStyles, sidebarLeftStyles, mainChatAreaStyles } from '../theme/styles';

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

export type Choice<T = string> = {
  text: string;
  next: T;
};

export interface AppLayoutProps {
  lang: string;
  setLang: (lang: string) => void;
  profile: Profile;
  setProfile: (profile: Profile) => void;
  currentChannel: Channel;
  messages: import('../types/message.type').Message[];
  choices: Choice<string>[];
  onChoice: (choice: string) => void;
  onQuit: () => void;
  onReset?: () => void;
  goHome?: () => void;
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
  onShowSaves,
}) => (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', width: '100vw', overflow: 'hidden' }}>
        <Box sx={discordLayoutStyles}>
    {/* Liste des serveurs (gauche) */}
    <ServerList
      onQuit={onQuit}
      onReset={onReset}
      goHome={goHome}
      onShowSaves={onShowSaves}
    />

    {/* Sidebar avec salons + profil */}
    <Box sx={sidebarLeftStyles}>
      <ChannelList />
      <ProfileBar profile={profile} setProfile={setProfile} />
    </Box>

    {/* Zone principale de chat */}
    <Box sx={mainChatAreaStyles}>
      <ChannelHeader channelName={currentChannel.name}>
        <LanguageSelector lang={lang} setLang={setLang} />
      </ChannelHeader>
      <ChatWindow messages={messages} choices={choices} onChoice={onChoice} />
    </Box>

    {/* Liste des membres (droite) */}
    <MemberList />
  </Box>
      </Box>
    </ThemeProvider>
);

  export default AppLayout;