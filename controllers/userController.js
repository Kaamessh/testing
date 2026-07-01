const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// CREATE USER

const register = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {

            return res.status(400).json({
                message: "All fields are required"
            });

        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                message: "User already exists"
            });

        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: "User Registered Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const login = async (req,res)=>{

    const {email,password}=req.body;

    const user=await User.findOne({email});

    if(!user){

        return res.status(404).json({

            message:"User Not Found"

        });

    }

    const isMatch=await bcrypt.compare(

        password,

        user.password

    );

    if(!isMatch){

        return res.status(401).json({

            message:"Invalid Password"

        });

    }

    const token=jwt.sign(

        {

            id:user._id

        },

        process.env.JWT_SECRET,

        {

            expiresIn:"1d"

        }

    );

    res.status(200).json({

        message:"Login Successful",

        token

    });

};
// GET ALL USERS

const getUsers = async (req, res) => {

    try {

        const users = await User.find();

        res.status(200).json(users);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// GET SINGLE USER

const getUserById = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({
                message: "User Not Found"
            });

        }

        res.status(200).json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// UPDATE USER

const updateUser = async (req, res) => {

    try {

        const updatedUser = await User.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true
            }

        );

        if (!updatedUser) {

            return res.status(404).json({
                message: "User Not Found"
            });

        }

        res.status(200).json({
            message: "User Updated Successfully",
            updatedUser
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// DELETE USER

const deleteUser = async (req, res) => {

    try {

        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {

            return res.status(404).json({
                message: "User Not Found"
            });

        }

        res.status(200).json({
            message: "User Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
const getProfile = (req, res) => {

    res.status(200).json({
        message: "Profile Data",
        user: req.user
    });

};

module.exports = {

    register,

    login,

    getUsers,

    getUserById,

    updateUser,

    deleteUser,

    getProfile


};