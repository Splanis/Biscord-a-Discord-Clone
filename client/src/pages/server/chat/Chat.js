import React from "react";

import Posts from "./Posts";
import { usePosts } from "./Hooks";

const Chat = ({ auth_token, userId, serverId, currentChannel }) => {
    const { post, setPost, posts, handleNewPost } = usePosts(
        userId,
        currentChannel,
        auth_token,
        serverId
    );

    return (
        <div
            style={{
                maxWidth: "100%",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                flex: 6,
            }}
        >
            <Posts
                posts={posts}
                auth_token={auth_token}
                currentChannel={currentChannel}
                serverId={serverId}
            />
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    flex: 1,
                    padding: 10,
                    position: "static",
                }}
            >
                <input
                    type="text"
                    value={post}
                    onChange={(e) => setPost(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleNewPost()}
                    autoFocus={true}
                    placeholder={`Message at #${currentChannel.name}`}
                    style={{
                        color: "white",
                        background: "#282828",
                        fontSize: 16,
                        border: "none",
                        borderRadius: 20,
                        padding: 15,
                        width: "100%",
                    }}
                />
            </div>
        </div>
    );
};

export default Chat;
