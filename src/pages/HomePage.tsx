import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import banner from '../assets/banners/banner.jpg';

// Props du composant
interface HomePageProps {
  onStart: () => void;
}

// Composant HomePage
const HomePage: React.FC<HomePageProps> = ({ onStart }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      textAlign="center"
      bgcolor="#121212"
      color="#fff"
      px={2}
    >
      {/* Banner */}
      <Box
        component="img"
        src={banner}
        alt="MeeScape Banner"
        sx={{
          maxWidth: '80%',
          height: 'auto',
          borderRadius: 2,
          mb: 3,
          boxShadow: 3,
        }}
      />

      {/* Title */}
      <Typography variant="h3" component="h1" gutterBottom>
        MeeScape
      </Typography>

      {/* Description */}
      <Typography variant="h6" component="p" gutterBottom>
        Un visual novel multilingue façon Discord
      </Typography>

      {/* Start Button */}
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={onStart}
        sx={{ mt: 3, px: 4, py: 1.5 }}
      >
        Commencer
      </Button>
    </Box>
  );
};

export default HomePage;
