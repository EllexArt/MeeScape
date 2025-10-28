import React, { useState } from 'react';
import { Box, Avatar, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { profileBarStyles, profileAvatarStyles, profileInfoStyles, profileNameStyles, profileRoleStyles, profileStatusStyles } from '../theme/styles';
import aliceImg from '../assets/avatars/alice.png';
import bobImg from '../assets/avatars/bob.jpg';
import charlieImg from '../assets/avatars/charlie.jpg';
import userImg from '../assets/avatars/user.jpg';

const avatarMap: Record<string, string> = {
  'alice.png': aliceImg,
  'bob.jpg': bobImg,
  'charlie.jpg': charlieImg,
  'user.jpg': userImg,
};

const fallback = userImg;

interface Profile {
  name: string;
  avatar: string;
  status: string;
  role: string;
  language: string;
}

interface ProfileBarProps {
  profile: Profile;
  setProfile: (profile: Profile) => void;
}

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
    <Box sx={profileBarStyles}>
      <Box sx={{ position: 'relative' }}>
        <Avatar
          src={avatarSrc}
          alt={profile.name}
          sx={profileAvatarStyles}
          imgProps={{
            onError: (e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.src = fallback;
            }
          }}
        />
        <Box sx={profileStatusStyles} title="En ligne" />
      </Box>
      
      <Box sx={profileInfoStyles}>
        <Typography sx={profileNameStyles}>{profile.name}</Typography>
        <Typography sx={profileRoleStyles}>{profile.role}</Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton 
          title="Modifier le profil" 
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
      >
        <DialogTitle>
          Modifier le nom
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            value={name}
            onChange={e => setName(e.target.value)}
            inputProps={{ maxLength: 20 }}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={save} variant="contained">
            Valider
          </Button>
          <Button onClick={cancel} variant="outlined">
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfileBar;