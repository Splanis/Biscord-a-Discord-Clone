import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import {
    fetchAllServers,
    joinServerAction,
} from "../../store/actions/serverActions";
import { fetchUserServersAction } from "../../store/actions/userActions";

const FindServer = () => {
    const dispatch = useDispatch();
    const auth_token = useSelector((state) =>
        state.user.auth_token ? state.user.auth_token : null
    );

    // const userId = useSelector((state) => state.profile._id);
    const userId = useSelector((state) => state.user.profile._id);

    const allServers = useSelector((state) => state.servers.allServers);

    const joinServer = async (serverId) => {
        await dispatch(joinServerAction({ auth_token, userId, serverId }));
        dispatch(fetchUserServersAction({ auth_token, userId }));
    };

    useEffect(() => {
        dispatch(fetchAllServers(auth_token));
    }, []);

    return (
        <div>
            <label>Search Servers:</label> <br />
            <input type="text" />
            {allServers &&
                allServers.map((server) => (
                    <div>
                        {server.name}
                        <button onClick={() => joinServer(server._id)}>
                            Join Server
                        </button>
                    </div>
                ))}
        </div>
    );
};

export default FindServer;
