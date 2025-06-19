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
import FacebookIcon from '@mui/icons-material/Facebook';
import { useNavigate } from 'react-router-dom';
import tudoMaringaLogo from '../assets/tudomaringa_logo_white.png';
import { getValidToken, loginWithFacebook, loginWithGoogle } from '../services/firebase/auth';
import { getUserByUid } from '../services/user/user.service';
import { useAuth } from '../providers/auth.provider';
import { auth } from '../services/firebase/firebase';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  // const handleLogin = async () => {
  //   try {
  //       const user = await loginWithEmail(email, password);
  //       await getValidToken()
  //       navigate(`/home`);
  //   } catch (error) {
  //       console.error('Erro no login:', error);
  //   }
  // };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      await getValidToken()
      const user = await getUserByUid()
      login(auth.currentUser); 

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
      await getValidToken()     
      const user = await getUserByUid()
      login(auth.currentUser); 

      if(user) {
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
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
          <Typography variant="body2" color="text.secondary">
            v0.1
          </Typography>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="xs"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
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

        <Box component="form" noValidate autoComplete="off" display="flex" flexDirection="column" gap={2}>
          <TextField
            label="E-mail"
            type="email"
            fullWidth
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <Box>
            <TextField
              label="Senha"
              type="password"
              fullWidth
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Box textAlign="right" mt={0.5}>
              <Link href="#" underline="hover" variant="caption">
                Esqueceu sua senha?
              </Link>
            </Box>
          </Box>

          <Button variant="contained" fullWidth /*onClick={handleLogin}*/>
            Entrar
          </Button>
        </Box>
        <Box textAlign="center" mt={1}>
          <Link href="/register" underline="hover" variant="body2">
            Não tem conta? Cadastre-se
          </Link>
        </Box>

        <Divider sx={{ my: 3 }}>ou</Divider>

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
    </>
  );
}

export default Login;
