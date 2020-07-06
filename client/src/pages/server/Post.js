import React, { useEffect, useState } from "react";

const Post = ({ post, auth_token, prevOwner }) => {
    const [user, setUser] = useState({});

    const today = new Date().toLocaleDateString();
    const postDate = new Date(post.dateCreated).toLocaleDateString();
    const postTime = new Date(post.dateCreated).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    // console.log(post);

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

    useEffect(() => {
        fetchPostUser();
    }, []);

    return (
        <div>
            <div
                style={{
                    margin: "0 12px",
                    display: "flex",
                    alignItems: "center",
                }}
            >
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

                <div style={{ fontSize: 11, color: "gray", marginLeft: 5 }}>
                    {post.owner != prevOwner &&
                        (postDate == today ? (
                            <div>Today at {postTime}</div>
                        ) : (
                            (postDate, "at ", postTime)
                        ))}
                </div>
            </div>
            <div
                style={{
                    margin: "5px 15px",
                }}
            >
                {post.content}
            </div>
        </div>
    );
};

export default Post;
