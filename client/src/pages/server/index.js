import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import Categories from "./Categories";

import { fetchServerAction } from "../../store/actions/serverActions";

const isAdmin = (userId, serverId) => {
    return userId === serverId;
};

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

    const serverId = match.params.id;
    useEffect(() => {
        dispatch(fetchServerAction({ auth_token, serverId }));
    }, [match.params.id]);

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
                    />
                </div>
            </div>
            <div
                style={{ flex: 6, overflowY: "scroll" }}
                className="chat"
            ></div>
            <div style={{ flex: 1, overflowY: "scroll" }} className="members">
                Members:
                {server.members &&
                    server.members.map((member) => (
                        <div>{member.username}</div>
                    ))}
            </div>
        </div>
    );
};

export default Server;
