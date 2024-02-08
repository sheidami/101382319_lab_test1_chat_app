import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './RoomListPage.css'; 


const RoomList = ({ user }) => {
  const [rooms, setRooms] = useState([]);
   const navigate = useNavigate();
   const [username, setUsername] = useState('');

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/rooms');
      setRooms(response.data.map(room => room.name));
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const handleJoinRoom = async (roomName) => {
    try {
      
      const response = await axios.post(`http://localhost:5000/api/v1/user/join-room`, {username: `${username}`, roomName: `${roomName}`});
      console.log(response.data);
      navigate('/room', {state: { username, roomName }});

    } catch (error) {
      console.error('Error joining room:', error);
    }
  };


  return (
    <div className="container">
      <h2>Enter your username to join a room:</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
      />
      <h2>Available Rooms</h2>
      <ul>
        {rooms.map((roomName, index) => (
          <li key={index}>
            {roomName}{' '}
            <button onClick={() => handleJoinRoom(roomName)}>Join</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;