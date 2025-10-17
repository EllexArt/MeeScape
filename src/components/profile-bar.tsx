import { Avatar, Box, Button, Input, TextField } from '@mui/material';
import React, { useState } from 'react';

const avatars = [
  'user.png', 'alice.png', 'bob.png', 'charlie.png'
];

const avatarMap: Record<string, string> = {
  'alice.png': require('../assets/avatars/alice.png').default,
  'bob.png': require('../assets/avatars/bob.png').default,
  'charlie.png': require('../assets/avatars/charlie.png').default,
  'user.png': require('../assets/avatars/user.png').default,
};
const fallback = avatarMap['user.png'];

type Profile = {
  name: string;
  avatar: string;
  status: string;
  role: string;
  language: string;
};

type ProfileBarProps = {
  profile: Profile;
  setProfile: (profile: Profile) => void;
};

const ProfileBar: React.FC<ProfileBarProps> = ({ profile, setProfile }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(profile.name);
  const [showPopup, setShowPopup] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState(avatarMap[profile.avatar] || fallback);

  const save = () => {
    setProfile({ ...profile, name });
    setShowPopup(false);
  };
  const cancel = () => {
    setName(profile.name);
    setShowPopup(false);
  };

  return (
    <Box className="profile-bar">
      <Box sx={{ position: 'relative' }}>
        <Avatar
          src={avatarSrc}
          alt={profile.name}
          className="profile-avatar"
          onError={() => setAvatarSrc(fallback)}
        />
        <Box className="profile-status online" title="En ligne"></Box>
      </Box>
      <Box className="profile-info">
        <Box className="profile-name">{profile.name}</Box>
        <Box className="profile-role">{profile.role}</Box>
      </Box>

      <Box className="profile-actions">
        <Button title="Modifier le profil" className="profile-btn" onClick={() => setShowPopup(true)}>⚙️</Button>
      </Box>
      {showPopup && (
        <Box className="profile-popup">
          <Box className="profile-popup-content">
            <Box className="profile-popup-title">Modifier le nom</Box>
            <TextField
              className="profile-edit-name"
              value={name}
              onChange={e => setName(e.target.value)}
              autoFocus
            />
            <Box className="profile-popup-actions">
              <Button className="profile-popup-btn" onClick={save}>Valider</Button>
              <Button className="profile-popup-btn cancel" onClick={cancel}>Annuler</Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProfileBar;
