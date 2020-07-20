import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { joinChannelAction } from "../../../store/actions/serverActions";

const Channel = ({ categoryId, channel, serverId, auth_token }) => {
    const dispatch = useDispatch();

    const currentChannelId = useSelector(
        (state) => state.servers.currentChannel._id
    );

    const joinChannel = () => {
        if (channel._id != currentChannelId) {
            dispatch(
                joinChannelAction({
                    auth_token,
                    channelId: channel._id,
                    categoryId,
                    serverId,
                })
            );
        }
    };

    return (
        <div
            style={{ marginBottom: 3, marginLeft: 15, marginTop: 3 }}
            key={channel._id}
        >
            #{"   "}
            <button
                style={{
                    background: "none",
                    color: "lightgray",
                    fontSize: 16,
                    border: "none",
                    cursor: "pointer",
                }}
                onClick={() => joinChannel()}
            >
                {channel.name}
            </button>
        </div>
    );
};

export default Channel;
