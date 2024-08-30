import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from '../MyApp';
import { CssBaseline } from '@mui/material';

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState(localStorage.getItem('mode')|| 'dark')
  
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        localStorage.setItem('mode',mode);
      },
    }),
    [mode],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
         mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
      <CssBaseline/>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}