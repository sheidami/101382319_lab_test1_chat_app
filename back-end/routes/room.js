const express = require('express');
const router = express.Router();
const Room = require('../models/messageRoomModel');

// Create a new room
router.post("/", async (req, res) => {
    const newChatRoom = new Room({
      members: [req.body.senderId, req.body.receiverId],
    });
  
    try {
      const savedConversation = await newChatRoom.save();
      res.status(200).json(savedConversation);
    } catch (err) {
      res.status(500).json(err);
    }
});

// Get all rooms
router.get('/rooms', async (req, res) => {
    try {
        const rooms = await Room.find();
        return res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single room by ID
router.get('/rooms/:roomId', async (req, res) => {
    try {
        const room = await Room.findById(req.params.roomId);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json(room);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Get messages for a room
router.get('/rooms/messages', async (req, res) => {
    const {roomName} = req.body;
    try {
        const room = await Room.findOne({roomName}).populate('messages').exec();
        res.status(200).json(room.messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;