import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Stack,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Autocomplete } from '@mui/material';
import { getNeighborhoods } from '../services/neighborhood/neighborhood.service';
import { getValidToken, loginWithEmail } from '../services/firebase/auth';
import { compressImage } from '../utils/compress-image.service';
import { createUser, getUserByUid } from '../services/user/user.service';
import { useNavigate } from 'react-router-dom';

interface NeighborhoodOption {
  id: string;
  name: string;
}

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('https://via.placeholder.com/100');
  const [livesInMaringa, setLivesInMaringa] = useState(false);
  const [neighborhood, setNeighborhood] = useState<NeighborhoodOption | null>(null);
  const [neighborhoodOptions, setNeighborhoodOptions] = useState<NeighborhoodOption[]>([]);
    const navigate = useNavigate();

  useEffect(() => {
    if (livesInMaringa) return;
    const fetchNeighborhoods = async () => {
      try {
        const neighborhoods = await getNeighborhoods();
        setNeighborhoodOptions(neighborhoods.map((n: any) => ({ id: n.id, name: n.name })));
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

  const handleRegister = async () => {
    try {
      await loginWithEmail(email, password);
      await getValidToken()

      const formData = new FormData();
      if (file) {
        const compressedFile = await compressImage(file, { maxSizeMB: 0.2, maxWidthOrHeight: 256 });
        formData.append('avatar', compressedFile);
      }
      if (livesInMaringa && neighborhood) {
        formData.append('neighborhoodId', neighborhood.id);
      }
      formData.append('avatarContentType', 'image/png')
      await createUser(formData)
      const user = await getUserByUid()
      if(user) {
        navigate(`/home`);
      } else {
        navigate(`/login`);
      }
    } catch (error) {
      console.error('Erro ao criar conta:', error);
    }
  };

  return (
    <Box
      maxWidth={460}
      mx="auto"
      mt={6}
      p={4}
      borderRadius={2}
      boxShadow={3}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <Typography variant="h5" textAlign="center">
        Criar conta
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
            <Autocomplete<NeighborhoodOption>
              options={neighborhoodOptions}
              value={neighborhood}
              onChange={(_, newValue) => setNeighborhood(newValue)}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => <TextField {...params} label="Bairro" />}
              fullWidth
            />
          </Box>
        )}
      </Box>      

      {/* Campo Nome */}
      <TextField
        label="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
      />

      {/* Campo Email */}
      <TextField
        label="E-mail"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />

      {/* Campo Senha */}
      <TextField
        label="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />

      {/* Botão de Submit */}
      <Button
        variant="contained"
        fullWidth
        size="large"
        onClick={handleRegister}
        sx={{ textTransform: 'none'}}
      >
        Criar conta
      </Button>
    </Box>
  );
}

export default Register;
