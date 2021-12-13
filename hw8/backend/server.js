import Message from "./models/message";
import WebSocket from "ws";
import dotenv from "dotenv-defaults";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import { initData, sendData, sendStatus } from "./wssConnect";

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((_) => console.log("connection to MongoDB created"))
  .catch((err) => console.log(err));

const broadcastMessage = (data, status) => {
	wss.clients.forEach((client) => {
		sendData(data, client);
		sendStatus(status, client);
	});
}

const db = mongoose.connection;
db.once("open", () => {
  wss.on("connection", (ws) => {
    ws.onmessage = async (byteString) => {
      const { data } = byteString;
      const [task, payload] = JSON.parse(data);
			console.log(payload);
      switch (task) {
        case "input":
            const { name, body } = payload;
            const message = new Message({ name, body });
            try {
              await message.save();
            } catch (e) {
              throw new Error("Message DB error:" + e);
            }
            // sendData(["output", [payload]], ws);
            // sendStatus({ type: "success", msg: "Message sent." }, ws);
						broadcastMessage(["output", [payload]], { type: "success", msg: "Message sent."})
          break;
        case "clear":
            Message.deleteMany({}, () => {
              // sendData(["cleared"], ws);
              // sendStatus({ type: "info", msg: "message cache cleared." }, ws);
							broadcastMessage(["cleared"], { type: "info", msg: "message cache cleared."})
            });
          break;
        default:
          break;
      }
    };
		initData(ws);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Listening on http:\localhost\:${PORT}`);
});
