import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { SavesManager } from '../components/saves-manager';
import bannerImg from '../assets/banners/banner.jpg';

type SaveData = {
  name: string;
  date: string;
  data: unknown;
};

interface HomePageProps {
  onStart: () => void;
  onLoadSave?: (data: SaveData) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStart, onLoadSave }) => {
  const [showSaves, setShowSaves] = useState(false);

  const handleLoadSave = (data: SaveData) => {
    if (onLoadSave) {
      onLoadSave(data);
    }
    setShowSaves(false);
  };

  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 4,
          backgroundColor: '#313338',
          color: '#f2f3f5',
          textAlign: 'center',
          gap: 4,
        }}
      >
        {/* Banner */}
        <Box
          component="img"
          src={bannerImg}
          alt="MeeScape Banner"
          sx={{
            maxWidth: '100%',
            maxHeight: '300px',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: 2,
            boxShadow: 3,
            marginBottom: 2,
          }}
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.style.display = 'none';
          }}
        />

        {/* Title */}
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontSize: { xs: '2rem', md: '3rem' },
            fontWeight: 'bold',
            color: '#f2f3f5',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            marginBottom: 1,
          }}
        >
          MeeScape
        </Typography>

        {/* Description */}
        <Typography
          variant="h6"
          component="p"
          sx={{
            fontSize: { xs: '1rem', md: '1.25rem' },
            color: '#b5bac1',
            maxWidth: '600px',
            lineHeight: 1.6,
            marginBottom: 4,
          }}
        >
          Un visual novel multilingue façon Discord
        </Typography>

        {/* Buttons */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            width: '100%',
            maxWidth: '400px',
          }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={onStart}
            fullWidth
            sx={{
              backgroundColor: '#5865f2',
              '&:hover': {
                backgroundColor: '#4752c4',
              },
              fontSize: '1.1rem',
              padding: '12px 24px',
            }}
          >
            Nouvelle partie
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => setShowSaves(true)}
            fullWidth
            sx={{
              borderColor: '#5865f2',
              color: '#5865f2',
              '&:hover': {
                borderColor: '#4752c4',
                backgroundColor: 'rgba(88, 101, 242, 0.1)',
              },
              fontSize: '1.1rem',
              padding: '12px 24px',
            }}
          >
            Charger une partie
          </Button>
        </Box>
      </Box>

      {/* Saves Manager Modal */}
      {showSaves && (
        <SavesManager
          onLoad={handleLoadSave}
          onClose={() => setShowSaves(false)}
        />
      )}
    </>
  );
};

export default HomePage;