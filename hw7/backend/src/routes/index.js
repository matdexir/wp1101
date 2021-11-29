import express from "express";
import DeleteDB from "./api/clear";
import QueryDB from "./api/query";
import SaveScoreCard from "./api/add";

const apiRouter = express.Router();

apiRouter.post("/create-card", async (req, res) => {
  const { old, ret } = await SaveScoreCard(
    req.body.name,
    req.body.subject,
    req.body.score
  );
  if (!old) {
    res.send({
      card: true,
      message: `Adding(${ret.name}, ${ret.subject}, ${ret.score})`,
    });
  } else {
    res.send({
      card: true,
      message: `Updating(${ret.name}, ${ret.subject}, ${ret.score})`,
    });
  }
});

apiRouter.get("/query-cards", async (req, res) => {
  const ret = await QueryDB(req.query.queryString, req.query.type);
	const ret_messages = [];
	for(let instance of ret) {
		console.log(instance);
		ret_messages.push(`Found card with ${req.query.type}: (${instance.name}, ${instance.subject}, ${instance.score})`);
	}
  if (ret.length == 0) {
    res.send({ messages: null, message: `${req.query.queryString} not found` });
  } else {
    res.send({ messages: ret_messages, message: null });
  }
});

apiRouter.delete("/clear-db", async (_, res) => {
  DeleteDB();
  res.send({ message: "Database cleared." });
});

export default apiRouter;
