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

import logo from "../../assets/logo.svg";

const useStyles = makeStyles(theme => ({
    toolbarMargin: {
        ...theme.mixins.toolbar,
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
}));

const Header = () => {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    const [value, setValue] = useState(0);
    const [anchorEl, setanchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleChange = (e, value) => {
        setValue(value);
    };

    const handleClick = e => {
        setanchorEl(e.currentTarget);
        setOpen(true);
    };

    const handleClose = () => {
        setanchorEl(null);
        setOpen(false);
    };

    const handleMenuItemClick = (e, i) => {
        setanchorEl(null);
        setOpen(false);
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
    }, [value, menuOptions, selectedIndex, routes]);
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
                keepMounted
                classes={{
                    paper: classes.menu,
                }}
                id="simple-menu"
                anchorEl={anchorEl}
                open={open}
                MenuListProps={{
                    onMouseLeave: handleClose,
                }}
                elevation={0}>
                {menuOptions.map((option, i) => (
                    <MenuItem
                        key={option.selectedIndex}
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

    return (
        <React.Fragment>
            <ElevationScroll>
                {/* Notice that position is set to "sticky". CssBaseline is necessary; otherwise, text would be hidden behind the AppBar component. */}
                <AppBar position="sticky" color="primary">
                    <Toolbar disableGutters>
                        <Button className={classes.logoContainer} component={Link} to="/" onClick={() => setValue(0)} disableRipple>
                            <img src={logo} alt="company logo" className={classes.logo} />
                        </Button>
                        {matches ? undefined : tabs}
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
