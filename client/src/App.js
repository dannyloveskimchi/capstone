import { Routes, Route } from "react-router-dom";

import Main from "./Main";
import NotFound from "./NotFound";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme({
  typography: {
      fontFamily: [
          'Montserrat',
          'sans-serif'
      ].join(',')
  }
});

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Routes>
          <Route path="/" element={<Main></Main>}></Route>
          <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
