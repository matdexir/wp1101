import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CHATBOX_MUTATION } from "../graphql";

const useChatBox = () => {
  const [newChatBox] = useMutation(CREATE_CHATBOX_MUTATION);
  const [chatBoxes, setChatBoxes] = useState([]);
  const createChatBox = (friend, me) => {
    const chatbox = newChatBox({ variables: { name1: friend, name2: me } });
    setChatBoxes(chatBoxes.push(chatbox));
  };
  const removeChatBox = (targetKey, activeKey) => {
    const ind = chatBoxes.indexOf(targetKey);
    setChatBoxes([
      ...chatBoxes
        .slice(0, ind)
        .concat(chatBoxes.slice(ind + 1, chatBoxes.length)),
    ]);
    if (activeKey === 0) return 0;
    else if (activeKey > 0) return activeKey - 1;
  };
  return { chatBoxes, createChatBox, removeChatBox };
};
export default useChatBox;
