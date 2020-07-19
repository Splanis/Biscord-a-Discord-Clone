import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    dateRegistered: {
        type: Date,
        default: Date.now,
    },
    servers: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Server", default: [] },
    ],
});

const User = mongoose.model("User", UserSchema);

export default User;
