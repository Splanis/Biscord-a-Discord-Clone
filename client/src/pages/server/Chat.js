import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { postToChannelAction } from "../../store/actions/serverActions";

import Posts from "./Posts";

import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

const Chat = ({ auth_token, userId, serverId }) => {
    const dispatch = useDispatch();

    const [post, setPost] = useState("");

    const currentChannel = useSelector((state) => state.servers.currentChannel);
    // console.log(currentChannel);

    const handlePost = () => {
        if (post) {
            dispatch(
                postToChannelAction({
                    auth_token,
                    userId,
                    serverId,
                    post,
                    channelId: currentChannel._id,
                    categoryId: currentChannel.categoryId,
                })
            );
            setPost("");
        }
    };

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
            <Posts posts={currentChannel.posts} auth_token={auth_token} />
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
                    style={{
                        color: "white",
                        background: "transparent",
                        fontSize: 16,
                        border: "1px solid #",
                        borderRadius: 20,
                        padding: 10,
                        width: "100%",
                    }}
                />

                <Button
                    onClick={() => handlePost()}
                    variant="contained"
                    color="primary"
                    style={{ margin: 10, marginBottom: 15 }}
                >
                    Send
                </Button>
                {/* <TextField
                    style={{ width: "100%", bottom: 0 }}
                    id="filled-basic"
                    label="message"
                    variant="filled"
                /> */}
            </div>
        </div>
    );
};

export default Chat;
