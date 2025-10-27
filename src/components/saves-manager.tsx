import React, { useState, useEffect } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  List,
  ListItem,
  Typography,
  IconButton,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

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

  const refreshSaves = () => {
    setSaves(getSaves());
  };

  const handleCreateSave = () => {
    if (!saveName.trim()) return;
    
    if (currentGameState) {
      saveCurrent(saveName.trim(), currentGameState);
      setSaveName('');
      refreshSaves();
    } else if (onSave) {
      onSave();
      onClose();
    }
  };

  const handleLoad = (data: any) => {
    onLoad(data);
    onClose();
  };

  const handleDelete = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Êtes-vous sûr de vouloir supprimer cette sauvegarde ?')) {
      deleteSave(idx);
      refreshSaves();
    }
  };

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

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <Dialog 
      open={true} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        className: 'saves-popup-content'
      }}
    >
      {/* Header */}
      <DialogTitle className="saves-popup-header">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Gestion des sauvegardes</Typography>
          <IconButton onClick={onClose} size="small" className="saves-popup-close">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      {/* Body */}
      <DialogContent className="saves-popup-body" dividers>
        {/* Create new save section */}
        {currentGameState && (
          <Box className="saves-new-save" sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
              Créer une nouvelle sauvegarde
            </Typography>
            <Box display="flex" gap={1}>
              <TextField
                fullWidth
                size="small"
                placeholder="Nom de la sauvegarde..."
                value={saveName}
                onChange={(e) => setSaveName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && saveName.trim()) {
                    handleCreateSave();
                  }
                }}
                inputProps={{ maxLength: 50 }}
                autoFocus
                className="saves-input"
              />
              <Button
                variant="contained"
                color="success"
                onClick={handleCreateSave}
                disabled={!saveName.trim()}
                startIcon={<SaveIcon />}
                className="saves-create-btn"
              >
                Sauvegarder
              </Button>
            </Box>
          </Box>
        )}

        <Divider sx={{ my: 2 }} />

        {/* Saves list */}
        <Box className="saves-list-section">
          <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
            Sauvegardes ({saves.length})
          </Typography>
          
          {saves.length === 0 ? (
            <Box className="saves-empty" textAlign="center" py={5}>
              <Typography variant="h3" sx={{ opacity: 0.5, mb: 2 }}>
                💾
              </Typography>
              <Typography color="text.secondary">
                Aucune sauvegarde disponible
              </Typography>
            </Box>
          ) : (
            <List className="saves-list">
              {saves.map((save, idx) => (
                <ListItem
                  key={idx}
                  className="saves-item"
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                    p: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    '&:hover': {
                      bgcolor: 'action.hover',
                    }
                  }}
                >
                  <Box flex={1}>
                    <Typography variant="body1" className="saves-item-name">
                      {save.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" className="saves-item-date">
                      {formatDate(save.date)}
                    </Typography>
                  </Box>
                  
                  <Box display="flex" gap={1} className="saves-item-actions">
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleLoad(save.data)}
                    >
                      Charger
                    </Button>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={(e) => handleDelete(idx, e)}
                      className="delete-btn"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </DialogContent>

      {/* Footer */}
      <DialogActions className="saves-popup-footer">
        <Button onClick={onClose} variant="outlined">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { SavesManager, saveCurrent, getSaves };