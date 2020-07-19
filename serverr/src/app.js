import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import socketio from "socket.io";
import http from "http";

// Routers
import { UserRoutes } from "./routes/UserRoutes";
import { ServerRoutes } from "./routes/ServerRoutes";

// Init App
const app = express();
const server = http.createServer(app);
const io = socketio(server);
dotenv.config();

// Connect Database
(async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB connected...");
    } catch (error) {
        console.log(error);
    }
})();

// socket.io
io.on("connection", (socket) => {
    console.log("User connected...");

    socket.on("join", ({ userId, channelId }) => {
        socket.join(channelId);
        console.log(`User with ${userId} joined channel ${channelId}`);
    });

    socket.on("leave", ({ userId, channelId }) => {
        socket.leave(channelId);
        console.log(`User with ${userId} left channel ${channelId}`);
    });

    socket.on("newPost", ({ post, userId, channelId, dateCreated, postId }) => {
        socket.to(channelId).broadcast.emit("post", {
            post,
            userId,
            channelId,
            dateCreated,
            postId,
        });
        console.log(
            `User ${userId} posted: "${post}" in channel ${channelId} at ${dateCreated}"`
        );
        console.log(
            `User ${userId} posted: "${post}" in channel ${channelId} at ${dateCreated}"`
        );
    });

    socket.on("editPost", ({ content, channelId, postId }) => {
        socket.to(channelId).broadcast.emit("edit", {
            content,
            postId,
        });
        console.log(
            `Edited post ${postId}: "${content}" in channel ${channelId} "`
        );
    });

    socket.on("deletePost", ({ postId, channelId }) => {
        socket.to(channelId).broadcast.emit("delete", postId);
        console.log(`Post ${postId} deleted in channel ${channelId} "`);
    });

    socket.on("disconnect", () => {
        console.log("User left...");
    });
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enabling Cors
app.use(cors({ origin: true }));

// Route Middlewares
app.use("/api/user", UserRoutes);
app.use("/api/servers", ServerRoutes);

// Server Start
server.listen(process.env.LISTEN_PORT || 5000, () =>
    console.log(
        `Server started at port ${
            process.env.LISTEN_PORT ? process.env.LISTEN_PORT : 5000
        }...`
    )
);
