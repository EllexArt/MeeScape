import React from 'react';

const avatarMap: Record<string, string> = {
  'alice.png': require('../assets/avatars/alice.png').default,
  'bob.png': require('../assets/avatars/bob.png').default,
  'charlie.png': require('../assets/avatars/charlie.png').default,
  'mee6.jpg': require('../assets/avatars/mee6.jpg').default,
  'user.png': require('../assets/avatars/user.png').default,
};
const fallback = avatarMap['user.png'];

// Add MEE6 bot to the member list
const members = [
  { id: 'u1', name: 'Alice', avatar: 'alice.png', status: 'online' },
  { id: 'u2', name: 'Bob', avatar: 'bob.png', status: 'idle' },
  { id: 'u3', name: 'Charlie', avatar: 'charlie.png', status: 'dnd' },
  { id: 'u4', name: 'Vous', avatar: 'user.png', status: 'online' },
  { id: 'mee6', name: 'MEE6', avatar: 'mee6.jpg', status: 'online', role: 'BOT' },
];

const MemberList: React.FC = () => (
  <aside className="member-list">
    <div className="member-list-title">Membres en ligne</div>
    {members.map(member => {
      const src = avatarMap[member.avatar] || fallback;
      return (
        <div key={member.id} className={`member ${member.status}`}>
          <img
            src={src}
            alt={member.name}
            className="member-avatar"
            onError={e => (e.currentTarget.src = fallback)}
          />
          <span className="member-name">{member.name}</span>
          {member.role === 'BOT' && (
            <span className="bubble-role" style={{ marginLeft: 8, fontSize: '0.75rem' }}>BOT</span>
          )}
        </div>
      );
    })}
  </aside>
);

export default MemberList;
