import express from "express";

import {
    register,
    login,
    update,
    getUser,
    userServers,
} from "../controllers/UserController";

import { verifyToken } from "./verifyToken";

const router = express.Router();

router.get("/:id", verifyToken, getUser);
router.get("/:id/servers", verifyToken, userServers);
router.post("/register", register);
router.post("/login", login);
router.patch("/update", verifyToken, update);

export { router as UserRoutes };
