import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { postToChannelAction } from "../../store/actions/serverActions";

import Posts from "./Posts";

import { socket } from "./index";

const Chat = ({ auth_token, userId, serverId, currentChannel }) => {
    const dispatch = useDispatch();

    const [post, setPost] = useState("");
    const [posts, setPosts] = useState([]);

    const handlePost = () => {
        if (post) {
            const dateCreated = Date.now();

            dispatch(
                postToChannelAction({
                    auth_token,
                    userId,
                    serverId,
                    post,
                    channelId: currentChannel._id,
                    categoryId: currentChannel.categoryId,
                    dateCreated,
                })
            );

            socket.emit("userPost", {
                post,
                userId,
                channelId: currentChannel._id,
                dateCreated,
            });
            setPost("");
            setPosts([
                ...posts,
                {
                    content: post,
                    owner: userId,
                    channelId: currentChannel._id,
                    dateCreated,
                },
            ]);
        }
    };

    useEffect(() => {
        socket.on("post", ({ post, userId, channelId, dateCreated }) => {
            setPosts([
                ...posts,
                {
                    content: post,
                    owner: userId,
                    channelId,
                    dateCreated,
                },
            ]);
        });
    }, [posts]);

    useEffect(() => {
        setPosts(currentChannel.posts);
    }, [currentChannel]);

    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                flex: 6,
            }}
        >
            <div
                style={{
                    background: "#181818",
                    height: 40,
                    fontSize: 25,
                    paddingLeft: 10,
                }}
            >
                {"#   "}
                {currentChannel.name}
            </div>
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
                    onKeyPress={(e) => e.key === "Enter" && handlePost()}
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
