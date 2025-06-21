import {
  Autocomplete,
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
import { useEffect, useState } from 'react';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { getNeighborhoods } from '../../services/neighborhood/neighborhood.service';
import type { IExibitionModal } from '../../interfaces/exibition-modal.interface';

type ExibitionModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: IExibitionModal) => Promise<void>;
  currentUser: { avatarUrl: string; name: string };
  placeholderTextField: string;
  placeholderNeighborhood: string,
  neighborhoodRequired?: boolean;
};

export type NeighborhoodOption = { id: string; name: string };

const ExibitionModal = ({ 
  open, 
  onClose, 
  onSubmit, 
  currentUser,
  placeholderTextField,
  placeholderNeighborhood,
  neighborhoodRequired = false 
}: ExibitionModalProps) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [neighborhood, setNeighborhood] = useState<NeighborhoodOption | null>(null);
  const [neighborhoodOptions, setNeighborhoodOptions] = useState<NeighborhoodOption[]>([]);

  useEffect(() => {
    if (!open) {
      setText('');
      setImage(null);
      setPreviewUrl(null);
      setNeighborhood(null);
    } else {
      (async () => {
        const neighborhoods = await getNeighborhoods();
        setNeighborhoodOptions(
          neighborhoods.map((neighborhood: any) => (
            { 
              id: neighborhood.id, 
              name: neighborhood.name 
            }
          ))
        );
      })();
    }
  }, [open]);
  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handlePost = () => {
    if (!text.trim()) return;
    if (neighborhoodRequired && !neighborhood) return;
    onSubmit({ 
      text, 
      image: image ?? undefined, 
      neighborhood: neighborhood ?? undefined 
    });
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
          placeholder={placeholderTextField}
          multiline
          minRows={4}
          fullWidth
          variant="outlined"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <Box display="flex" alignItems="center" gap={1} mt={2}>
          <IconButton color="primary" component="label" sx={{ height: 40, width: 40 }}>
            <AddAPhotoIcon />
            <input hidden accept="image/*" type="file" onChange={handleImageChange} />
          </IconButton>

          <Box flex={1}>
            <Autocomplete<NeighborhoodOption>
              options={neighborhoodOptions}
              value={neighborhood}
              onChange={(_, newValue) => setNeighborhood(newValue)}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={placeholderNeighborhood}
                  size="small"
                  error={neighborhoodRequired && !neighborhood}
                  helperText={neighborhoodRequired && !neighborhood ? 'Selecione um bairro' : ''}
                />
              )}
              fullWidth
            />
          </Box>
        </Box>         

        {previewUrl && (
          <Box mt={2}>
            <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', borderRadius: 8 }} />
          </Box>
        )}     
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handlePost}>Publicar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExibitionModal;
