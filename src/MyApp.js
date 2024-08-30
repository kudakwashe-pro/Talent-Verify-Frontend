import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import './App.css'
import { Box, Fab,  useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from './components/Modes';


const App = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  
  return (
    <> <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 1,
      }}
    >
      
      <Fab
      color="primary"
      aria-label={theme.palette.mode}
      onClick={colorMode.toggleColorMode}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '40px',
        height: '40px',
        transition: 'background-color 0.3s ease',
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.dark,
      }}
    >
      {theme.palette.mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon />}
    </Fab>
    </Box>
    </Router>
    </>
  );
};

export default App;