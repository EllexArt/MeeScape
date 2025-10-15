import React from 'react';
import { Box, Paper } from '@mui/material';
import MessageList from './message-list';
import ChoiceButtons, { Choice } from './choice-buttons';
import { Message } from '../types/message.type';

interface ChatWindowProps<T = any> {
  messages: Message[];
  choices?: Choice<T>[];
  onChoice?: (choice: T) => void;
}

const ChatWindow = <T,>({ messages, choices, onChoice }: ChatWindowProps<T>) => (
  <Paper
    elevation={3}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      p: 2,
      height: '100%',
      maxHeight: '100%',
      bgcolor: 'background.paper',
    }}
  >
    <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
      <MessageList messages={messages} />
    </Box>
    {choices && onChoice && (
      <ChoiceButtons<T> choices={choices} onChoice={onChoice} />
    )}
  </Paper>
);

export default ChatWindow;
