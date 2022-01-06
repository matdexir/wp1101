import dotenv from "dotenv-defaults";
import server from "./server";
import mongo from "./mongo";

// Loading the environment variables
dotenv.config();

// Connecting to the database
mongo.connect();
const port = process.env.PORT | 5000;

server.start({port}, () => {
	console.log(`The server is up on port ${port}!`);
})
