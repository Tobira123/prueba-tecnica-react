import React from 'react'
import ReactDOM from 'react-dom/client'
import { motion } from 'framer-motion'
import { Provider, useSelector } from 'react-redux'
import { store } from './store'
import App from './App'
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material'
import './styles/index.css'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'


function ThemeWrapper({ children }) {
  const darkMode = useSelector(state => state.theme.darkMode)

  const theme = createTheme({
    typography: {
       fontFamily: 'Poppins, sans-serif',
      h6: {
        fontWeight: 600  
      },
      body2: {
        fontWeight: 400 
      }
    },
    palette: {
      mode: darkMode ? 'dark' : 'light'
    }
  })
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

   
      <motion.div
        animate={{
          backgroundColor: darkMode ? '#121212' : '#fff',
          color: darkMode ? '#fff' : '#000'
        }}
        transition={{ duration: 0.4 }}
        style={{
          minHeight: '100vh',
        }}
      >
        {children}
      </motion.div>
    </ThemeProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeWrapper>
          <App />
        </ThemeWrapper>
      </LocalizationProvider>
    </Provider>
  </React.StrictMode>
)
