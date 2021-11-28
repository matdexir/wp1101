import express from "express";
import ScoreCard from "../../models/ScoreCard";

const QueryDB = async (keyword, type) => {
  try {
    if (type == "name") {
      ScoreCard.find({ name: keyword });
    } else {
      ScoreCard.find({ subject: keyword });
    }
  } catch (e) {
    console.log("Unable to find " + type + ":" + keyword);
  }
};

export default QueryDB;
