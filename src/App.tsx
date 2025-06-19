import { AppContainer } from './components/app/app.style'
import Header from './components/header/Header'

import { Content } from './components/main/main.style'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './theme'; 
import Footer from './components/footer/Footer';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import CompleteProfile from './pages/CompleteProfile';
//import { useEffect } from 'react';
//import { fetchCurrentUser } from './services/user/user.service';
import Register from './pages/Register';
import { AuthProvider } from './providers/auth.provider';

function App() {
  // useEffect(() => {
  //   const loadUser = async () => {
  //     const user = await fetchCurrentUser();
  //     if (user) {
  //       setCurrentUser(user);
  //       localStorage.setItem('currentUser', JSON.stringify(user));
  //     }
  //   };

  //   loadUser();
  // }, []);

  return (
    <AuthProvider>
      <AppContainer>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <Header/>
            <Content>
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/complete-profile" element={<CompleteProfile />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </Content>
            <Footer/>
        </ThemeProvider>
      </AppContainer>
    </AuthProvider>
  )
}

export default App
