import mongoose from "mongoose";
import dotenv from "dotenv-defaults";
import SaveScoreCard from "./routes/api/add";
import deleteDB from "./routes/api/clear";

dotenv.config();
const Connection = mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((_) => console.log("connection to MongoDB created"))
  .catch((err) => console.log(err));

const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", async () => {
	await deleteDB();
  await SaveScoreCard("John", "Geo", 75);
  await SaveScoreCard("Larry", "Geo", 75);
  await SaveScoreCard("Pierre", "Geo", 75);
});

export default Connection;
