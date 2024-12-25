import express from "express";
import * as participantController from "../controllers/participant";

export const router = express.Router();

router.get("/", participantController.getParticipants);

router.post("/", participantController.createParticipant);

router.patch("/", participantController.updateParticipant);

router.delete("/", participantController.deleteParticipant);