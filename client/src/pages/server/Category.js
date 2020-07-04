import React, { useState } from "react";

import { useDispatch } from "react-redux";

import {
    createChannelAction,
    fetchServerAction,
} from "../../store/actions/serverActions";

import Channels from "./Channels";

import { Button, Input, IconButton } from "@material-ui/core";

const Category = ({ category, auth_token, serverId, channels }) => {
    const dispatch = useDispatch();

    const [toggleChannelInput, setToggleChannelInput] = useState(false);
    const [channelName, setChannelName] = useState("");

    const createChannel = async () => {
        if (channelName) {
            await dispatch(
                createChannelAction({
                    serverId,
                    channelName,
                    categoryId: category._id,
                    auth_token,
                })
            );
            setToggleChannelInput(false);
            dispatch(fetchServerAction({ auth_token, serverId }));
        }
    };

    return (
        <div style={{ marginLeft: 10 }}>
            {category.name}
            <IconButton
                size="small"
                variant="contained"
                color="secondary"
                onClick={() => setToggleChannelInput(true)}
                style={{ margin: 5, display: toggleChannelInput && "none" }}
            >
                +
            </IconButton>

            {/* admin options */}
            {toggleChannelInput && (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Input
                        type="text"
                        onChange={(e) => setChannelName(e.target.value)}
                        style={{ margin: 5, color: "white" }}
                    />
                    <div>
                        <Button
                            size="small"
                            variant="contained"
                            color="default"
                            onClick={() => createChannel()}
                            style={{ margin: 5 }}
                        >
                            Create
                        </Button>
                        <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            onClick={() => setToggleChannelInput(false)}
                            style={{ margin: 5 }}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            )}

            <Channels channels={channels} />
        </div>
    );
};

export default Category;
