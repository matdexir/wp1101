import mongoose from "mongoose";
import express from "express";
import DeleteDB from "./api/clear";
import QueryDB from "./api/query";
import SaveScoreCard from "./api/add";
import Connection from "../mongo";
// import ScoreCard from "../../models/ScoreCard";

const router = express.Router();

router.post("/create-card", (req, res) => {
  console.log("Post request");
  SaveScoreCard(req.query.name, req.query.subject, req.query.score);
});

router.get("/query-cards", (req, res) => {
  console.log("get request");
  QueryDB(req.params.type, req.params.queryString);
  res.json({ message: "return message" });
});

router.delete("/clear-db", (_, res) => {
  DeleteDB();
  res.json({ message: "Deleted the whole database." });
});

export default router;
