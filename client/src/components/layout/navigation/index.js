import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import Servers from "./Servers";

import { fetchUserServersAction } from "../../../store/actions/userActions";

import { Drawer, Divider, IconButton, List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

const Navigation = () => {
    const dispatch = useDispatch();

    const isUser = useSelector((state) => (state.user.profile ? true : false));
    const profile = useSelector((state) => state.user.profile);

    // const test = useSelector((state) => state);
    // console.log(test);

    const auth_token = useSelector((state) =>
        state.user.auth_token ? state.user.auth_token : null
    );

    const userId = useSelector((state) =>
        state.user.profile ? state.user.profile._id : null
    );

    const classes = useStyles();

    useEffect(() => {
        dispatch(fetchUserServersAction({ auth_token, userId }));
    }, [isUser]);

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
                <List style={{ marginTop: "auto" }}>
                    <ListItem>{profile.username}</ListItem>
                </List>
            </Drawer>
        );
    }
    return null;
};

export default Navigation;
