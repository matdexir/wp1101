const Subscription = {
  chatBoxCreated: {
    subscribe: (parent, args, { pubsub }, info) => {
      return pubsub.asyncIterator("CHATBOX_CREATED");
    },
  },
  messageCreated: {
    subscribe: (parent, args, { pubsub }, info) => {
      return pubsub.asyncIterator("MESSAGE_CREATED");
    },
  },
};

export { Subscription as default };
