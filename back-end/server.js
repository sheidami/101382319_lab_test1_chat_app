const express = require('express');
const cors = require('cors'); 
const mongoose = require("mongoose")
const user = require('./routes/user');
const room = require("./routes/room")
const message = require("./routes/message")
const { io } = require('socket.io');


const app = express();
const SERVER_PORT = 5000; 

// Middleware JSON parsing
app.use(express.json());
app.use(express.urlencoded())
const DB_CONNECTION_STRING = "mongodb+srv://admin:829682@cluster0.mznpgmx.mongodb.net/comp3133_lab_test?retryWrites=true&w=majority"
mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(cors());
app.use('/api/v1/user', user);
app.use('/api/v1', room);
app.use('/api/v1', message);



const server = app.listen(SERVER_PORT, () => {
  console.log(`Server is listening on port ${SERVER_PORT}`);
});


