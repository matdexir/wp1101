import Message from "./models/message";

const sendData = (data, ws) => {
  ws.send(JSON.stringify(data));
};

const sendStatus = (payload, ws) => {
  sendData(["status", payload], ws);
};

const initData = (ws) => {
  Message.find()
    .sort({ created_at: -1 })
    .limit(100)
    .exec((err, res) => {
      // console.log(res);
      if (err) throw err;
      // initialize the app with existing messages
      sendData(["init", res], ws);
    });
};

export { sendData, sendStatus, initData };
