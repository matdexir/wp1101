import mongoose from "mongoose";
import UserModel from "./UserSchema";

const Schema = mongoose.Schema;

const ChatBoxSchema = new Schema({
  name: { type: String, required: true },
  messages: [{ type: mongoose.Types.ObjectId, ref: "Message" }],
});

export default mongoose.model("ChatBox", ChatBoxSchema);
