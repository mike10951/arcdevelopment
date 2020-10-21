import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Header from './ui/Header';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <h1>Hello world</h1>
      <Button variant='contained' color='primary'>
        Hello World
      </Button>
    </React.Fragment>
  );
}

export default App;
