import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from "@mui/material/styles";
import UserProvider from './context/UserContext.jsx'


const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <ThemeProvider theme={theme}>
    <BrowserRouter>
    <UserProvider>
    <App />

    </UserProvider>

    </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
