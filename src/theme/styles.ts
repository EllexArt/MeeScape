import { SxProps, Theme } from '@mui/material/styles';

// Global styles that can't be easily moved to components
export const globalStyles: SxProps<Theme> = {
  '*': {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
  },
  'html, body, #root': {
    height: '100%',
    width: '100%',
    margin: 0,
    padding: 0,
    backgroundColor: '#313338',
    overflow: 'hidden',
  },
  body: {
    backgroundColor: '#313338',
    color: '#f2f3f5',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
};

// Discord-like layout styles
export const discordLayoutStyles: SxProps<Theme> = {
  display: 'flex',
  height: '100vh',
  width: '100vw',
  backgroundColor: '#313338',
  overflow: 'hidden',
};

// Server list styles
export const serverListStyles: SxProps<Theme> = {
  width: 72,
  backgroundColor: '#1e1f22',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '12px 0',
  gap: 1,
  borderRight: '1px solid #1e1f22',
  zIndex: 2,
  height: '100vh',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: 0,
  },
};

export const serverIconStyles: SxProps<Theme> = {
  width: 48,
  height: 48,
  backgroundColor: '#313338',
  color: '#fff',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.5rem',
  cursor: 'pointer',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  flexShrink: 0,
  '&:hover': {
    backgroundColor: '#5865f2',
    borderRadius: 2,
  },
};

export const serverActionsStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 1,
  width: '100%',
  padding: '0 12px',
  marginTop: 'auto',
};

export const serverActionBtnStyles: SxProps<Theme> = {
  backgroundColor: '#313338',
  color: '#b5bac1',
  border: 'none',
  borderRadius: '50%',
  width: 48,
  height: 48,
  fontSize: '1.25rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  flexShrink: 0,
  '&:hover': {
    backgroundColor: '#23a559',
    color: '#fff',
    borderRadius: 2,
  },
};

// Sidebar left styles
export const sidebarLeftStyles: SxProps<Theme> = {
  width: 220,
  backgroundColor: '#2b2d31',
  display: 'flex',
  flexDirection: 'column',
  borderRight: '1px solid #1e1f22',
  height: '100vh',
  overflow: 'hidden',
  position: 'relative',
};

// Server banner styles
export const serverBannerStyles: SxProps<Theme> = {
  position: 'relative',
  width: '100%',
  height: 48,
  backgroundColor: '#111214',
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  padding: '0 16px',
  cursor: 'pointer',
  transition: 'background 0.15s',
  borderBottom: '1px solid #1e1f22',
  boxShadow: '0 1px 0 rgba(0,0,0,0.2)',
  '&:hover': {
    backgroundColor: '#35373c',
  },
};

export const serverTitleStyles: SxProps<Theme> = {
  color: '#f2f3f5',
  fontSize: '1rem',
  fontWeight: 600,
  textShadow: 'none',
  position: 'static',
  padding: 0,
  margin: 0,
  zIndex: 'auto',
};

// Channel list styles
export const channelListStyles: SxProps<Theme> = {
  flex: 1,
  overflowY: 'auto',
  padding: 1,
  paddingBottom: '72px', // Espace pour la profile bar (52px + 20px de marge)
  backgroundColor: '#2b2d31',
  '&::-webkit-scrollbar': {
    width: 8,
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#1a1b1e',
    borderRadius: 1,
  },
};

export const channelSectionStyles: SxProps<Theme> = {
  color: '#949ba4',
  fontSize: '0.6875rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  margin: '24px 8px 4px 8px',
  lineHeight: '16px',
  '&:first-child': {
    marginTop: 2,
  },
};

export const channelGroupStyles: SxProps<Theme> = {
  color: '#949ba4',
  fontSize: '0.875rem',
  fontWeight: 500,
  margin: '8px 0 2px 8px',
};

export const channelStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  padding: '6px 8px',
  margin: '1px 0',
  borderRadius: 1,
  color: '#949ba4',
  fontSize: '1rem',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'all 0.15s',
  '&:hover': {
    backgroundColor: '#35373c',
    color: '#dbdee1',
  },
};

export const channelActiveStyles: SxProps<Theme> = {
  backgroundColor: '#404249 !important',
  color: '#fff !important',
};

export const channelIconStyles: SxProps<Theme> = {
  fontSize: '1.25rem',
  color: '#80848e',
  width: 20,
  textAlign: 'center',
};

export const channelNameStyles: SxProps<Theme> = {
  flex: 1,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

// Profile bar styles
export const profileBarStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  backgroundColor: '#232428',
  padding: '10px 16px',
  flexShrink: 0,
  minHeight: 52,
  borderTop: '1px solid #1e1f22',
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  width: '100%',
  zIndex: 10,
};

export const profileAvatarStyles: SxProps<Theme> = {
  width: 32,
  height: 32,
  borderRadius: '50%',
  objectFit: 'cover',
  backgroundColor: '#5865f2',
  flexShrink: 0,
};

export const profileInfoStyles: SxProps<Theme> = {
  flex: 1,
  minWidth: 0,
};

export const profileNameStyles: SxProps<Theme> = {
  color: '#f2f3f5',
  fontSize: '0.875rem',
  fontWeight: 600,
  lineHeight: 1.25,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

export const profileRoleStyles: SxProps<Theme> = {
  color: '#949ba4',
  fontSize: '0.75rem',
  lineHeight: 1.25,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

// Profile bar additional styles
export const profileStatusStyles: SxProps<Theme> = {
  position: 'absolute',
  bottom: -2,
  right: -2,
  width: 10,
  height: 10,
  borderRadius: '50%',
  backgroundColor: '#23a559', // online
  border: '2px solid #232428',
  zIndex: 10,
};

export const profileActionsStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
};

export const profileBtnStyles: SxProps<Theme> = {
  color: '#b5bac1',
  '&:hover': {
    color: '#dbdee1',
  },
};

export const profilePopupContentStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  minWidth: 300,
};

export const profilePopupTitleStyles: SxProps<Theme> = {
  textAlign: 'center',
};

export const profileEditNameStyles: SxProps<Theme> = {
  width: '100%',
};

export const profilePopupActionsStyles: SxProps<Theme> = {
  justifyContent: 'center',
  gap: 1,
};

export const profilePopupBtnStyles: SxProps<Theme> = {
  minWidth: 100,
};

// Main chat area styles
export const mainChatAreaStyles: SxProps<Theme> = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
  backgroundColor: '#313338',
  height: '100vh',
  overflow: 'hidden',
  position: 'relative',
};

// Channel header styles
export const channelHeaderStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#313338',
  padding: '12px 16px',
  borderBottom: '1px solid #232428',
  minHeight: 48,
  flexShrink: 0,
  boxShadow: '0 1px 0 rgba(0,0,0,0.2)',
};

export const channelTitleStyles: SxProps<Theme> = {
  color: '#f2f3f5',
  fontSize: '1rem',
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  '&::before': {
    content: '"#"',
    color: '#80848e',
    fontSize: '1.25rem',
  },
};

export const languageSelectorStyles: SxProps<Theme> = {
  backgroundColor: '#1e1f22',
  color: '#dbdee1',
  border: '1px solid #1e1f22',
  borderRadius: 1,
  padding: '6px 12px',
  fontSize: '0.875rem',
  fontWeight: 500,
  outline: 'none',
  cursor: 'pointer',
  transition: 'border 0.15s',
  '&:hover': {
    border: '1px solid #232428',
  },
};

// Chat window styles
export const chatWindowStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  width: '100%',
  backgroundColor: '#313338',
  overflow: 'hidden',
  position: 'relative',
};

// Message list styles
export const messageListStyles: SxProps<Theme> = {
  flex: 1,
  width: '100%',
  height: '100%',
  overflowY: 'auto',
  overflowX: 'hidden',
  padding: '16px 16px 120px 16px', // Espace pour les choix fixés en bas
  display: 'flex',
  flexDirection: 'column',
  gap: 0,
  '&::-webkit-scrollbar': {
    width: 16,
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#2b2d31',
    borderRadius: 1,
    margin: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#1a1b1e',
    borderRadius: 1,
    border: '4px solid #2b2d31',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#232428',
  },
};

// Choices area styles
export const choicesStyles: SxProps<Theme> = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
  padding: 2,
  backgroundColor: '#313338',
  borderTop: '1px solid #232428',
  width: '100%',
  flexShrink: 0,
  zIndex: 10,
};

export const choiceButtonStyles: SxProps<Theme> = {
  backgroundColor: '#5865f2',
  color: '#fff',
  border: 'none',
  borderRadius: 1,
  padding: '10px 16px',
  fontSize: '1rem',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'background 0.15s',
  width: '100%',
  textAlign: 'left',
  minHeight: 40,
  '&:hover': {
    backgroundColor: '#4752c4',
  },
  '&:active': {
    backgroundColor: '#3c44a8',
  },
};

// Member list styles
export const memberListStyles: SxProps<Theme> = {
  width: 240,
  backgroundColor: '#2b2d31',
  display: 'flex',
  flexDirection: 'column',
  padding: '24px 0 0 0',
  borderLeft: '1px solid #232428',
  zIndex: 2,
  height: '100vh',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: 8,
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#1a1b1e',
    borderRadius: 1,
  },
};
