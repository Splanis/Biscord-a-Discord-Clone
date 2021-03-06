import React, { useState } from "react";

import { useDispatch } from "react-redux";

import {
    createCategoryAction,
    fetchServerAction,
} from "../../../store/actions/serverActions";
import Category from "./Category";

import { Button, Input } from "@material-ui/core";

const Categories = ({
    categories,
    serverId,
    auth_token,
    isAdmin,
    owner,
    userId,
}) => {
    const dispatch = useDispatch();

    const [toggleCategoryInput, setToggleCategoryInput] = useState(false);
    const [categoryName, setCategoryName] = useState("");

    const createCategory = async () => {
        if (categoryName) {
            await dispatch(
                createCategoryAction({ serverId, categoryName, auth_token })
            );
            setToggleCategoryInput(false);
            dispatch(fetchServerAction({ auth_token, serverId }));
        }
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                background: "#484848",
                padding: 15,
                minHeight: "100vh",
            }}
        >
            {isAdmin(owner, userId) && (
                <div>
                    <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => setToggleCategoryInput(true)}
                        style={{
                            margin: 5,
                            display: toggleCategoryInput && "none",
                        }}
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
                                value={categoryName}
                                onChange={(e) =>
                                    setCategoryName(e.target.value)
                                }
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
                                    onClick={() =>
                                        setToggleCategoryInput(false)
                                    }
                                    style={{ margin: 5 }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            )}
            <div style={{ width: "100%" }}>
                {categories &&
                    categories.map((category) => (
                        <Category
                            key={category._id}
                            category={category}
                            auth_token={auth_token}
                            serverId={serverId}
                            userId={userId}
                            channels={category.channels}
                            isAdmin={isAdmin}
                            owner={owner}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Categories;
