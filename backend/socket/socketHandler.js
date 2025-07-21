import Room from "../models/room.js";

const userMap = new Map();

const handelSocketConnection = (io, socket) => {
  console.log("Connected", socket.id);

  socket.on("join-room", async ({roomId, userId}) => {
    socket.join(roomId);
    userMap.set(socket.id, { roomId, userId });

    const count = io.sockets.adapter.rooms.get(roomId)?.size || 1;
    io.to(roomId).emit("user-count", count);
  });

  socket.on("cursor-move", ({ roomId, userId, x, y }) => {
    socket.to(roomId).emit("cursor-update", { userId, x, y });
  });

  socket.on("draw-start", (data) => {
    socket.to(data.roomId).emit("draw-start", data);
  });


  socket.on("draw-move", async (data) => {
    socket.to(data.roomId).emit("draw-move", data);

    await Room.updateOne(
      { roomId: data.roomId },
      {
        $push: {
          drawingData: {
            type: "stroke",
            data: data,
            timestamp: new Date(),
          },
        },

        $set: {
          lastActivity: new Date(),
        },
      }
    );
  });

  socket.on("draw-end", (data) => {
    socket.to(data.roomId).emit("draw-end", data);
  });

  socket.on('clear-canvas', async ({ roomId }) => {
    console.log(roomId)
    await Room.updateOne(
      { roomId },
      {
        $push: {
            drawingData: {
            type: "clear",
            data: {},
            timestamp: new Date(),
          },
        },
      }
    );
    io.to(roomId).emit("clear-canvas");
  });

  socket.on("disconnect", () => {
    const user = userMap.get(socket.id);

    if (user) {
      const roomId = user.roomId;
      socket.leave(roomId);
      const count = io.sockets.adapter.rooms.get(roomId)?.size || 0;
      io.to(roomId).emit("user-count", count);
    }
    userMap.delete(socket.id);
    console.log("Disconnected");
  });
};


export default handelSocketConnection;