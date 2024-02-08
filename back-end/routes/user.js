const express = require("express")
const routes = express.Router();
const user = require("../models/userModel");
const room = require("../models/messageRoomModel")
const bcrypt = require('bcrypt');


routes.post("/signup", async (req, res) => {
    try {
        const { username, firstname, lastname, email, password} = req.body;
        const existUser = await user.findOne({ username });
        if (existUser) {
            return res.status(409).json({ message: 'User already exists' });
        }
        const newUser = new user({
            username,
            email,
            firstname,
            lastname,
            password,
        });
        await newUser.save();
        return res.status(201).json({ message: 'User created successfully' });
    } catch (e) {
        return res.status(500).json(e);
    }
})

routes.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const userCheck = await user.findOne({ username });
        if (!userCheck) {
            return res.status(400).json({ message: 'Invalid Username or Password' });
        }

        const passCheck = await bcrypt.compare(password, userCheck.password);
        if (!passCheck) {
            return res.status(400).json({ status: false, message: 'Invalid Username or Password' });
        }
        return res.status(200).json({
            status: true,
            username: userCheck.username,
            message: 'User logged in successfully'
        });
    } catch (e) {
        return res.status(500).json(e);
    }
})

// Join a user to a room
routes.post('/join-room', async (req, res) => {
    const { username, roomName } = req.body;

    try {
        // Find the user by username
        const userCheck = await user.findOne({ username });
        if (!userCheck) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the room by room name
        const roomCheck = await room.findOne({ name: roomName });
        if (!roomCheck) {
            return res.status(404).json({ message: 'Room not found' });
        }

        // Add the user to the room's members
        roomCheck.members.push(userCheck._id);
        await roomCheck.save();
        res.status(200).json({ message: 'User joined room successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = routes;