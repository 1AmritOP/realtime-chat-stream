import mongoose  from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: {
        email: String,
        name: String,
        photoURL: String,
    },
    text: {
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