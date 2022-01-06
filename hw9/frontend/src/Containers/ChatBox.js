import { useQuery, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { Tag } from "antd";
import "../App.css";
import { CHATBOX_QUERY } from "../graphql";

const ChatBox = ({ me, friend, ...props }) => {
  const { data, loading, subscribeToMore } = useQuery(CHATBOX_QUERY, {
    variables: { name1: me, name2: friend },
  });
  useEffect(() => {
    try {
      subscribeToMore({}, subscribeToMore);
      if (loading) return <p>loading</p>;
      return (
        <div className="App-messages">
          {data.chatBox.messages.map(({ sender: { name }, body }, i) => (
            <p className="App-message" key={name + body + i}>
              <Tag color="blue">{name}</Tag>
              {body}
            </p>
          ))}
        </div>
      );
    } catch (e) {
      throw new Error("ChatBox error " + e);
    }
  });
};

export default ChatBox;
