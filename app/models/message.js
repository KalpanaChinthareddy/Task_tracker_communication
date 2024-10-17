import mongoose from "mongoose"

const MessageSchema = new mongoose.Schema({
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "chat",
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },  
  text: {
    type: String,
    default: "",
  },
  photo: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  seenBy: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
    default: []
  }
})

const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema)

export default Message