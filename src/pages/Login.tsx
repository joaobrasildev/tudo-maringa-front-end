import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  AppBar,
  Toolbar,
  Container,
  Link,
  Divider,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useNavigate } from 'react-router-dom';
import tudoMaringaLogo from '../assets/tudomaringa_logo_white.png';
import { getIdToken, loginWithEmail, loginWithFacebook, loginWithGoogle } from '../services/firebase/auth';
import { getUserByUid } from '../services/user/user.service';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
        const user = await loginWithEmail(email, password);
        const token = await getIdToken();
        console.log('Token JWT:', token);
        navigate(`/home`);
    } catch (error) {
        console.error('Erro no login:', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      const token = await getIdToken();
      localStorage.setItem('token', token);
      const user = await getUserByUid()

      if(user) {
        navigate(`/home`);
      } else {
        navigate(`/complete-profile`);
      }       
    } catch (error) {
        console.error('Erro no login com Google:', error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      await loginWithFacebook();
      const token = await getIdToken();
      localStorage.setItem('token', token);      
      const response = await getUserByUid()

      if(response.avatarUrl) {
        navigate(`/home`);
      } else {
        navigate(`/complete-profile`);
      }
    } catch (error) {
        console.error('Erro no login com Facebook:', error);
    }
  };  

  return (
    <>
      {/* Cabeçalho estilo Google */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
          <Typography variant="body2" color="text.secondary">
            v1.0
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Conteúdo central */}
      <Container
        maxWidth="xs"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '80vh',
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          width="100%"
          mb={3}
        >
          <Box width="100%" maxWidth="400px">
            <img
              src={tudoMaringaLogo}
              alt="TUDO Maringá"
              style={{ width: '100%', height: 'auto', borderRadius: 8 }}
            />
          </Box>
        </Box>

        {/* Formulário de email e senha */}
        <Box component="form" noValidate autoComplete="off" display="flex" flexDirection="column" gap={2}>
          <TextField
            label="E-mail"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Box>
            <TextField
              label="Senha"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Box textAlign="right" mt={0.5}>
              <Link href="#" underline="hover" variant="caption">
                Esqueceu sua senha?
              </Link>
            </Box>
          </Box>

          <Button variant="contained" fullWidth onClick={handleLogin}>
            Entrar
          </Button>
        </Box>

        <Divider sx={{ my: 3 }}>ou</Divider>

        {/* Botões sociais */}
        <Box display="flex" flexDirection="column" gap={2}>
          {/* <Button
            variant="outlined"
            fullWidth
            startIcon={<AppleIcon />}
            onClick={handleGoogleLogin}
            sx={{ textTransform: 'none', fontWeight: 500 }}
          >
            Entrar com Apple
          </Button>           */}
          <Button
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
            sx={{ textTransform: 'none', fontWeight: 500 }}
          >
            Entrar com Google
          </Button>

          <Button
            variant="outlined"
            fullWidth
            startIcon={<FacebookIcon />}
            onClick={handleFacebookLogin}
            sx={{ textTransform: 'none', fontWeight: 500 }}
          >
            Entrar com Facebook
          </Button>
        </Box>
      </Container>

      {/* Rodapé simples */}
      <Box
        component="footer"
        sx={{
          width: '100%',
          borderTop: '1px solid #e0e0e0',
          py: 1,
          px: 2,
          textAlign: 'center',
          color: 'text.secondary',
          fontSize: '0.875rem',
        }}
      >
        © {new Date().getFullYear()} Bairros Brasil
      </Box>
    </>
  );
}

export default Login;
