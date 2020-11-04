/* eslint-disable react/prop-types */
import React, {useState, useEffect} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import {makeStyles} from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {useTheme} from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuIcon from "@material-ui/icons/Menu";
import {IconButton} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import logo from "../../assets/logo.svg";

const useStyles = makeStyles(theme => ({
    toolbarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: "3em",
        [theme.breakpoints.down("md")]: {
            marginBottom: "2em",
        },
        [theme.breakpoints.down("xs")]: {
            marginBottom: "1.25em",
        },
    },
    logo: {
        height: "8em",
        [theme.breakpoints.down("md")]: {
            height: "7em",
        },
        [theme.breakpoints.down("xs")]: {
            height: "5.5em",
        },
    },
    logoContainer: {
        padding: 0,
        "&:hover": {
            backgroundColor: "transparent",
        },
    },
    tabContainer: {
        marginLeft: "auto",
    },
    tab: {
        ...theme.typography.tab,
        minWidth: 10,
        marginLeft: "25px",
    },
    button: {
        ...theme.typography.estimate,
        borderRadius: "50px",
        marginLeft: "50px",
        marginRight: "25px",
        height: "45px",
        "&:hover": {
            backgroundColor: theme.palette.secondary.light,
        },
    },
    menu: {
        backgroundColor: theme.palette.common.blue,
        color: "white",
        borderRadius: "0px",
    },
    menuItem: {
        ...theme.typography.tab,
        opacity: 0.7,
        "&:hover": {
            opacity: 1,
        },
    },
    drawerIcon: {
        height: "px",
        width: "50px",
    },
    drawerIconContainer: {
        marginLeft: "auto",
        "&:hover": {
            backgroundColor: "transparent",
        },
    },
    drawer: {
        backgroundColor: theme.palette.common.blue,
    },
    drawerItem: {
        ...theme.typography.tab,
        color: "white",
        opacity: 0.7,
    },
    drawerItemSelected: {
        "& .MuiListItemText-root": {
            opacity: 1,
        },
    },
    drawerItemEstimate: {
        backgroundColor: theme.palette.common.orange,
    },
    appbar: {
        zIndex: theme.zIndex.modal + 1,
    },
}));

const Header = ({value, setValue, selectedIndex, setSelectedIndex}) => {
    const classes = useStyles();
    const theme = useTheme();
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    const [anchorEl, setanchorEl] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    const handleClick = e => {
        setanchorEl(e.currentTarget);
        setOpenMenu(true);
    };

    const handleClose = () => {
        setanchorEl(null);
        setOpenMenu(false);
    };

    const handleMenuItemClick = (e, i) => {
        setanchorEl(null);
        setOpenMenu(false);
        setSelectedIndex(i);
    };

    const menuOptions = [
        {
            name: "Services",
            link: "/services",
            activeIndex: 1,
            selectedIndex: 0,
        },
        {
            name: "Custom Software Development",
            link: "/customsoftware",
            activeIndex: 1,
            selectedIndex: 1,
        },
        {
            name: "Mobile App Development",
            link: "/mobileapps",
            activeIndex: 1,
            selectedIndex: 2,
        },
        {
            name: "Website Development",
            link: "/websites",
            activeIndex: 1,
            selectedIndex: 3,
        },
    ];
    const routes = [
        {name: "Home", link: "/", activeIndex: 0},
        {
            name: "Services",
            link: "/services",
            activeIndex: 1,
            ariaOwns: anchorEl ? "simple-menu" : undefined,
            ariaPopup: anchorEl ? "true" : undefined,
            mouseOver: event => handleClick(event),
        },
        {
            name: "The Revolution",
            link: "/revolution",
            activeIndex: 2,
        },
        {
            name: "About Us",
            link: "/about",
            activeIndex: 3,
        },
        {
            name: "Contact Us",
            link: "/contact",
            activeIndex: 4,
        },
    ];

    useEffect(() => {
        [...menuOptions, ...routes].forEach(route => {
            switch (window.location.pathname) {
                case `${route.link}`:
                    if (value !== route.activeIndex) {
                        setValue(route.activeIndex);
                        if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
                            setSelectedIndex(route.selectedIndex);
                        }
                    }
                    break;
                default:
                    break;
            }
        });
    }, [value, menuOptions, selectedIndex, routes, setSelectedIndex, setValue]);
    const tabs = (
        <React.Fragment>
            <Tabs className={classes.tabContainer} value={value} onChange={handleChange} indicatorColor="primary">
                {routes.map(route => (
                    <Tab
                        className={classes.tab}
                        key={route.activeIndex}
                        label={route.name}
                        component={Link}
                        to={route.link}
                        aria-owns={route.ariaOwns}
                        aria-haspopup={route.ariaPopup}
                        onMouseOver={route.mouseOver}
                    />
                ))}
            </Tabs>
            <Button variant="contained" color="secondary" className={classes.button} component={Link} to="/estimate">
                Free Estimate
            </Button>
            <Menu
                style={{zIndex: 1302}}
                keepMounted
                classes={{
                    paper: classes.menu,
                }}
                id="simple-menu"
                anchorEl={anchorEl}
                open={openMenu}
                MenuListProps={{
                    onMouseLeave: handleClose,
                }}
                elevation={0}>
                {menuOptions.map((option, i) => (
                    <MenuItem
                        key={`${option}${i}`}
                        component={Link}
                        to={option.link}
                        classes={{
                            root: classes.menuItem,
                        }}
                        onClick={event => {
                            handleMenuItemClick(event, i);
                            setValue(option.activeIndex);
                            handleClose();
                        }}
                        selected={i === selectedIndex && value === 1}>
                        {option.name}
                    </MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    );

    const drawer = (
        <React.Fragment>
            <SwipeableDrawer
                disableBackdropTransition={!iOS}
                disableDiscovery={iOS}
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                onOpen={() => setOpenDrawer(true)}
                classes={{paper: classes.drawer}}>
                <div className={classes.toolbarMargin} />
                <List disablePadding>
                    {routes.map(option => (
                        <ListItem
                            divider
                            button
                            component={Link}
                            to={option.link}
                            key={option.link}
                            onClick={() => {
                                setOpenDrawer(false);
                                setValue(option.activeIndex);
                            }}
                            selected={value === option.activeIndex}
                            classes={{selected: classes.drawerItemSelected}}>
                            <ListItemText disableTypography className={classes.drawerItem}>
                                {option.name}
                            </ListItemText>
                        </ListItem>
                    ))}
                    <ListItem
                        divider
                        button
                        classes={{root: classes.drawerItemEstimate, selected: classes.drawerItemSelected}}
                        component={Link}
                        to="/estimate"
                        onClick={() => {
                            setOpenDrawer(false);
                            setValue(5);
                        }}>
                        <ListItemText disableTypography className={classes.drawerItem}>
                            Free Estimate
                        </ListItemText>
                    </ListItem>
                </List>
            </SwipeableDrawer>
            <IconButton onClick={() => setOpenDrawer(!openDrawer)} disableRipple className={classes.drawerIconContainer}>
                <MenuIcon className={classes.drawerIcon} />
            </IconButton>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <ElevationScroll>
                {/* Notice that position is set to "sticky". CssBaseline is necessary; otherwise, text would be hidden behind the AppBar component. */}
                <AppBar position="sticky" color="primary" className={classes.appbar}>
                    <Toolbar disableGutters>
                        <Button className={classes.logoContainer} component={Link} to="/" onClick={() => setValue(0)} disableRipple>
                            <img src={logo} alt="company logo" className={classes.logo} />
                        </Button>
                        {matches ? drawer : tabs}
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            {/* This div would be necessary if CssBaseline was not used. */}
            {/* <div className={classes.toolbarMargin}></div> */}
        </React.Fragment>
    );
};

function ElevationScroll(props) {
    const {children} = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

export default Header;
