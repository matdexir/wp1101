import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// Creating a Schema
const MessageSchema = new Schema({
	name: {
		type: String,
		required: [true, "Name field is required"]
	},
	body: {
		type: String,
		required: [true, "Body field is required"]
	}
});

// creating a table within the database with the defined Schema
const Message = mongoose.model('message', MessageSchema);
// Exporting the module
export default Message;
