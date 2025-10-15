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
    <div className="profile-bar">
      <img
        src={avatarSrc}
        alt={profile.name}
        className="profile-avatar"
        onError={() => setAvatarSrc(fallback)}
      />
      <div className="profile-info">
        <div className="profile-name">{profile.name}</div>
        <div className="profile-role">{profile.role}</div>
      </div>
      <div className="profile-status online" title="En ligne"></div>
      <div className="profile-actions">
        <button title="Modifier le profil" className="profile-btn" onClick={() => setShowPopup(true)}>⚙️</button>
      </div>
      {showPopup && (
        <div className="profile-popup">
          <div className="profile-popup-content">
            <div className="profile-popup-title">Modifier le nom</div>
            <input
              className="profile-edit-name"
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={20}
              autoFocus
            />
            <div className="profile-popup-actions">
              <button className="profile-popup-btn" onClick={save}>Valider</button>
              <button className="profile-popup-btn cancel" onClick={cancel}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileBar;
