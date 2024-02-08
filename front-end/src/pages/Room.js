import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './Room.css';


const Room = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const location = useLocation();
  const { username, roomName } = location.state;

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/rooms/messages`, {roomName: `${roomName}`});
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  function sendMessage(username, messageInput) {
    return async () => {
      try {
        if (!messageInput.trim()) {
          return; // If the message is empty or only contains whitespace, don't send
        }
  
        await axios.post(`http://localhost:5000/api/v1/rooms/messages`, {
          username, 
          roomName,
          messageInput
        });
  
        // Clear the input field after sending the message
        setMessageInput('');
        
        // Fetch updated messages after sending
        fetchMessages();
      } catch (error) {
        console.error('Error sending message:', error);
      }
    };
  }
 

  return (
    <div className="chat-container">
      <h1>Welcome to Room {roomName}</h1>
      <div className="message-list">
        {messages.map((message, index) => (
          <div className="message" key={index}>
            <span className="sender">{message.sender}: </span>
            <span className="text">{message.text}</span>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={() => sendMessage(username, messageInput)}>Send</button>
      </div>
    </div>
  );
};

export default Room;