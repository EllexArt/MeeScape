import React from 'react';
import MessageList from './message-list';
import { Message } from '../types/message.type';

export type Choice<T = any> = {
  text: string;
  next: T;
};

interface ChatWindowProps<T = any> {
  messages: Message[];
  choices?: Choice<T>[];
  onChoice?: (choice: T) => void;
}

const ChatWindow = <T,>({ messages, choices, onChoice }: ChatWindowProps<T>) => (
  <div className="chat-window">
    {/* Zone scrollable des messages */}
    <MessageList messages={messages} />
    
    {/* Zone fixe des choix en bas */}
    {choices && choices.length > 0 && onChoice && (
      <div className="choices">
        {choices.map((choice, idx) => (
          <button
            key={idx}
            onClick={() => onChoice(choice.next)}
          >
            {choice.text}
          </button>
        ))}
      </div>
    )}
  </div>
);

export default ChatWindow;