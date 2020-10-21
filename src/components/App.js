import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './ui/Theme';

import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Header from './ui/Header';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <h1>Hello world</h1>
      <Button variant='contained' color='primary'>
        Hello World
      </Button>
      <p>
        {[...new Array(200)]
          .map(
            () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
          )
          .join('\n')}
      </p>
    </ThemeProvider>
  );
}

export default App;
