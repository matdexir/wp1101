import { gql } from "@apollo/client";

export const CREATE_CHATBOX_MUTATION = gql`
  mutation CreateChatBox($name1: String!, $name2: String!) {
    createChatBox(name1: $name1, name2: $name2) {
      ChatBox
    }
  }
`;

export const CREATE_MESSAGE_MUTATION = gql`
  mutation CreateMessage(
    $sender: String!
    $body: String!
    $chatboxName: String!
  ) {
    createMessage(sender: $sender, body: $body, chatboxName: $chatboxName) {
      Message
    }
  }
`;
