import React, {Component} from 'react';
import AppBar from "@material-ui/core/AppBar";
import withStyles from "@material-ui/styles/withStyles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {Link, withRouter} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import {CssBaseline, fade, InputBase, Paper} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {AccountCircle} from "@material-ui/icons";
import {authMenu, guestMenu} from "./Menu";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import NavDrawer from "./NavDrawer";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    offset: theme.mixins.toolbar,
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    link: {
        textDecoration: "none",
        color: "inherit"
    },
    tabContainer: {
        marginLeft: 32,
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
    },
    tabItem: {
        paddingTop: 20,
        paddingBottom: 20,
        minWidth: "auto"
    },
    navDrawer: {
        display: "none",
        [theme.breakpoints.down("sm")]: {
            display: "block"
        }
    },
    search: {
        display: 'flex',
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        width: 'auto',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '15ch',
        }
    }
});

class NavBar extends Component {
    state = {
        tabValue: 0,
        auth: false,
        anchorEl: null,
        search: ""
    };

    currentAuth = () => {
        // console.log(this.props.history.location.pathname);
        switch (this.props.history.location.pathname) {
            case "/" :
                return 0;
            case "/address-book":
                return 1;
            case "/dashboard" :
                return 2;
            case "/editor" :
                return 3;
            default :
                return 0;
        }
    };

    currentGuest = () => {
        // console.log(this.props.history.location.pathname);
        switch (this.props.history.location.pathname) {
            case "/" :
                return 0;
            case "/get-started" :
                return 1;
            case "/register" :
                return 2;
            case "/login" :
                return 3;
            default :
                return 0;
        }
    };

    handleChange = (event, value) => {
        this.setState({tabValue: value});
    };

    handleToggler = () => {
        this.setState(prevState => ({
            auth: !prevState.auth
        }));
    };
    handleMenuClose = () => {
        this.setState({
            anchorEl: null
        })
    };

    handleMenuOpen = (event) => {
        this.setState({
            anchorEl: event.currentTarget
        })
    };

    render() {
        const {classes} = this.props;
        const {auth, anchorEl} = this.state;
        const menuId = "primary-menu";
        const menuOpen = Boolean(anchorEl);

        const renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{vertical: "top", horizontal: "right"}}
                id={menuId}
                keepMounted
                transformOrigin={{vertical: "top", horizontal: "right"}}
                open={menuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleMenuClose} component={Link} to={"/profile-settings"}>Profile</MenuItem>
            </Menu>
        );

        return (
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar position={"fixed"} color={"primary"} className={classes.appBar}>
                    <Toolbar>
                        <FormGroup>
                            <FormControlLabel
                                control={<Switch checked={auth} onChange={this.handleToggler}
                                                 aria-label="login switch"/>}
                                label={auth ? 'Logout' : 'Login'}
                            />
                        </FormGroup>
                        <div className={classes.navDrawer}><NavDrawer auth={auth}/></div>
                        <Link to={"/"} className={classes.link}>
                            <Typography>
                                <span>AddressMerge WEB</span>
                            </Typography>
                        </Link>
                        <div className={classes.tabContainer}>
                            {this.state.auth ? (
                                <Tabs
                                    value={this.currentAuth()}
                                    onChange={this.handleChange}
                                    variant={"scrollable"}
                                >
                                    {authMenu.map((item, index) => (
                                        <Tab
                                            key={index}
                                            component={Link}
                                            to={{
                                                pathname: item.pathname,
                                                search: this.props.location.search
                                            }}
                                            classes={{root: classes.tabItem}}
                                            label={item.label}
                                        />
                                    ))}
                                </Tabs>
                            ) : (
                                <Tabs
                                    variant={"scrollable"}
                                    value={this.currentGuest()}
                                    onChange={this.handleChange}>
                                    {guestMenu.map((item, index) => (
                                        <Tab
                                            key={index}
                                            component={Link}
                                            to={{
                                                pathname: item.pathname,
                                                search: this.props.location.search
                                            }}
                                            classes={{root: classes.tabItem}}
                                            label={item.label}/>
                                    ))}
                                </Tabs>
                            )}
                        </div>
                        <Paper className={classes.search} component={'form'}>
                            <InputBase
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput
                                }}
                                placeholder={"Search"}
                            />
                            <IconButton>
                                <SearchIcon/>
                            </IconButton>
                        </Paper>
                        <div className={classes.root}/>
                        {this.state.auth && (
                            <div>
                                <IconButton
                                    edge={"end"}
                                    aria-label="account of current user"
                                    aria-controls="menuId"
                                    aria-haspopup="true"
                                    onClick={this.handleMenuOpen}
                                    color="inherit"
                                >
                                    <AccountCircle/>
                                </IconButton>
                                {renderMenu}
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
                <div id="back-to-top-anchor" className={classes.offset}/>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(NavBar));