import React from 'react';
import MessageList from './message-list';
import { Message } from '../types/message.type';
import { Box, Button } from '@mui/material';
import { chatWindowStyles, choicesStyles, choiceButtonStyles } from '../theme/styles';

export type Choice<T = string> = {
  text: string;
  next: T;
};

interface ChatWindowProps<T = string> {
  messages: Message[];
  choices?: Choice<T>[];
  onChoice?: (choice: T) => void;
}

const ChatWindow = <T,>({ messages, choices, onChoice }: ChatWindowProps<T>) => (
  <Box sx={chatWindowStyles}>
    {/* Zone scrollable des messages */}
    <MessageList messages={messages} />
    
    {/* Zone fixe des choix en bas */}
    {choices && choices.length > 0 && onChoice && (
      <Box sx={choicesStyles}>
        {choices.map((choice, idx) => (
          <Button
            key={idx}
            sx={choiceButtonStyles}
            onClick={() => onChoice(choice.next)}
          >
            {choice.text}
          </Button>
        ))}
      </Box>
    )}
  </Box>
);

export default ChatWindow;