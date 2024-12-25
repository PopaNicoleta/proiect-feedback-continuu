import * as userService from "../services/user";

const getUsers = async (req, res) => {
    res.send({ users: await userService.getUsers(req.query) });
};

const createUser = async (req, res) => {
    try {
        res.status(201).send({ user: await userService.createUser(req.body) });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

const updateUser = async (req, res) => {
    const updatedUser = await userService.updateUser(req.body);
    if (!!updatedUser) {
        res.status(200).send({ updated_user: updatedUser });
    } else {
        res.status(404).send({ message: "User not found" });
    }
};

const deleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id);
    res.status(200).send({ message: "User deleted" });
};

export {
    getUsers,
    createUser,
    updateUser,
    deleteUser
};