import ScoreCard from "../../models/ScoreCard";

const SaveScoreCard = async (name, subject, score) => {
  // const existing = await ScoreCard.findOne({ name, subject });
  const exact_same = await ScoreCard.findOne({ name, subject, score });
  if (exact_same) throw new Error(`data ${name} exits!`);
  try {
    const newScoreCard = new ScoreCard({ name, subject, score });
    console.log("Created New User" + newScoreCard);
    return newScoreCard.save();
  } catch (e) {
    throw new Error("User Creation error: " + e);
  }
};

export default SaveScoreCard;
