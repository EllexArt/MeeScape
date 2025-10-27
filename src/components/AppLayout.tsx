import React from 'react';
import ServerList from './server-list';
import MemberList from './member-list';
import ProfileBar from './profile-bar';
import ChatWindow from './chat-window';
import ChannelList from './channel-list';
import LanguageSelector from './language/LanguageSelector';
import ChannelHeader from './sidebar/ChannelHeader';
import { Box } from '@mui/material';

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
  <Box className="discord-layout">
    {/* Liste des serveurs (gauche) */}
    <ServerList
      onQuit={onQuit}
      onReset={onReset}
      goHome={goHome}
      onShowSaves={onShowSaves}
    />

    {/* Sidebar avec salons + profil */}
    <Box className="sidebar-left">
      <ChannelList />
      <ProfileBar profile={profile} setProfile={setProfile} />
    </Box>

    {/* Zone principale de chat */}
    <Box className="main-chat-area">
      <ChannelHeader channelName={currentChannel.name}>
        <LanguageSelector lang={lang} setLang={setLang} />
      </ChannelHeader>
      <ChatWindow messages={messages} choices={choices} onChoice={onChoice} />
    </Box>

    {/* Liste des membres (droite) */}
    <MemberList />
  </Box>
);

export default AppLayout;