import cors from "cors";
import express from "express";
import apiRoute from "./routes/index";
import Connection from "./mongo";

// init middleware
const app = express();
app.use(cors());

// define routes
app.route("/api", apiRoute);

// define server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
