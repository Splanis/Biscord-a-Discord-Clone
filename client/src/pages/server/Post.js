import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { editPostAction } from "../../store/actions/serverActions";

import { socket } from "./index";

const Post = ({ post, auth_token, prevOwner, currentChannel, serverId }) => {
    const dispatch = useDispatch();

    const [postContent, setPostContnet] = useState(post.content);
    const [user, setUser] = useState({});
    const [editPost, setEditPost] = useState(post.content);
    const [editToggle, setEditToggle] = useState(false);
    const [postId, setPostId] = useState(null);

    const today = new Date().toLocaleDateString();
    const postDate = new Date(post.dateCreated).toLocaleDateString();
    const postTime = new Date(post.dateCreated).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    const userId = useSelector((state) =>
        state.user.profile ? state.user.profile._id : null
    );

    const fetchPostUser = async () => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("auth_token", auth_token);

        const response = await fetch(
            `http://localhost:5000/api/user/${post.owner}`,
            {
                method: "GET",
                headers,
            }
        );

        const fetchedUser = await response.json();

        setUser(fetchedUser);
    };

    const handleEditPost = () => {
        setEditToggle(false);
        dispatch(
            editPostAction({
                auth_token,
                serverId,
                post,
                content: editPost,
                channelId: currentChannel._id,
                categoryId: currentChannel.categoryId,
                postId: post._id,
            })
        );

        socket.emit("editPost", {
            editPost,
            channelId: currentChannel._id,
            postId: post._id,
        });

        setPostContnet(editPost);
    };

    useEffect(() => {
        fetchPostUser();
    }, []);

    useEffect(() => {
        socket.on("edit", ({ editPost }) => {
            console.log("??");
            setPostContnet(editPost);
        });
    }, [postContent]);

    return (
        <div>
            <div
                style={{
                    margin: "0 12px",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center" }}>
                        {post.owner != prevOwner && (
                            <div
                                style={{
                                    color: "lightcyan",
                                    display: "flex",
                                    alignItems: "center",
                                    fontSize: 16,
                                }}
                            >
                                {user.username}
                            </div>
                        )}
                        <div
                            style={{
                                fontSize: 11,
                                color: "gray",
                                marginLeft: 5,
                            }}
                        >
                            {post.owner != prevOwner &&
                                (postDate == today ? (
                                    <div>Today at {postTime}</div>
                                ) : (
                                    (postDate, "at ", postTime)
                                ))}
                        </div>
                    </div>
                </div>
            </div>
            <div
                style={{
                    margin: "5px 15px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                {editToggle ? (
                    <input
                        type="text"
                        value={editPost}
                        onChange={(e) => setEditPost(e.target.value)}
                        onKeyPress={(e) =>
                            e.key === "Enter" && handleEditPost()
                        }
                        autoFocus={true}
                        style={{
                            color: "white",
                            background: "#282828",
                            fontSize: 16,
                            border: "none",
                            borderRadius: 20,
                            padding: 10,
                            width: "100%",
                        }}
                    />
                ) : (
                    postContent
                )}
                {post.owner == userId && (
                    <div>
                        {editToggle ? (
                            <button
                                style={{
                                    marginleft: "auto",
                                    border: "none",
                                    background: "transparent",
                                    color: "gray",
                                    cursor: "pointer",
                                }}
                                onClick={() => setEditToggle(false)}
                            >
                                cancel
                            </button>
                        ) : (
                            <button
                                style={{
                                    marginleft: "auto",
                                    border: "none",
                                    background: "transparent",
                                    color: "gray",
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    setEditToggle(true);
                                    setEditPost(post.content);
                                }}
                            >
                                edit
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Post;
