import ScoreCard from "../../models/ScoreCard";

const DeleteDB = async () => {
  try {
    await ScoreCard.deleteMany({});
    console.log("Database cleared");
  } catch (e) {
    throw new Error("Database deletion error in /src/routes/api/clear.js: " + e);
  }
};

export default DeleteDB;
