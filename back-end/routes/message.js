const Message = require("../models/messageModel");
const Room = require("../models/messageRoomModel")
const express = require('express');
const router = express.Router();


router.post('/rooms/messages', async (req, res) => {
   const {roomName, userName, text} = req.body;
  try {
      const room = await Room.findOne({name: roomName});
      if (!room) {
          return res.status(404).json({ message: 'Room not found' });
      }

      const newMessage = new Message({
          sender: {userName},
          text: {text}
      });
      await newMessage.save();

      room.messages.push(newMessage);
      await room.save();

      res.status(201).json(newMessage);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

module.exports = router;