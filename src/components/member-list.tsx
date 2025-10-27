import React from 'react';
import { Box, Typography, Avatar, Chip } from '@mui/material';
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
  <Box component="aside" className="member-list">
    <Typography className="member-list-title">Membres en ligne</Typography>
    {members.map(member => {
      const src = avatarMap[member.avatar] || fallback;
      return (
        <Box key={member.id} className={`member ${member.status}`}>
          <Avatar
            src={src}
            alt={member.name}
            sx={{
              width: 48,
              height: 48,
              objectFit: 'cover',
              img: { objectFit: 'cover' }
            }}
          />
          <Typography component="span" className="member-name">
            {member.name}
          </Typography>
          {member.role === 'BOT' && (
            <Chip
              label="BOT"
              size="small"
              classes={{
                root: 'bubble-role',
              }}
              sx={{ ml: 8, fontSize: '0.75rem', backgroundColor: '#5865f2', color: '#fff' }}
            />
          )}
        </Box>
      );
    })}
  </Box>
);

export default MemberList;