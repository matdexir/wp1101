import express from "express";
import { genNumber, getNumber } from "../core/getNumber";

const router = express.Router();

router.post("/start", (_, res) => {
  genNumber();
  res.json({ msg: "The game has started." });
});

router.get("/guess", (req, res) => {
  const number = getNumber();
  const guessed = req.query.number;
  // check if number in correct range
  if (isNaN(guessed) || guessed < 1 || guessed > 100) {
    res.status(406).send({ msg: "Not a legal number..." });
  } else if (number == guessed) {
		res.send({msg: "Equal"})
  }
	else {
		if (number < guessed)
			res.send({msg: "Smaller"})
		else if(number > guessed)
			res.send({msg: "Bigger"})
	}
});

router.post("/restart", (req, res) => {
  genNumber();
  res.json({ msg: "The game has restarted." });
});

export default router;
