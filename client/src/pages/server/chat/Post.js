import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import styled from "styled-components";

import { usePost } from "./Hooks";

const Post = ({ post, auth_token, prevOwner, currentChannel, serverId }) => {
    const userId = useSelector((state) =>
        state.user.profile ? state.user.profile._id : null
    );

    const {
        handleEditPost,
        handleDeletePost,
        user,
        postTime,
        editPost,
        setEditPost,
        editToggle,
        postContent,
        isPostEdited,
        setEditToggle,
        deleted,
        today,
        postDate,
    } = usePost(auth_token, currentChannel, serverId, post);

    console.log("rendering post");

    return (
        <PostHover
            style={{
                display: deleted && "none",
                maxWidth: "100%",
            }}
        >
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
                    <div style={{ overflowWrap: "break-block" }}>
                        {postContent}
                        <span style={{ color: "lightgrey", fontSize: 12 }}>
                            {isPostEdited && "(edited)"}
                        </span>
                    </div>
                )}
                {post.owner == userId && (
                    <div style={{ display: "flex" }}>
                        <div>
                            {editToggle ? (
                                <button
                                    style={{
                                        marginleft: "auto",
                                        border: "none",
                                        background: "transparent",
                                        color: "gray",
                                        cursor: "pointer",
                                        padding: 2,
                                    }}
                                    onClick={() => {
                                        setEditToggle(false);
                                        setEditPost(postContent);
                                    }}
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
                                        padding: 2,
                                    }}
                                    onClick={() => {
                                        setEditToggle(true);
                                    }}
                                >
                                    edit
                                </button>
                            )}
                            {!editToggle && (
                                <button
                                    style={{
                                        marginleft: "auto",
                                        border: "none",
                                        background: "transparent",
                                        color: "gray",
                                        cursor: "pointer",
                                        padding: 2,
                                    }}
                                    onClick={() => handleDeletePost()}
                                >
                                    delete
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </PostHover>
    );
};

const PostHover = styled.div`
    &:hover {
        background: #252525;
    }
`;

export default Post;
