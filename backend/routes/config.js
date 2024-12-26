import express from "express";
import { router as activityRouter } from "./activity.js";
import { router as participantRouter } from "./participant.js";
import { router as userRouter } from "./user.js";
import { router as feedbackRouter } from "./feedback.js"; 

export const router = express.Router();

router.use("/activities", activityRouter);
router.use("/participants", participantRouter);
router.use("/users", userRouter);
router.use("/feedback", feedbackRouter);