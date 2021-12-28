import mongoose from "mongoose";
import { dataInit } from "./upload.js";

import "dotenv-defaults/config.js";

async function connect() {
  // TODO 1.1 Connect your MongoDB
  const dboptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose
    .connect(process.env.MONGO_URL, dboptions)
    .then((_) => console.log("conection created"))
    .catch((err) => console.log(err));
	dataInit();
}

export default { connect };
