import React, { useEffect, useLayoutEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import io from "socket.io-client";

import Categories from "./Categories";
import Chat from "./Chat";
import Members from "./Members";

import {
    fetchServerAction,
    joinChannelAction,
} from "../../store/actions/serverActions";

import "./index.css";

const isAdmin = (userId, serverOwnerId) => {
    return userId === serverOwnerId;
};

export const socket = io("localhost:5000");

const Server = ({ match }) => {
    const dispatch = useDispatch();

    const auth_token = useSelector((state) =>
        state.user.auth_token ? state.user.auth_token : null
    );

    const userId = useSelector((state) =>
        state.user.profile ? state.user.profile._id : null
    );

    const server = useSelector((state) =>
        state.servers.server ? state.servers.server : null
    );

    const currentChannel = useSelector((state) => state.servers.currentChannel);

    useEffect(() => {
        dispatch(
            fetchServerAction({ auth_token, serverId: match.params.serverId })
        );
    }, [match.params.serverId]);

    useEffect(() => {
        socket.emit("join", {
            userId,
            channelId: currentChannel._id,
        });

        return () => {
            socket.emit("disconnect");
            socket.off();
        };
    }, [currentChannel]);

    return (
        <div
            style={{
                display: "flex",
                width: "100%",
                height: "100vh",
                paddingLeft: 80,
            }}
        >
            <div
                style={{
                    flex: 1,
                    overflowY: "scroll",
                }}
                className="categories"
            >
                <div>
                    <h1 style={{ textAlign: "center" }}>{server.name}</h1>
                    <Categories
                        categories={server.categories}
                        serverId={server._id}
                        auth_token={auth_token}
                        isAdmin={isAdmin}
                        userId={userId}
                        owner={server.owner}
                    />
                </div>
            </div>
            <div style={{ flex: 6 }} className="chat">
                <Chat
                    serverId={server._id}
                    auth_token={auth_token}
                    userId={userId}
                    currentChannel={currentChannel}
                />
            </div>
            <div
                style={{ flex: 1, overflowY: "scroll", background: "#292929" }}
                className="members"
            >
                <div
                    style={{
                        background: "#181818",
                        height: 40,
                    }}
                ></div>
                <Members
                    server={server}
                    isAdmin={isAdmin}
                    owner={server.owner}
                />
            </div>
        </div>
    );
};

export default Server;
