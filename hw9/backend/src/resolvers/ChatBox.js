const ChatBoxResolver = {
  messages(parent, args, { MessageModel }, info) {
    return Promise.all(
      parent.messages.map((mId) => MessageModel.findById(mId))
    );
  },
};

export default ChatBoxResolver;
