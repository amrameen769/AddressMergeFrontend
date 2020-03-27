import React, {Component} from 'react';
import AppBar from "@material-ui/core/AppBar";
import withStyles from "@material-ui/styles/withStyles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {Link, withRouter} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import {CssBaseline} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {AccountCircle} from "@material-ui/icons";
import {authMenu, guestMenu} from "./Menu";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import NavDrawer from "./NavDrawer";

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
    accountsButton: {
        marginLeft: theme.spacing(2),
    },
    navDrawer: {
        display: "none",
        [theme.breakpoints.down("sm")]: {
            display: "block"
        }
    }
});

class NavBar extends Component {
    state = {
        tabValue: 0,
        auth: false
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

    render() {
        const {classes} = this.props;
        const {auth} = this.state;
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
                        <div className={classes.navDrawer}><NavDrawer/></div>
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
                        <div className={classes.accountsButton}>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                <div id="back-to-top-anchor" className={classes.offset}/>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(NavBar));