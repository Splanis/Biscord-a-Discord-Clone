import { useState, useEffect } from "react";
import { socket } from "../index";

import { useDispatch } from "react-redux";

import {
    editPostAction,
    deletePostAction,
} from "../../../store/actions/serverActions";

export const usePosts = (userId, currentChannel, auth_token, serverId) => {
    const [post, setPost] = useState("");
    const [posts, setPosts] = useState([]);

    const handleNewPost = async () => {
        if (post) {
            const dateCreated = Date.now();

            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("auth_token", auth_token);

            const body = {
                content: post,
                owner: userId,
                dateCreated,
            };

            const response = await fetch(
                `http://localhost:5000/api/servers/${serverId}/${currentChannel.categoryId}/${currentChannel._id}`,
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify(body),
                }
            );

            const newPost = await response.json();

            setPost("");

            socket.emit("newPost", {
                post,
                userId,
                channelId: currentChannel._id,
                dateCreated,
                postId: newPost._id,
            });

            setPosts([
                ...posts,
                {
                    content: post,
                    owner: userId,
                    channelId: currentChannel._id,
                    dateCreated,
                    _id: newPost._id,
                },
            ]);
        }
    };

    useEffect(() => {
        socket.on(
            "post",
            ({ post, userId, channelId, dateCreated, postId }) => {
                setPosts([
                    ...posts,
                    {
                        content: post,
                        owner: userId,
                        channelId,
                        dateCreated,
                        _id: postId,
                    },
                ]);
            }
        );

        socket.on("edit", ({ content, postId }) => {
            setPosts([
                ...posts.map((post) => {
                    if (post._id === postId) {
                        return {
                            ...post,
                            content,
                            edited: true,
                        };
                    } else return { ...post };
                }),
            ]);
        });

        socket.on("delete", (postId) => {
            setPosts([...posts.filter((post) => post._id != postId)]);
        });
    }, [posts]);

    useEffect(() => {
        setPosts(currentChannel.posts);
    }, [currentChannel]);

    return { post, setPost, posts, handleNewPost };
};

export const usePost = (auth_token, currentChannel, serverId, post) => {
    const dispatch = useDispatch();

    const [postContent, setPostContnet] = useState(post.content);
    const [user, setUser] = useState({});
    const [editPost, setEditPost] = useState(postContent);
    const [editToggle, setEditToggle] = useState(false);
    const [isPostEdited, setIsPostEdited] = useState(post.edited);
    const [deleted, setDeleted] = useState(false);

    const today = new Date().toLocaleDateString();
    const postDate = new Date(post.dateCreated).toLocaleDateString();
    const postTime = new Date(post.dateCreated).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

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

    const handleDeletePost = () => {
        if (window.confirm("Are you sure you want to delete your answer?")) {
            setDeleted(true);
            dispatch(
                deletePostAction({
                    auth_token,
                    channelId: currentChannel._id,
                    categoryId: currentChannel.categoryId,
                    serverId,
                    postId: post._id,
                })
            );

            socket.emit("deletePost", {
                channelId: currentChannel._id,
                postId: post._id,
            });
        }
    };

    const handleEditPost = () => {
        if (editPost) {
            setEditToggle(false);
            setPostContnet(editPost);
            setIsPostEdited(true);

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
                content: editPost,
                channelId: currentChannel._id,
                postId: post._id,
            });
        }
    };

    useEffect(() => {
        fetchPostUser();
    }, []);

    return {
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
    };
};
