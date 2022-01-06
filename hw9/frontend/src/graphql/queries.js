import { gql } from "@apollo/client";

export const CHATBOX_QUERY = gql`
  query ($name: String!) {
    chatbox(name: $name) {
      ChatBox
    }
  }
`;
