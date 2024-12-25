import * as activityService from "../services/activity";

const getActivities = async (req, res) => {
    res.send({activities: await activityService.getActivities(req.query)});
};

const createActivity = async (req,res) => {
    try {
        res.status(201).send({activity: await activityService.createActivity(req.body)});
    }
    catch (err) {
        res.status(400).send({message: err.message});
    }
};

const updateActivity = async (req, res) => {
    const updatedActivity = await activityService.updateActivity(req.body);
    if(!!updatedActivity) {
        res.status(200).send({updated_activity: updatedActivity});
    }
    else {
        res.status(404).send({message: "Activity not found"});
    }
};

const deleteActivity = async(req,res) => {
    await activityService.deleteActivity(req.params.id);

    res.status(200).send({message: "Activity deleted"});
};

export {
    getActivities,
    createActivity,
    updateActivity,
    deleteActivity
}