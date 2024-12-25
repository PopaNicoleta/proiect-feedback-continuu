import express from "express";
import * as userController from "../controllers/user";

export const router = express.Router();

router.get("/", userController.getUsers);

router.post("/", userController.createUser);

router.patch("/", userController.updateUser);

router.delete("/", userController.deleteUser);
