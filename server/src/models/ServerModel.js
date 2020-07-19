import mongoose, { Schema } from "mongoose";

const ServerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    isPrivate: {
        type: Boolean,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    photo: {
        type: String,
    },
    color: { type: String, required: true },
    categories: [
        {
            name: {
                type: String,
                required: true,
            },
            channels: [
                {
                    name: {
                        type: String,
                        required: true,
                    },
                    posts: [
                        {
                            content: {
                                type: String,
                                required: true,
                            },
                            owner: {
                                type: mongoose.Schema.Types.ObjectId,
                                ref: "User",
                                required: true,
                            },
                            dateCreated: {
                                type: Date,
                                default: Date.now,
                            },
                            edited: {
                                type: Boolean,
                                default: false,
                            },
                        },
                    ],
                },
            ],
        },
    ],
    members: [
        { type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] },
    ],
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});

export const Server = mongoose.model("Server", ServerSchema);
