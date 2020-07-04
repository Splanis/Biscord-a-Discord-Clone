import React from "react";

const Channels = ({ channels }) => {
    const joinChannel = () => {
        console.log("joining");
    };
    return (
        <div style={{ marginLeft: 15 }}>
            {channels &&
                channels.map((channel) => (
                    <div style={{ margin: 10 }} key={channel._id}>
                        #{"   "}
                        <button
                            style={{
                                background: "none",
                                color: "lightgray",
                                fontSize: 14,
                                border: "none",
                            }}
                            onClick={() => joinChannel()}
                        >
                            {channel.name}
                        </button>
                    </div>
                ))}
        </div>
    );
};

export default Channels;
