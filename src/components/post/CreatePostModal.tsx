import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

type CreatePostModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { text: string; image?: File }) => void;
  currentUser: { avatarUrl: string; name: string };
};

const CreatePostModal = ({ open, onClose, onSubmit, currentUser }: CreatePostModalProps) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handlePost = () => {
    if (!text.trim()) return;
    onSubmit({ text, image: image ?? undefined });
    setText('');
    setImage(null);
    setPreviewUrl(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Criar publicação
        <IconButton onClick={onClose}><CloseIcon /></IconButton>
      </DialogTitle>

      <DialogContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar src={currentUser.avatarUrl} sx={{ mr: 1.5 }} />
          <Typography variant="body1">{currentUser.name}</Typography>
        </Box>

        <TextField
          placeholder="No que você está pensando?"
          multiline
          minRows={4}
          fullWidth
          variant="outlined"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <Box mt={2}>
          <Button component="label" variant="outlined">
            Escolher imagem
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
          </Button>

          {previewUrl && (
            <Box mt={2}>
              <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', borderRadius: 8 }} />
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handlePost}>Publicar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePostModal;
