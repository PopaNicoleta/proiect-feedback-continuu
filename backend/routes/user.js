import express from "express";
import * as userController from "../controllers/user.js";

export const router = express.Router();

router.get("/", userController.getUsers);

router.post("/", userController.createUsers);

router.patch("/", userController.updateUser);

router.delete("/", userController.deleteUser);
