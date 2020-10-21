import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button'

import logo from '../../assets/logo.svg'

const useStyles = makeStyles(theme => ({
    toolbarMargin: {
        ...theme.mixins.toolbar
    },
    logo: {
        height: '7em'
    },
    tabContainer: {
        marginLeft: 'auto'
    },
    tab: {
        ...theme.typography.tab,
        minWidth: 10,
        marginLeft: '25px'
    },
    button: {
        ...theme.typography.estimate,
        borderRadius: '50px',
        marginLeft: '50px',
        marginRight: '25px',
        height: '45px',
    }
}))

const Header = (props) => {
    const classes = useStyles()
    const [value, setValue] = useState(0)

    const handleChange = (e, value) => {
        setValue(value)
    }

    return (
        <React.Fragment>
            <ElevationScroll>
                {/* Notice that position is set to "sticky". CssBaseline is necessary; otherwise, text would be hidden behind the AppBar component. */}
                <AppBar position='sticky' color='primary'>
                    <Toolbar disableGutters>
                        <img src={logo} alt="company logo" className={classes.logo} />
                        <Tabs className={classes.tabContainer} value={value} onChange={handleChange} indicatorColor='primary'>
                            <Tab className={classes.tab} label='Home' />
                            <Tab className={classes.tab} label='Services' />
                            <Tab className={classes.tab} label='The Revolution' />
                            <Tab className={classes.tab} label='About Us' />
                            <Tab className={classes.tab} label='Contact Us' />
                        </Tabs>
                        <Button variant="contained" color='secondary' className={classes.button}>Free Estimate</Button>
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
