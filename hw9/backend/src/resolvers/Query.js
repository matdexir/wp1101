const Query = {
  // Returning a list of all users
  chatbox: async (parent, { name }, { ChatBoxModel }) => {
    const chatbox = await ChatBoxModel.findOne(name);
    return chatbox;
  },
};

export { Query as default };
