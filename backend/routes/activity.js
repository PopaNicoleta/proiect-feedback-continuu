import express from "express";
import * as activityController from "../controllers/activity.js";

export const router = express.Router();

router.get("/", activityController.getActivities);

router.post("/", activityController.createActivities);

router.patch("/", activityController.updateActivity);

router.delete("/", activityController.deleteActivity);