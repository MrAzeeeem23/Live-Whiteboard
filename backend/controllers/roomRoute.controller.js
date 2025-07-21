import Room from "../models/room.js";

const joinRoom = async (req, res) => {

  console.log(req.body)
  const { roomId } = req.body;

  if (!roomId) {
    return res.status(400).json({
      error: "roomId is required",
    });
  }

  try {
    let room = await Room.findOne({ roomId });
    if (!room) {
      room = new Room({ roomId });
      await room.save();
    }

    res.json({
      roomId: room.roomId,
    });
  } catch (error) {
    res.status(500).json({error: "Server error"});
  }
};

const getRoomId = async (req, res) => {
    try {
        const room = await Room.findOne({ roomId: req.params.roomId})
        if(!room){
            return res.status(404).json({
                error: "Room Id not found"
            })  
        }

        res.json(room);
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

export {
    joinRoom,
    getRoomId
}