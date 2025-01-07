import * as activityService from "../services/activity.js";

const getActivities = async (req, res) => {
    res.send({ activities: await activityService.getActivities(req.query) });
};

const createActivities = async (req, res) => {
    const response = await activityService.createActivities(req.body);
    if(response.fail) {
        res.status(400).send({message: "Invalid dates, probably"});
    }
    else {
        res.status(201).send({createdActivites: response});
    }
};

const updateActivity = async (req, res) => {
    const updatedActivity = await activityService.updateActivity(req.body);
    if (!!updatedActivity) {
        res.status(200).send({ updated_activity: updatedActivity });
    }
    else {
        res.status(404).send({ message: "Activity not found" });
    }
};

const deleteActivity = async (req, res) => {
    const result = await activityService.deleteActivity(req.query.id);
    if (!!result) {
        res.status(200).send({ message: "Activity deleted" });
    }
    else {
        res.status(404).send({ message: "Activity not found" });
    }
};

const joinActivity = async (req, res) => {
    const joinData = await activityService.joinActivity(req.body.activityCode);
    if (joinData.success) {
        res.status(200).send({
             message: "Joining activity...",
             activityId: joinData.activityId
            });
    }
    else {
        if(joinData.notInTime) {
            //https://http.cat/status/425
            res.status(425).send({message: "Activity is not ongoing."});
        }
        else {
            res.status(404).send({ message: "Activity not found" });
        }
    }
}

export {
    getActivities,
    createActivities,
    updateActivity,
    deleteActivity,
    joinActivity
}