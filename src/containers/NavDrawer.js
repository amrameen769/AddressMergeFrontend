import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import {authMenu, guestMenu} from "./Menu";
import {Link} from "react-router-dom";

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
    list: {
        width: 250,
    },
    toolbar: theme.mixins.toolbar,
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth,
    }
}));

export default function NavDrawer() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false
    });

    const toggleDrawer = (anchor, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({...state, [anchor]: open});
    };

    const list = anchor => (
        <div
            className={classes.toolbar}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List className={classes.list}>
                {authMenu.map((item, index) => (
                    <ListItem
                        button
                        component={Link}
                        to={{
                            pathname: item.pathname,
                            search: window.location.search
                        }}
                        key={index}>
                        <ListItemText primary={item.label}/>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <List>
                {guestMenu.map((item, index) => (
                    <ListItem
                        button
                        key={index}
                        component={Link}
                        to={{
                            pathname: item.pathname,
                            search: window.location.search
                        }}
                    >
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                        <ListItemText primary={item.label}/>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <React.Fragment key={"left"}>
            <IconButton
                onClick={toggleDrawer("left", true)}
                edge={"start"}
                color={"inherit"}>
                <MenuIcon/>
            </IconButton>
            <Drawer
                className={classes.drawer}
                anchor={"left"}
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
            >
                {list("left")}
            </Drawer>
        </React.Fragment>
    );
}
