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

const drawerWidth = 82;

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
        width: drawerWidth,
        background: "#262626",
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

    let username = null;

    if (profile) {
        username = profile.username;
    }

    const classes = useStyles();

    if (isUser) {
        return (
            // <div>
            //     <Link to="/logout">Logout</Link>
            //     <Link to="/createserver">Create Server</Link>
            //     <Link to="/findserver">Find Server</Link>
            //     <Servers />
            //     {username}
            // </div>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                {/* <div className={classes.toolbar} /> */}
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
