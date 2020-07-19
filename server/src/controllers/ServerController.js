import mongoose from "mongoose";
import { Server } from "../models/ServerModel";
import User from "../models/UserModel";
import { serverColors } from "./serverColors";

export const getServer = async (req, res) => {
    try {
        await Server.findById(req.params.serverId)
            .populate("members")
            .exec()
            .then((serverDetails) => {
                res.status(200).json(serverDetails);
            });
    } catch (error) {
        res.json({ error_message: error });
    }
};

export const getServers = async (req, res) => {
    try {
        const servers = await Server.find({ isPrivate: false });
        res.json(servers);
    } catch (error) {
        res.json({ error_message: error });
    }
};

export const createServer = async (req, res) => {
    const { name, isPrivate, owner } = req.body;

    const serverExists = await Server.findOne({ name });
    if (serverExists)
        return res
            .status(400)
            .json({ error_message: "This name is already taken" });

    const randomColor =
        serverColors[Math.floor(Math.random() * serverColors.length)];

    const server = new Server({
        name: name,
        isPrivate: isPrivate,
        owner: owner,
        color: randomColor,
    });

    try {
        server.members.push(owner);
        server.categories.push({ name: "TEXT CHANNELS" });
        server.categories[0].channels.push({ name: "General" });
        await server.save();

        const serverOwner = await User.findById(owner);
        const newServer = await Server.findOne({ name });

        serverOwner.servers.push(newServer._id);
        await serverOwner.save();

        res.status(200).json({ message: `Server ${name} created` });
    } catch (error) {
        return res.json({ error_message: error });
    }
};

export const joinServer = async (req, res) => {
    if (req.body.userId === null || req.body.userId === undefined)
        res.status(400).json({ message: "Server join error" });

    try {
        const server = await Server.findById(req.params.serverId);

        if (server.members.includes(req.body.userId))
            return res
                .status(200)
                .json({ message: "User already in the Server" });
        server.members.push(req.body.userId);
        server.save();

        const user = await User.findById(req.body.userId);
        user.servers.push(server._id);
        user.save();

        res.status(200).json({ message: "User joined the Server" });
    } catch (error) {
        res.json({ error_message: error });
    }
};

export const createCategory = async (req, res) => {
    try {
        const server = await Server.findById(req.params.serverId);
        server.categories.push(req.body.category);
        server.save();
        res.status(200).json({ message: "Category Created" });
    } catch (error) {
        res.json({ error_message: error });
    }
};

export const createChannel = async (req, res) => {
    try {
        const server = await Server.findById(req.params.serverId);
        server.categories
            .find((category) => category._id == req.params.categoryId)
            .channels.push(req.body.channel);
        server.save();
        res.status(200).json({ message: "Channel Created" });
    } catch (error) {
        res.json({ error_message: error });
    }
};

export const joinChannel = async (req, res) => {
    try {
        const server = await Server.findById(req.params.serverId);
        const channel = server.categories
            .find((category) => category._id == req.params.categoryId)
            .channels.find((channel) => channel._id == req.params.channelId);

        res.status(200).json({ channel });
    } catch (error) {
        res.json({ error_message: error });
    }
};

export const getPost = async (req, res) => {
    try {
        const server = await Server.findById(req.params.serverId);
        server.categories
            .find((category) => category._id == req.params.categoryId)
            .channels.find((channel) => channel._id == req.params.channelId)
            .posts.find((post) => post._id == req.params.postId);

        res.status(200).json(post);
    } catch (error) {
        res.json({ error_message: error });
        console.log("error", error);
    }
};

export const postToChannel = async (req, res) => {
    let _id = mongoose.Types.ObjectId();
    try {
        const server = await Server.findById(req.params.serverId);
        server.categories
            .find((category) => category._id == req.params.categoryId)
            .channels.find((channel) => channel._id == req.params.channelId)
            .posts.push({ ...req.body, _id });

        server.save((error, post) => {
            res.status(200).json({ message: "Post Created", _id });
        });
    } catch (error) {
        res.json({ error_message: error });
        console.log("error", error);
    }
};

export const editPost = async (req, res) => {
    try {
        const server = await Server.findById(req.params.serverId);
        const post = server.categories
            .find((category) => category._id == req.params.categoryId)
            .channels.find((channel) => channel._id == req.params.channelId)
            .posts.find((post) => post._id == req.params.postId);

        post.content = req.body.content;
        post.edited = true;

        server.save();
        res.status(200).json(post);
    } catch (error) {
        res.json({ error_message: error });
        console.log("error", error);
    }
};

export const deletePost = async (req, res) => {
    console.log(req.params);

    try {
        const server = await Server.findById(req.params.serverId);
        server.categories
            .find((category) => category._id == req.params.categoryId)
            .channels.find((channel) => channel._id == req.params.channelId)
            .posts.remove(req.params.postId);

        server.save();
        res.status(200).json({ message: "Post deleted" });
    } catch (error) {
        res.json({ error_message: error });
        console.log("error", error);
    }
};
