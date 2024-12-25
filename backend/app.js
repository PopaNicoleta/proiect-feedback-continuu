import express from "express";
import { router as activityRouter } from "./routes/activity";
import { router as participantRouter } from "./routes/participant";
import { router as userRouter } from "./routes/user";
import { router as feedbackRouter } from "./routes/feedback";

const app = express();

app.use(express.json());
app.use("/activities", activityRouter);
app.use("/participants", participantRouter);
app.use("/users", userRouter);
app.use("/feedback", feedbackRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});