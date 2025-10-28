import React from 'react';
import { Avatar } from '@mui/material';

import aliceImg from '../assets/avatars/alice.png';
import bobImg from '../assets/avatars/bob.jpg';
import charlieImg from '../assets/avatars/charlie.jpg';
import mee6Img from '../assets/avatars/mee6.jpg';
import userImg from '../assets/avatars/user.jpg';

type CharacterAvatarProps = {
  avatar: string;
  name: string;
  size?: number; // optionnel pour la taille
};

const avatarMap: Record<string, string> = {
  'alice.png': aliceImg,
  'bob.jpg': bobImg,
  'charlie.jpg': charlieImg,
  'mee6.jpg': mee6Img,
  'user.jpg': userImg,
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
