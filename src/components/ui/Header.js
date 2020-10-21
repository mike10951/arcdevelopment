import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/core/styles';

import logo from '../../assets/logo.svg'

const useStyles = makeStyles(theme => ({
    toolbarMargin: {
        ...theme.mixins.toolbar
    },
    logo: {
        height: '7em'
    }
}))

const Header = (props) => {
    const classes = useStyles()

    return (
        <React.Fragment>
            <ElevationScroll>
                {/* Notice that position is set to "sticky". CssBaseline is necessary; otherwise, text would be hidden behind the AppBar component. */}
                <AppBar position='sticky' color='primary'>
                    <Toolbar disableGutters>
                        <img src={logo} alt="company logo" className={classes.logo} />
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            {/* This div would be necessary if CssBaseline was not used. */}
            {/* <div className={classes.toolbarMargin}></div> */}
        </React.Fragment>
    );
};

function ElevationScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

export default Header;
