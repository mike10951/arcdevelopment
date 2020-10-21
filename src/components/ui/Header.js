import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const Header = (props) => {
  return (
    // Notice that position is set to "sticky". CssBaseline is necessary; otherwise, text would be hidden behind the AppBar component.
    <AppBar position='sticky'>
      <Toolbar>Arc Development</Toolbar>
    </AppBar>
  );
};

export default Header;
