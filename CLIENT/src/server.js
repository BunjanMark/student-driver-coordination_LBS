const http = require("http");
const express = require("express");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("A user connected");

  // Generate a unique identifier for the device
  const deviceNumber = socket.id;

  // Handle incoming location updates
  socket.on("updateLocation", (update) => {
    console.log(
      `Location update received from Device ${deviceNumber}:`,
      update.location
    );
    // Broadcast the location update to all connected clients
    io.emit("locationUpdate", { deviceNumber, location: update.location });
  });

  // Handle location and sharedLocation events
  socket.on("location", (data) => {
    console.log("Location received: ", data);
    // Broadcast the location to all connected users
    io.emit("location", data);
  });

  socket.on("shareLocation", (data) => {
    console.log("Location shared: ", data);
    // Broadcast the shared location to all connected users
    io.emit("sharedLocation", data);
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log(`Device ${deviceNumber} disconnected`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
