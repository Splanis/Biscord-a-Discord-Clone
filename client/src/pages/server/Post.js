import React, { useEffect, useState } from "react";

const Post = ({ post, auth_token }) => {
    const [user, setUser] = useState({});

    const date = new Date();
    const today =
        date.getFullYear() +
        "-" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + date.getDate()).slice(-2);

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
                <div style={{ fontSize: 11, color: "gray", marginLeft: 5 }}>
                    {post.dateCreated.slice(0, 10) == today
                        ? "Today"
                        : post.dateCreated.slice(0, 10)}
                    {"   "}
                    {post.dateCreated.slice(12, 16)}
                </div>
            </div>
            <div
                style={{
                    padding: 5,
                    margin: 5,
                }}
            >
                {post.content}
            </div>
        </div>
    );
};

export default Post;
