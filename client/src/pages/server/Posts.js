import React from "react";

import Post from "./Post";

const Posts = ({ posts, auth_token }) => {
    return (
        <div
            style={{
                flex: 300,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                overflowY: "auto",
            }}
        >
            {posts ? (
                posts.map((post) => (
                    <Post key={post._id} post={post} auth_token={auth_token} />
                ))
            ) : (
                <p>The are no answers in this Channel</p>
            )}
        </div>
    );
};

export default Posts;
