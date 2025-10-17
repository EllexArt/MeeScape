import React, { useState, useEffect } from 'react';

const SAVES_KEY = 'meescape_saves';

type SaveData = {
  name: string;
  date: string;
  data: any;
};

function getSaves(): SaveData[] {
  const raw = localStorage.getItem(SAVES_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveCurrent(name: string, data: any) {
  const saves = getSaves();
  saves.push({ 
    name, 
    date: new Date().toISOString(), 
    data 
  });
  localStorage.setItem(SAVES_KEY, JSON.stringify(saves));
}

function deleteSave(idx: number) {
  const saves = getSaves();
  saves.splice(idx, 1);
  localStorage.setItem(SAVES_KEY, JSON.stringify(saves));
}

type SavesManagerProps = {
  onLoad: (data: any) => void;
  onClose: () => void;
  onSave?: () => void;
  currentGameState?: any;
};

const SavesManager: React.FC<SavesManagerProps> = ({ 
  onLoad, 
  onClose, 
  onSave,
  currentGameState 
}) => {
  const [saves, setSaves] = useState<SaveData[]>(getSaves());
  const [saveName, setSaveName] = useState('');

  // Refresh saves list
  const refreshSaves = () => {
    setSaves(getSaves());
  };

  // Create new save
  const handleCreateSave = () => {
    if (!saveName.trim()) return;
    
    if (currentGameState) {
      saveCurrent(saveName.trim(), currentGameState);
      setSaveName('');
      refreshSaves();
    } else if (onSave) {
      // Fallback to parent's save handler
      onSave();
      onClose();
    }
  };

  // Load save
  const handleLoad = (data: any) => {
    onLoad(data);
    onClose();
  };

  // Delete save
  const handleDelete = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Êtes-vous sûr de vouloir supprimer cette sauvegarde ?')) {
      deleteSave(idx);
      refreshSaves();
    }
  };

  // Format date
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="saves-popup" onClick={onClose}>
      <div className="saves-popup-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="saves-popup-header">
          <h2>Gestion des sauvegardes</h2>
          <button className="saves-popup-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="saves-popup-body">
          {/* Create new save section */}
          {currentGameState && (
            <div className="saves-new-save">
              <h3>Créer une nouvelle sauvegarde</h3>
              <div className="saves-input-group">
                <input
                  type="text"
                  className="saves-input"
                  placeholder="Nom de la sauvegarde..."
                  value={saveName}
                  onChange={(e) => setSaveName(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && saveName.trim()) {
                      handleCreateSave();
                    }
                  }}
                  maxLength={50}
                  autoFocus
                />
                <button
                  className="saves-create-btn"
                  onClick={handleCreateSave}
                  disabled={!saveName.trim()}
                >
                  Sauvegarder
                </button>
              </div>
            </div>
          )}

          {/* Saves list */}
          <div className="saves-list-section">
            <h3>Sauvegardes ({saves.length})</h3>
            {saves.length === 0 ? (
              <div className="saves-empty">
                <div className="saves-empty-icon">💾</div>
                <div className="saves-empty-text">
                  Aucune sauvegarde disponible
                </div>
              </div>
            ) : (
              <ul className="saves-list">
                {saves.map((save, idx) => (
                  <li key={idx} className="saves-item">
                    <div className="saves-item-info">
                      <div className="saves-item-name">{save.name}</div>
                      <div className="saves-item-date">
                        {formatDate(save.date)}
                      </div>
                    </div>
                    <div className="saves-item-actions">
                      <button onClick={() => handleLoad(save.data)}>
                        Charger
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={(e) => handleDelete(idx, e)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="saves-popup-footer">
          <button onClick={onClose}>Fermer</button>
        </div>
      </div>
    </div>
  );
};

export { SavesManager, saveCurrent, getSaves };