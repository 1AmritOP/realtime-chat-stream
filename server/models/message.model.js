import mongoose  from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: {
        uid: String,
        name: String,
        photoURL: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    roomId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.model("Message", messageSchema)