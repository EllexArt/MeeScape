import React, { useState } from 'react';
import { Box, Avatar, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import aliceImg from '../assets/avatars/alice.png';
import bobImg from '../assets/avatars/bob.jpg';
import charlieImg from '../assets/avatars/charlie.jpg';
import userImg from '../assets/avatars/user.jpg';

const avatars = [
  'user.jpg', 'alice.png', 'bob.jpg', 'charlie.jpg'
];

const avatarMap: Record<string, string> = {
  'alice.png': aliceImg,
  'bob.jpg': bobImg,
  'charlie.jpg': charlieImg,
  'user.jpg': userImg,
};

const fallback = userImg;

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
  const [name, setName] = useState(profile.name);
  const [showPopup, setShowPopup] = useState(false);
  const avatarSrc = avatarMap[profile.avatar] || fallback;

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
          imgProps={{
            onError: (e: any) => {
              e.currentTarget.src = fallback;
            }
          }}
        />
        <Box className="profile-status online" title="En ligne" />
      </Box>
      
      <Box className="profile-info">
        <Typography className="profile-name">{profile.name}</Typography>
        <Typography className="profile-role">{profile.role}</Typography>
      </Box>

      <Box className="profile-actions">
        <IconButton 
          title="Modifier le profil" 
          className="profile-btn" 
          onClick={() => setShowPopup(true)}
          size="small"
        >
          <SettingsIcon />
        </IconButton>
      </Box>
      
      {/* Dialog MUI au lieu du popup custom */}
      <Dialog 
        open={showPopup} 
        onClose={cancel}
        PaperProps={{
          className: 'profile-popup-content'
        }}
      >
        <DialogTitle className="profile-popup-title">
          Modifier le nom
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            value={name}
            onChange={e => setName(e.target.value)}
            inputProps={{ maxLength: 20 }}
            className="profile-edit-name"
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions className="profile-popup-actions">
          <Button onClick={save} variant="contained" className="profile-popup-btn">
            Valider
          </Button>
          <Button onClick={cancel} variant="outlined" className="profile-popup-btn cancel">
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfileBar;