import * as participantService from "../services/participant";

const getParticipants = async (req, res) => {
    res.send({ participants: await participantService.getParticipants(req.query) });
};

const createParticipant = async (req, res) => {
    try {
        res.status(201).send({ participant: await participantService.createParticipant(req.body) });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

const updateParticipant = async (req, res) => {
    const updatedParticipant = await participantService.updateParticipant(req.body);
    if (!!updatedParticipant) {
        res.status(200).send({ updated_participant: updatedParticipant });
    } else {
        res.status(404).send({ message: "Participant not found" });
    }
};

const deleteParticipant = async (req, res) => {
    await participantService.deleteParticipant(req.params.id);
    res.status(200).send({ message: "Participant deleted" });
};

export {
    getParticipants,
    createParticipant,
    updateParticipant,
    deleteParticipant
};