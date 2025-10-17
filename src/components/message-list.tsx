import React from 'react';

// Import des avatars
import aliceImg from '../assets/avatars/alice.png';
import bobImg from '../assets/avatars/bob.png';
import charlieImg from '../assets/avatars/charlie.png';
import mee6Img from '../assets/avatars/mee6.jpg';
import userImg from '../assets/avatars/user.png';

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
  'user.png': userImg,
};

const fallback = userImg;

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
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

  return (
    <div className="message-list">
      {grouped.map((group, gidx) => (
        <div key={gidx} className="message-group">
          {group.items.map((msg, idx) => {
            const avatarSrc = avatarMap[group.avatar] || fallback;
            const isFirstInGroup = idx === 0;

            return (
              <div key={idx} className="message">
                <img
                  src={avatarSrc}
                  alt={msg.character}
                  className="message-avatar"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = fallback;
                  }}
                />
                
                <div className="message-content">
                  {isFirstInGroup && (
                    <div className="message-header">
                      <span className="message-author">{msg.character}</span>
                      {msg.role === 'BOT' && (
                        <span className="message-role">BOT</span>
                      )}
                      <span className="message-timestamp">
                        {msg.time || '20:00'}
                      </span>
                    </div>
                  )}
                  
                  <div className="message-text">{msg.text}</div>
                  
                  {msg.reactions && msg.reactions.length > 0 && (
                    <div className="message-reactions">
                      {msg.reactions.map((r, i) => (
                        <span key={i} className="message-reaction">
                          <span>{r.emoji}</span>
                          <span>{r.count}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default MessageList;