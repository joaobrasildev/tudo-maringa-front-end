import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Autocomplete,
  Typography,
  Avatar,
  Stack,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { getNeighborhoods } from '../services/neighborhood/neighborhood.service';

function CompleteProfile() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('https://via.placeholder.com/100');
  const [livesInMaringa, setLivesInMaringa] = useState(false);
  const [neighborhood, setNeighborhood] = useState<string | null>(null);
  const [neighborhoodOptions, setNeighborhoodOptions] = useState<string[]>([]);

  useEffect(() => {
    if (livesInMaringa) return;
    const fetchNeighborhoods = async () => {
      try {
        const neighborhoods = await getNeighborhoods();
        setNeighborhoodOptions(neighborhoods.map((neighborhood: any) => neighborhood.name));
      } catch (error) {
        console.error('Erro ao buscar bairros:', error);
      }
    };

    fetchNeighborhoods();
  }, [livesInMaringa]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    if (file) formData.append('photo', file);
    formData.append('livesInMaringa', String(livesInMaringa));
    if (livesInMaringa && neighborhood) formData.append('neighborhood', neighborhood);

    await fetch('/api/users/me/profile', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    });

    window.location.href = '/home';
  };

  return (
    <Box
      maxWidth="sm"
      mx="auto"
      mt={6}
      p={4}
      borderRadius={2}
      boxShadow={3}
      display="flex"
      flexDirection="column"
      gap={4}
    >
      <Typography variant="h5" textAlign="center">
        Complete seu perfil
      </Typography>

      {/* Upload e Preview da Imagem */}
      <Stack alignItems="center" spacing={1}>
        <Avatar
          src={previewUrl}
          sx={{ width: 100, height: 100, border: '2px solid #1976d2' }}
        />
        <Button
          variant="outlined"
          component="label"
          startIcon={<CloudUploadIcon />}
          sx={{ textTransform: 'none' }}
        >
          Alterar foto
          <input type="file" hidden onChange={handleFileChange} accept="image/*" />
        </Button>
      </Stack>

      {/* Mora em Maringá + Bairro */}
      <Box
        display="grid"
        gridTemplateColumns={{ xs: '1fr', sm: livesInMaringa ? '1fr 1fr' : '1fr' }}
        gap={2}
        alignItems="center"
      >
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={livesInMaringa}
                onChange={(e) => setLivesInMaringa(e.target.checked)}
              />
            }
            label="Moro em Maringá"
          />
        </Box>

        {livesInMaringa && (
          <Box>
            <Autocomplete
              options={neighborhoodOptions}
              value={neighborhood}
              onChange={(_, newValue) => setNeighborhood(newValue)}
              renderInput={(params) => <TextField {...params} label="Bairro" />}
              fullWidth
            />
          </Box>
        )}
      </Box>

      {/* Botão de Submit */}
      <Button
        variant="contained"
        fullWidth
        size="large"
        onClick={handleSubmit}
        sx={{ textTransform: 'none' }}
      >
        Salvar e continuar
      </Button>
    </Box>
  );
}

export default CompleteProfile;
