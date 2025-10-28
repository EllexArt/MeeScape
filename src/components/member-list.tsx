import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import aliceImg from '../assets/avatars/alice.png';
import bobImg from '../assets/avatars/bob.jpg';
import charlieImg from '../assets/avatars/charlie.jpg';
import mee6Img from '../assets/avatars/mee6.jpg';
import userImg from '../assets/avatars/user.jpg';

const avatarMap: Record<string, string> = {
  'alice.png': aliceImg,
  'bob.jpg': bobImg,
  'charlie.jpg': charlieImg,
  'mee6.jpg': mee6Img,
  'user.jpg': userImg,
};

const fallback = userImg;

const members = [
  { id: 'u1', name: 'Alice', avatar: 'alice.png', status: 'online' },
  { id: 'u2', name: 'Bob', avatar: 'bob.jpg', status: 'idle' },
  { id: 'u3', name: 'Charlie', avatar: 'charlie.jpg', status: 'dnd' },
  { id: 'u4', name: 'Vous', avatar: 'user.jpg', status: 'online' },
  { id: 'mee6', name: 'MEE6', avatar: 'mee6.jpg', status: 'online', role: 'BOT' },
];

const MemberList: React.FC = () => (
  <Box
    component="aside"
    sx={{
      width: 260,
      backgroundColor: '#2b2d31',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 0 0 0',
      borderLeft: '1px solid #232428',
      zIndex: 2,
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
    }}
  >
    <Typography
      sx={{
        color: '#949ba4',
        fontSize: '0.75rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        margin: '0 0 8px 16px',
        lineHeight: '16px',
      }}
    >
      Membres en ligne
    </Typography>
    {members.map(member => {
      const src = avatarMap[member.avatar] || fallback;
      return (
        <Box
          key={member.id}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            padding: '4px 8px',
            margin: '1px 8px',
            borderRadius: 1,
            transition: 'background 0.15s',
            cursor: 'pointer',
            position: 'relative',
            '&:hover': {
              backgroundColor: '#35373c',
            },
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: 36,
              height: 36,
              borderRadius: '50%',
              backgroundColor: '#5865f2',
              flexShrink: 0,
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -2,
                right: -2,
                width: 12,
                height: 12,
                borderRadius: '50%',
                border: '2px solid #2b2d31',
                backgroundColor: member.status === 'online' ? '#23a559' :
                                member.status === 'idle' ? '#f0b232' :
                                member.status === 'dnd' ? '#f23f43' : 'transparent',
                zIndex: 10,
              },
            }}
          >
            <Box
              component="img"
              src={src}
              alt={member.name}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '50%',
              }}
            />
          </Box>
          <Typography
            component="span"
            sx={{
              color: '#dbdee1',
              fontSize: '1rem',
              fontWeight: 500,
              flex: 1,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {member.name}
          </Typography>
          {member.role === 'BOT' && (
            <Chip
              label="BOT"
              size="small"
              sx={{
                ml: 8,
                fontSize: '0.75rem',
                backgroundColor: '#5865f2',
                color: '#fff',
              }}
            />
          )}
        </Box>
      );
    })}
  </Box>
);

export default MemberList;