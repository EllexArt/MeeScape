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
  data: unknown;
};

function getSaves(): SaveData[] {
  const raw = localStorage.getItem(SAVES_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveCurrent(name: string, data: unknown) {
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
  onLoad: (data: unknown) => void;
  onClose: () => void;
  onSave?: () => void;
  currentGameState?: unknown;
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

  const handleLoad = (data: unknown) => {
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
        sx: {
          backgroundColor: '#2b2d31',
          color: '#f2f3f5',
        }
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          backgroundColor: '#1e1f22',
          borderBottom: '1px solid #232428',
          padding: '16px 24px',
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Gestion des sauvegardes</Typography>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              color: '#b5bac1',
              '&:hover': {
                color: '#dbdee1',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      {/* Body */}
      <DialogContent
        dividers
        sx={{
          backgroundColor: '#2b2d31',
          padding: '24px',
          maxHeight: '60vh',
          overflowY: 'auto',
        }}
      >
        {/* Create new save section */}
        {currentGameState && (
          <Box sx={{ mb: 3 }}>
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
              />
              <Button
                variant="contained"
                color="success"
                onClick={handleCreateSave}
                disabled={!saveName.trim()}
                startIcon={<SaveIcon />}
              >
                Sauvegarder
              </Button>
            </Box>
          </Box>
        )}

        <Divider sx={{ my: 2 }} />

        {/* Saves list */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
            Sauvegardes ({saves.length})
          </Typography>
          
          {saves.length === 0 ? (
            <Box textAlign="center" py={5}>
              <Typography variant="h3" sx={{ opacity: 0.5, mb: 2 }}>
                💾
              </Typography>
              <Typography color="text.secondary">
                Aucune sauvegarde disponible
              </Typography>
            </Box>
          ) : (
            <List>
              {saves.map((save, idx) => (
                <ListItem
                  key={idx}
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
                    <Typography variant="body1">
                      {save.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(save.date)}
                    </Typography>
                  </Box>
                  
                  <Box display="flex" gap={1}>
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
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { SavesManager, saveCurrent, getSaves };