import React from 'react';
import {
  Avatar,
  Box,
  Chip,
  Stack,
  Typography
} from '@mui/material';

// Import des avatars
import aliceImg from '../assets/avatars/alice.png';
import bobImg from '../assets/avatars/bob.jpg';
import charlieImg from '../assets/avatars/charlie.jpg';
import mee6Img from '../assets/avatars/mee6.jpg';
import userImg from '../assets/avatars/user.jpg';

export type Message = {
  avatar: string;
  character: string;
  text: string;
  time?: string;
  reactions?: { emoji: string; count: number }[];
  role?: string; // ex: BOT
};

type MessageListProps = {
  messages: Message[];
};

const avatarMap: Record<string, string> = {
  'alice.png': aliceImg,
  'bob.png': bobImg,
  'charlie.png': charlieImg,
  'mee6.jpg': mee6Img,
  'user.png': userImg
};

const fallback = userImg;

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  console.log('📨 MessageList rendering with', messages.length, 'messages');
  
  // Si pas de messages, afficher un message vide
  if (messages.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center', color: '#949ba4' }}>
        <Typography variant="body2">Aucun message pour le moment...</Typography>
      </Box>
    );
  }

  // Grouper les messages par personnage consécutifs
  const grouped: {
    character: string;
    role?: string;
    avatar: string;
    items: Message[];
  }[] = [];

  messages.forEach((msg) => {
    const last = grouped[grouped.length - 1];
    if (last && last.character === msg.character) {
      last.items.push(msg);
    } else {
      let avatar = msg.avatar;
      if (msg.character === 'MEE6') avatar = 'mee6.jpg';
      grouped.push({
        character: msg.character,
        role: msg.role,
        avatar,
        items: [msg]
      });
    }
  });

  console.log('📦 Grouped messages:', grouped);

  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      {grouped.map((group, gidx) => {
        const avatarSrc = avatarMap[group.avatar] || fallback;

        return (
          <Stack key={gidx} spacing={1}>
            {group.items.map((msg, idx) => {
              const isFirstInGroup = idx === 0;

              return (
                <Stack
                  key={`${group.character}-${idx}`}
                  direction="row"
                  alignItems="flex-start"
                  spacing={2}
                >
                  {/* Avatar seulement sur le premier message du groupe */}
                  {isFirstInGroup ? (
                    <Avatar
                      src={avatarSrc}
                      alt={group.character}
                      sx={{
                        width: 40,
                        height: 40,
                        flexShrink: 0,
                      }}
                      imgProps={{
                        onError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                          const target = e.currentTarget as HTMLImageElement;
                          target.src = fallback;
                        }
                      }}
                    />
                  ) : (
                    <Box sx={{ width: 40 }} />
                  )}

                  {/* Contenu message */}
                  <Stack spacing={0.5} sx={{ flex: 1 }}>
                    {isFirstInGroup && (
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 600, color: '#f2f3f5' }}
                        >
                          {msg.character}
                        </Typography>

                        {msg.role === 'BOT' && (
                          <Chip
                            label="BOT"
                            size="small"
                            sx={{
                              background: '#5865f2',
                              color: '#fff',
                              fontSize: '0.625rem',
                              fontWeight: 600,
                              borderRadius: '3px',
                              padding: '0 4px',
                              height: 18,
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px'
                            }}
                          />
                        )}

                        <Typography
                          variant="caption"
                          sx={{ ml: 0.5, color: '#949ba4' }}
                        >
                          {msg.time || new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        </Typography>
                      </Stack>
                    )}

                    <Typography 
                      variant="body2" 
                      sx={{ 
                        whiteSpace: 'pre-wrap',
                        color: '#dbdee1',
                        fontSize: '1rem',
                        lineHeight: 1.4
                      }}
                    >
                      {msg.text}
                    </Typography>

                    {msg.reactions && msg.reactions.length > 0 && (
                      <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                        {msg.reactions.map((r, i) => (
                          <Chip
                            key={i}
                            label={`${r.emoji} ${r.count}`}
                            size="small"
                            variant="outlined"
                            sx={{
                              fontSize: '0.75rem',
                              height: 24,
                              borderRadius: '12px',
                              cursor: 'pointer'
                            }}
                          />
                        ))}
                      </Stack>
                    )}
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        );
      })}
    </Stack>
  );
};

export default MessageList;