import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import io from "socket.io-client";

import Categories from "./categories/Categories";
import Chat from "./chat/Chat.js";
import Members from "./members/Members";
import Spinner from "../../components/shared/Spinner";

import { fetchServerAction } from "../../store/actions/serverActions";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./index.css";

const isAdmin = (userId, serverOwnerId) => {
    return userId === serverOwnerId;
};

export const socket = io("localhost:5000");

const Server = ({ match }) => {
    const dispatch = useDispatch();

    const [toggleMembers, setToggleMembers] = useState(true);

    const auth_token = useSelector((state) =>
        state.user.auth_token ? state.user.auth_token : null
    );

    const userId = useSelector((state) =>
        state.user.profile ? state.user.profile._id : null
    );

    const server = useSelector((state) => state.servers.server);

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
            socket.emit("leave", {
                userId,
                channelId: currentChannel._id,
            });
            socket.emit("disconnect");
            socket.off();
        };
    }, [currentChannel]);

    if (!server || !currentChannel) return <Spinner />;

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
                    display: "flex",
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

            <div
                style={{
                    flex: 8,
                    display: "flex-column",
                    position: "relative",
                }}
            >
                <div
                    style={{
                        background: "#181818",
                        height: 40,
                        fontSize: 25,
                        paddingLeft: 10,
                        width: "100%",
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div>
                        {" "}
                        {"#   "}
                        {currentChannel.name}
                    </div>
                    <div>
                        <button
                            style={{
                                border: "none",
                                background: "transparent",
                                color: "gray",
                                cursor: "pointer",
                                margin: 10,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            onClick={() => {
                                setToggleMembers(
                                    (toggleMembers) => !toggleMembers
                                );
                            }}
                        >
                            <FontAwesomeIcon
                                style={{
                                    filter: toggleMembers && "brightness(100)",
                                }}
                                icon={faUserFriends}
                            />
                        </button>
                    </div>
                </div>
                <div style={{ display: "flex" }}>
                    <Chat
                        serverId={server._id}
                        auth_token={auth_token}
                        userId={userId}
                        currentChannel={currentChannel}
                    />
                    <Members
                        server={server}
                        isAdmin={isAdmin}
                        owner={server.owner}
                        toggleMembers={toggleMembers}
                    />
                </div>
            </div>
        </div>
    );
};

export default Server;
