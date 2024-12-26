import express from "express";
import * as participantController from "../controllers/participant.js";

export const router = express.Router();

router.get("/", participantController.getParticipants);

router.post("/", participantController.createParticipants);

router.patch("/", participantController.updateParticipant);

router.delete("/", participantController.deleteParticipant);