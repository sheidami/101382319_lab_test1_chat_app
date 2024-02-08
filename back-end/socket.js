const io = require("socket.io")(8900, {
    cors: {
      origin: "http://localhost:5000",
    },
  });
  
  let users = [];
  
  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };
  
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  
  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };
  
  io.on("connection", (socket) => {
    console.log("User connected");
  
    socket.on("addUser", ({ userId, roomId }) => {
      addUser(userId, socket.id, roomId);
      socket.join(roomId); // Join the room
      io.to(roomId).emit("getUsers", users.filter((user) => user.roomId === roomId));
    });
  
    socket.on("sendMessage", ({ senderId, receiverId, text, roomId }) => {
      io.to(roomId).emit("getMessage", {
        senderId,
        text,
      });
    });
  
    socket.on("disconnect", () => {
      console.log("User disconnected");
      removeUser(socket.id);
    });
  });