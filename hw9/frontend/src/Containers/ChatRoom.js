import { useQuery, useMutation } from "@apollo/client";
import { Tabs } from "antd";
import { useEffect, useState } from "react";
import ChatBox from "./ChatBox";

const ChatRoom = ({ me, chatBoxes, createChatBox, removeChatBox }) => {
  const [activeKey, setActiveKey] = useState(0);

  const addChatBox = () => {
    let friend = prompt("Please enter your friend's name", "Jerry");
    createChatBox({ variables: { name1: friend, name2: me } });
  };

  return (
    <>
      <div className="App-title">
        <h1>Welcome to {me}'s chatroom</h1>
      </div>
      <div className="App-messages">
        <Tabs
          tabBarStyle={{ height: "36px" }}
          type="editable-card"
          activeKey={activeKey}
          onChange={(key) => {
            setActiveKey(key);
          }}
          onEdit={(targetKey, action) => {
            if (action === "add") addChatBox();
            else if (action === "remove") {
              setActiveKey(removeChatBox(targetKey, activeKey));
            }
          }}
        >
          {chatBoxes.map((friend) => (
            <Tabs.TabPane tab={friend} closable={true} key={friend}>
              <ChatBox me={me} friend={friend} key={friend} />
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
    </>
  );
};

export default ChatRoom;
