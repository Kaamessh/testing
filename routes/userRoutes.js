const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {

    register,

    login,

    getUsers,

    getUserById,

    updateUser,

    deleteUser,

    getProfile

} = require("../controllers/userController");

router.post("/users", register);

router.post("/login", login);

router.get("/users", getUsers);

router.get("/users/:id", getUserById);

router.put("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);

router.get("/profile", auth, getProfile);
module.exports = router;