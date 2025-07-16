import mongoose from "mongoose";

const roomSchema= new mongoose.Schema({
    roomId: {
        type: String,
        required: true,
        unique: true
    },
    createdBy: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model("Room", roomSchema);