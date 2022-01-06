const Mutation = {
  async createChatBox(
    parent,
    { name1, name2 },
    { ChatBoxModel, pubsub },
    info
  ) {
    if (!name1 || !name2)
      throw new Error("Missing chatBox name for createChatBox");
    const chatBoxName = [name1, name2].sort().toString();
    let chatBox = await ChatBoxModel.findOne({ name: chatBoxName });
    if (!chatBox) {
      chatBox = new ChatBoxModel({ name: chatBoxName });
			await chatBox.save();
    }
    return chatBox;
  },

  async createMessage(
    parent,
    { sender, body, chatboxName },
    { ChatBoxModel, MessageModel, pubsub },
    info
  ) {
    let chatBox = await ChatBoxModel.findOne(chatboxName);
		chatBox.messages.push({sender, body});
		await chatBox.save();
		return {sender, body};
  },
};

export { Mutation as default };
