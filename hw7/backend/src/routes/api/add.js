import ScoreCard from "../../models/ScoreCard";

const SaveScoreCard = async (name, subject, score) => {
  const existing = await ScoreCard.findOne({ name, subject });
  if (!existing) {
    try {
      const newScoreCard = new ScoreCard({ name, subject, score });
      // console.log("Created New User" + newScoreCard);
      return { old: false, ret: await newScoreCard.save() };
    } catch (e) {
      throw new Error("User Creation error: " + e);
    }
  } else {
    try {
      existing.score = score;
      return { old: true, ret: await existing.save() };
    } catch (e) {
      throw new Error("Updating value error:" + e);
    }
  }
};

export default SaveScoreCard;
