import React from 'react';
import { Box, Avatar, Typography, Paper, Stack, Chip } from '@mui/material';
import CharacterAvatar from './character-avatar';

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

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  // Grouper les messages par personnage
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
      grouped.push({ character: msg.character, role: msg.role, avatar, items: [msg] });
    }
  });

  return (
    <Stack spacing={2}>
      {grouped.map((group, gidx) => {
        const isUser = group.character === 'Vous';
        return (
          <Stack key={gidx} spacing={1}>
            {group.items.map((msg, idx) => (
              <Box
                key={idx}
                display="flex"
                flexDirection={isUser ? 'row-reverse' : 'row'}
                alignItems="flex-start"
                gap={1}
              >
                <CharacterAvatar avatar={msg.avatar} name={msg.character} />

                <Box flex={1}>
                  <Box display="flex" justifyContent={isUser ? 'flex-end' : 'flex-start'} gap={1} alignItems="center">
                    <Typography variant="subtitle2" color="text.primary">
                      {msg.character}
                    </Typography>
                    {msg.role === 'BOT' && <Chip label="BOT" size="small" color="warning" />}
                    <Typography variant="caption" color="text.secondary">
                      {msg.time || '20:00'}
                    </Typography>
                  </Box>

                  <Paper
                    elevation={1}
                    sx={{
                      p: 1,
                      mt: 0.5,
                      backgroundColor: isUser ? 'primary.light' : 'grey.100',
                      color: isUser ? 'common.white' : 'text.primary',
                      borderRadius: 2,
                      maxWidth: '80%',
                      alignSelf: isUser ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <Typography variant="body2">{msg.text}</Typography>
                    {msg.reactions && msg.reactions.length > 0 && (
                      <Stack direction="row" spacing={0.5} mt={0.5} flexWrap="wrap">
                        {msg.reactions.map((r, i) => (
                          <Chip key={i} size="small" label={`${r.emoji} ${r.count}`} />
                        ))}
                      </Stack>
                    )}
                  </Paper>
                </Box>
              </Box>
            ))}
          </Stack>
        );
      })}
    </Stack>
  );
};

export default MessageList;
