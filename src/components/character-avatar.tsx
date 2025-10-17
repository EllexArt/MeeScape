import React from 'react';
import { Avatar } from '@mui/material';

import aliceImg from '../assets/avatars/alice.png';
import bobImg from '../assets/avatars/bob.png';
import charlieImg from '../assets/avatars/charlie.png';
import mee6Img from '../assets/avatars/mee6.jpg';
import userImg from '../assets/avatars/user.png';

type CharacterAvatarProps = {
  avatar: string;
  name: string;
  size?: number; // optionnel pour la taille
};

const avatarMap: Record<string, string> = {
  'alice.png': aliceImg,
  'bob.png': bobImg,
  'charlie.png': charlieImg,
  'mee6.jpg': mee6Img,
  'user.png': userImg,
};

const CharacterAvatar: React.FC<CharacterAvatarProps> = ({ avatar, name, size = 40 }) => {

  return (
    <Avatar
      src={avatarMap[avatar]}
      alt={name}
      sx={{ width: size, height: size }}
    />
  );
};

export default CharacterAvatar;
