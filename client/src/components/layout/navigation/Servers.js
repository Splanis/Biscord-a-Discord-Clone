import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { fetchUserServersAction } from "../../../store/actions/userActions";

import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button,
    IconButton,
} from "@material-ui/core";

const colors = [
    "yellow",
    "pink",
    "red",
    "blue",
    "orange",
    "green",
    "brown",
    "purple",
    "white",
    "cyan",
];

const Servers = () => {
    const dispatch = useDispatch();

    const auth_token = useSelector((state) =>
        state.user.auth_token ? state.user.auth_token : null
    );

    const isUser = useSelector((state) => (state.user.profile ? true : false));

    const userId = useSelector((state) =>
        state.user.profile ? state.user.profile._id : null
    );

    const servers = useSelector((state) =>
        state.user.servers ? state.user.servers.servers : null
    );

    // console.log(servers);

    useEffect(() => {
        dispatch(fetchUserServersAction({ auth_token, userId }));
    }, [isUser]);

    return (
        <div>
            <div>
                {servers &&
                    servers.map((server) => (
                        <ListItem button key={server._id}>
                            <Link
                                to={`/server/${server._id}`}
                                style={{
                                    color: "white",
                                    textDecoration: "none",
                                }}
                            >
                                <IconButton
                                    color="secondary"
                                    aria-label="add an alarm"
                                    style={{
                                        color:
                                            colors[
                                                Math.floor(
                                                    Math.random() *
                                                        colors.length
                                                )
                                            ],
                                    }}
                                >
                                    {server.name[0].toUpperCase()}
                                </IconButton>
                            </Link>
                        </ListItem>
                        //      <ListItem button key={text}>
                        //      <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        //      <ListItemText primary={text} />
                        //    </ListItem>
                    ))}
            </div>
        </div>
    );
};

export default Servers;
