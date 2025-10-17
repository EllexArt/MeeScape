import React, { useState } from 'react';
import bannerImg from '../assets/banners/banner.jpg';
import { SavesManager } from '../components/saves-manager';

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
      <div className="home-page">
        {/* Banner */}
        <img
          src={bannerImg}
          alt="MeeScape Banner"
          className="home-banner"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />

        {/* Title */}
        <h1 className="home-title">MeeScape</h1>

        {/* Description */}
        <p className="home-desc">
          Un visual novel multilingue façon Discord
        </p>

        {/* Buttons */}
        <div className="home-buttons">
          <button className="home-btn" onClick={onStart}>
            Nouvelle partie
          </button>
          <button 
            className="home-btn secondary" 
            onClick={() => setShowSaves(true)}
          >
            Charger une partie
          </button>
        </div>
      </div>

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