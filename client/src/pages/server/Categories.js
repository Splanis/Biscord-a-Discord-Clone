import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { createCategoryAction } from "../../store/actions/serverActions";

import { Button, Input, IconButton } from "@material-ui/core";

const Categories = ({ categories, serverId, auth_token }) => {
    const dispatch = useDispatch();
    const [toggleCategoryInput, setToggleCategoryInput] = useState(false);
    const [categoryName, setCategoryName] = useState("");

    const [toggleChannelInput, setToggleChannelInput] = useState(false);
    const [channelName, setChannelName] = useState("");

    const toggleCreateCategory = () => {
        setToggleCategoryInput(true);
    };

    const createCategory = () => {
        dispatch(createCategoryAction({ serverId, categoryName, auth_token }));
        setToggleCategoryInput(false);
    };

    const toggleCreateChannel = () => {
        setToggleChannelInput(true);
    };

    console.log(toggleChannelInput);

    const createChannel = () => {
        dispatch(
            createCategoryAction({
                serverId,
                channelName,
                categoryName,
                auth_token,
            })
        );
        setToggleChannelInput(false);
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => toggleCreateCategory()}
                style={{ margin: 5 }}
            >
                Add Category
            </Button>
            {toggleCategoryInput && (
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
                        onChange={(e) => setCategoryName(e.target.value)}
                        style={{ margin: 5, color: "white" }}
                    />
                    <div>
                        <Button
                            size="small"
                            variant="contained"
                            color="default"
                            onClick={() => createCategory()}
                            style={{ margin: 5 }}
                        >
                            Create
                        </Button>
                        <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            onClick={() => setToggleCategoryInput(false)}
                            style={{ margin: 5 }}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            )}
            <div>
                {categories &&
                    categories.map((category) => (
                        <div>
                            {category.name}
                            <IconButton
                                size="small"
                                variant="contained"
                                color="secondary"
                                onClick={() => setToggleChannelInput(true)}
                                style={{ margin: 5 }}
                            >
                                +
                            </IconButton>
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
                                        onChange={(e) =>
                                            setChannelName(e.target.value)
                                        }
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
                                            onClick={() =>
                                                setToggleChannelInput(false)
                                            }
                                            style={{ margin: 5 }}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Categories;
