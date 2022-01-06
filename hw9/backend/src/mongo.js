import dotenv from "dotenv-defaults";
import mongoose from "mongoose";

const connect = async () => {
  dotenv.config();
  const dboptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose
    .connect(process.env.MONGO_URL, dboptions)
    .then((_) => console.log("connection to MongoDB created"))
    .catch((err) => console.log(err));
};

export default { connect };
