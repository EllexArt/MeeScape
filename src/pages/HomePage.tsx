import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { SavesManager } from '../components/saves-manager';
import bannerImg from '../assets/banners/banner.jpg';

interface HomePageProps {
  onStart: () => void;
  onLoadSave?: (data: any) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStart, onLoadSave }) => {
  const [showSaves, setShowSaves] = useState(false);

  const handleLoadSave = (data: any) => {
    if (onLoadSave) {
      onLoadSave(data);
    }
    setShowSaves(false);
  };

  return (
    <>
      <Box className="home-page">
        {/* Banner */}
        <Box
          component="img"
          src={bannerImg}
          alt="MeeScape Banner"
          className="home-banner"
          onError={(e: any) => {
            e.currentTarget.style.display = 'none';
          }}
        />

        {/* Title */}
        <Typography variant="h2" component="h1" className="home-title">
          MeeScape
        </Typography>

        {/* Description */}
        <Typography variant="h6" component="p" className="home-desc">
          Un visual novel multilingue façon Discord
        </Typography>

        {/* Buttons */}
        <Box className="home-buttons">
          <Button 
            variant="contained" 
            size="large"
            className="home-btn" 
            onClick={onStart}
            fullWidth
          >
            Nouvelle partie
          </Button>
          <Button 
            variant="outlined"
            size="large"
            className="home-btn secondary" 
            onClick={() => setShowSaves(true)}
            fullWidth
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