import { AppContainer } from './components/app/app.style'
import Header from './components/header/Header'
import { Footer } from 'antd/es/layout/layout'
import { Content } from './components/main/main.style'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './theme'; 

function App() {
  return (
    <AppContainer>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <Header/>
          <Content>
          </Content>
          <Footer/>
      </ThemeProvider>
    </AppContainer>
  )
}

export default App
