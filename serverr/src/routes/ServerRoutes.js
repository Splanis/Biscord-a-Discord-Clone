import express from "express";

import {
    getServers,
    getServer,
    createServer,
    joinServer,
    createCategory,
    createChannel,
    joinChannel,
    postToChannel,
    getPost,
    editPost,
    deletePost,
} from "../controllers/ServerController";

import { verifyToken } from "./verifyToken";

const router = express.Router();

router.get("/", verifyToken, getServers);
router.post("/", verifyToken, createServer);
router.get("/:serverId", verifyToken, getServer);
router.post("/:serverId/join", verifyToken, joinServer);
router.post("/:serverId/", verifyToken, createCategory);
router.post("/:serverId/:categoryId/", verifyToken, createChannel);
router.get("/:serverId/:categoryId/:channelId/", verifyToken, joinChannel);
router.post("/:serverId/:categoryId/:channelId/", verifyToken, postToChannel);
router.get("/:serverId/:categoryId/:channelId/:postId", verifyToken, getPost);
router.patch(
    "/:serverId/:categoryId/:channelId/:postId",
    verifyToken,
    editPost
);
router.delete(
    "/:serverId/:categoryId/:channelId/:postId",
    verifyToken,
    deletePost
);

export { router as ServerRoutes };
