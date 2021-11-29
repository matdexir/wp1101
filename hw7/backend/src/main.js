import cors from "cors";
import express from "express";
import apiRouter from "./routes/index";
import Connection from "./mongo";

// init middleware
const app = express();
app.use(cors());
app.use(express.json());

// redirecting to our router api
app.use("/api", apiRouter);

// define server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
