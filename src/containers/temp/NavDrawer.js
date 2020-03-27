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
import {authMenu, guestMenu} from "../Menu";
import {Link} from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        backgroundColor: "black"
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
}));

export default function NavDrawer(props) {
    const classes = useStyles();
    const {open} = props;
    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            open={open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.toolbar}/>
            <List>
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
        </Drawer>
    );
}