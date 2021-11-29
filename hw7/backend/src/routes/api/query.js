import ScoreCard from "../../models/ScoreCard";

const QueryDB = async (keyword, type) => {
  try {
    if (type == "name") {
      return await ScoreCard.find({ name: keyword });
    } else {
      return await ScoreCard.find({ subject: keyword });
    }
  } catch (e) {
    console.log("Unable to find " + type + ":" + keyword);
		return "Error";
  }
};

export default QueryDB;
