import * as userService from "../services/user.js";

const getUsers = async (req, res) => {
    res.send({ users: await userService.getUsers(req.query) });
};

const createUsers = async (req, res) => {
    try {
        const users = await userService.createUsers(req.body);
        res.status(201).send({ users }); 
    } catch (err) {
        console.error("Error creating users:", err);
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

const login = async (req, res) => {
    const loginData = await userService.login(req.body);
    if (loginData.success) {//loginData primeste din Service datele de user si boolean success
        res.status(200).send(loginData);
    }
    else {
        res.status(400).send({message: "Login failed."});
    }
}

export {
    getUsers,
    createUsers,
    updateUser,
    deleteUser,
    login
};