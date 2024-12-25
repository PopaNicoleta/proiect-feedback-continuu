import * as feedbackService from "../services/feedback";

const getFeedback = async (req, res) => {
    res.send({ feedback: await feedbackService.getFeedback(req.query) });
};

const createFeedback = async (req, res) => {
    try {
        res.status(201).send({ feedback: await feedbackService.createFeedback(req.body) });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

const updateFeedback = async (req, res) => {
    const updatedFeedback = await feedbackService.updateFeedback(req.body);
    if (!!updatedFeedback) {
        res.status(200).send({ updated_feedback: updatedFeedback });
    } else {
        res.status(404).send({ message: "Feedback not found" });
    }
};

const deleteFeedback = async (req, res) => {
    await feedbackService.deleteFeedback(req.params.id);
    res.status(200).send({ message: "Feedback deleted" });
};

export {
    getFeedback,
    createFeedback,
    updateFeedback,
    deleteFeedback
};