import mongoose from "mongoose";

const drawingCommandSchema = new mongoose.Schema({
    type: String,
    data: Object, 
    timestamp: { type: Date, default: Date.now }
})

const roomSchema = new mongoose.Schema({
    roomId: {
        type: String,
        unique: true,
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    Activity: {
        type: Date,
        default: Date.now
    },
    drawingData: [drawingCommandSchema]
})

export default mongoose.model("Room", roomSchema)