import { Button, Tag } from "antd";
import "../App.css";

const Chatroom = ({ me, messages, clearMessages }) => {
  return (
    <>
      <div className="App-title">
        <h1>{me}'s Chat Room</h1>
        <Button type="primary" danger onClick={clearMessages}>
          Clear
        </Button>
      </div>
      <div className="App-messages">
        {messages.map(({ name, body }, i) => (
          <p className="App-message" key={i}>
            <Tag color="blue">{name}</Tag>
            {body}
          </p>
        ))}
      </div>
    </>
  );
};

export default Chatroom;
