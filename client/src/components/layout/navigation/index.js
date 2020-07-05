import React from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import Servers from "./Servers";

import {
    Drawer,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { loadCSS } from "fg-loadcss";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

const drawerWidth = 81;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        minWidth: drawerWidth,
        background: "#282828",
        color: "white",
    },
    // necessary for content to be below app bar
    // toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

const Navigation = () => {
    const isUser = useSelector((state) => (state.user.profile ? true : false));
    const profile = useSelector((state) => state.user.profile);

    // const test = useSelector((state) => state);
    // console.log(test);

    let username = null;

    if (profile) {
        username = profile.username;
    }

    const classes = useStyles();

    if (isUser) {
        return (
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <List>
                    <ListItem button>
                        <Link to="/">
                            <IconButton color="primary">
                                <AccountBoxIcon />
                            </IconButton>
                        </Link>
                    </ListItem>
                </List>

                <List>
                    <ListItem button>
                        <Link to="/findserver">
                            <IconButton color="primary">
                                <SearchIcon />
                            </IconButton>
                        </Link>
                    </ListItem>
                </List>

                <List>
                    <ListItem button>
                        <Link to="/createserver">
                            <IconButton color="primary">
                                <AddIcon />
                            </IconButton>
                        </Link>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <Servers />
                </List>
                <Divider />
            </Drawer>
        );
    }
    return null;
};

export default Navigation;
