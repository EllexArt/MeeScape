import React, { useState } from 'react';

const SAVES_KEY = 'meescape_saves';

function getSaves() {
  const raw = localStorage.getItem(SAVES_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveCurrent(name: string, data: any) {
  const saves = getSaves();
  saves.push({ name, date: new Date().toISOString(), data });
  localStorage.setItem(SAVES_KEY, JSON.stringify(saves));
}

function deleteSave(idx: number) {
  const saves = getSaves();
  saves.splice(idx, 1);
  localStorage.setItem(SAVES_KEY, JSON.stringify(saves));
}

const SavesManager: React.FC<{ onLoad: (data: any) => void; onClose: () => void }> = ({ onLoad, onClose }) => {
  const [saves, setSaves] = useState(getSaves());

  const handleDelete = (idx: number) => {
    deleteSave(idx);
    setSaves(getSaves());
  };

  return (
    <div className="saves-popup">
      <div className="saves-popup-content">
        <h2>Gestion des sauvegardes</h2>
        <ul className="saves-list">
          {saves.map((s: any, i: number) => (
            <li key={i} className="saves-item">
              <span>{s.name} <small>({new Date(s.date).toLocaleString()})</small></span>
              <button onClick={() => onLoad(s.data)}>Charger</button>
              <button onClick={() => handleDelete(i)}>Supprimer</button>
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
};

export { SavesManager, saveCurrent };
