import React, { useState } from "react";

import { useDispatch } from "react-redux";

import {
    createChannelAction,
    fetchServerAction,
} from "../../store/actions/serverActions";

import Channels from "./Channels";

import { Button, Input, IconButton } from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const Category = ({
    category,
    serverId,
    channels,
    auth_token,
    userId,
    isAdmin,
    owner,
}) => {
    const dispatch = useDispatch();

    const [toggleChannelInput, setToggleChannelInput] = useState(false);
    const [channelName, setChannelName] = useState("");
    const [toggleVisibility, setToggleVisibillty] = useState(true);

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
        <div style={{ marginTop: 20 }}>
            <button
                style={{
                    fontWeight: 500,
                    fontSize: 17,
                    display: "flex",
                    alignItems: "center",
                    color: "white",
                    background: "transparent",
                    border: "none",
                }}
                onClick={() =>
                    setToggleVisibillty((toggleVisibility) => !toggleVisibility)
                }
            >
                {category.name}
                {toggleVisibility ? (
                    <ArrowDownwardIcon
                        style={{ marginLeft: 3 }}
                        fontSize="small"
                    />
                ) : (
                    <ArrowForwardIcon
                        style={{ marginLeft: 3 }}
                        fontSize="small"
                    />
                )}
            </button>
            {/* admin options */}
            {isAdmin(userId, owner) && (
                <IconButton
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() => setToggleChannelInput(true)}
                    style={{ margin: 5, display: toggleChannelInput && "none" }}
                >
                    +
                </IconButton>
            )}

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
                        value={channelName}
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

            {toggleVisibility && (
                <Channels
                    categoryId={category._id}
                    channels={channels}
                    serverId={serverId}
                    auth_token={auth_token}
                    userId={userId}
                />
            )}
        </div>
    );
};

export default Category;
