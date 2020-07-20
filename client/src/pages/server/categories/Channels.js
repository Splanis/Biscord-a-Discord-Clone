import React from "react";

import Channel from "./Channel";

const Channels = ({ categoryId, channels, serverId, auth_token, userId }) => {
    return (
        <div>
            {channels &&
                channels.map((channel) => (
                    <Channel
                        key={channel._id}
                        channel={channel}
                        categoryId={categoryId}
                        serverId={serverId}
                        auth_token={auth_token}
                        userId={userId}
                    />
                ))}
        </div>
    );
};

export default Channels;
