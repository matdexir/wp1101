import { gql } from "@apollo/client";

export const CHATBOX_CREATED_SUBSCRIPTION = gql`
  subscription OnChatBoxCreated {
    chatBoxCreated {
      ChatBox
    }
  }
`;

export const MESSAGE_CREATED_SUBSCRIPTION = gql`
  subscription OnMessageCreated {
    messageCreated {
      Message
    }
  }
`;
