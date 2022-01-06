import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
	sender: { type: String, required: true },
  body: { type: String, required: true },
});

export default mongoose.model("Message", MessageSchema);
