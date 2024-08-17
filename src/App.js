import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import './App.css'
import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';


const theme = createTheme({
  palette: {
    background: {
      default: '#FFFFFF' // Your desired background color
    }
  }
})

const App = () => {
  return (
    <ThemeProvider theme={theme}>
       <CssBaseline enableColorScheme />
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
};

export default App;