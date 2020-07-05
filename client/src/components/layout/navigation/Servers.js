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

    useEffect(() => {
        dispatch(fetchUserServersAction({ auth_token, userId }));
    }, [isUser]);

    return (
        <div>
            <div>
                {servers &&
                    servers.map((server) => (
                        <Link
                            key={server._id}
                            to={`/server/${server._id}`}
                            style={{
                                color: "white",
                                textDecoration: "none",
                            }}
                        >
                            <ListItem
                                button
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontSize: 22,
                                    background: server.color,
                                    borderRadius: "50%",
                                    width: 60,
                                    height: 60,
                                    margin: 10,
                                    border: "3px solid white",
                                    textShadow:
                                        "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    {server.name[0].toUpperCase()}
                                </div>
                            </ListItem>{" "}
                        </Link>
                    ))}
            </div>
        </div>
    );
};

export default Servers;
