import * as userService from "../services/user.js";

const getUsers = async (req, res) => {
    res.send({ users: await userService.getUsers(req.query) });
};

const createUsers = async (req, res) => {
    try {
        const usersCreated = await userService.createUsers(req.body);
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
    if (loginData.success) {
        res.status(200).send(loginData.user);
    }
    else {
        if(loginData.userExists) {
            res.status(400).send({message: "Login failed."});
        }
        else {
            res.status(404).send({message: "User not found."});
        }
        
    }
};

const register = async (req, res) => {
    const existingEmailUsers = await userService.getUsers({email: req.body.email});
    const isNewEmail = !existingEmailUsers || existingEmailUsers.length === 0;

    if (isNewEmail) {
        const registerSuccessful = await userService.register(req.body);

        if (registerSuccessful) {
            return res.status(201).send({
                 message: `User ${req.body.first_name} ${req.body.last_name} registered successfully.`,
                 email: req.body.email });
        } else {
            return res.status(500).send({ message: "Failed to register user" });
        }
    } else {
        return res.status(409).send({ message: "Email already exists" });
    }
};

export {
    getUsers,
    createUsers,
    updateUser,
    deleteUser,
    login,
    register
};