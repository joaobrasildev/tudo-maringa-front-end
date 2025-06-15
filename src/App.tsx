import { AppContainer } from './components/app/app.style'
import Header from './components/header/Header'

import { Content } from './components/main/main.style'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './theme'; 
import Footer from './components/footer/Footer';
import Home from './pages/Home';

function App() {
  return (
    <AppContainer>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <Header/>
          <Content>
            <Home/>
          </Content>
          <Footer/>
      </ThemeProvider>
    </AppContainer>
  )
}

export default App
