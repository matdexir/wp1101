import "./App.css";
import useChat from "./Hooks/useChat";
import SignIn from "./Containers/signIn";
import Chatroom from "./Containers/Chatroom";
import { Input, message } from "antd";
import { useEffect, useState } from "react";

const LOCALSTORAGE_KEY = "save-me";

function App() {
  const { status, messages, sendMessage, clearMessages } = useChat();
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
  // const [username, setUsername] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [me, setMe] = useState(savedMe || "");
  const [body, setBody] = useState("");
  // const bodyRef = useRef(null);

  const displayStatus = (payload) => {
    if (payload.msg) {
      const { type, msg } = payload;
      const content = { content: msg, duration: 0.5 };
      switch (type) {
        case "success":
          message.success(content);
          break;
        case "error":
        default:
          message.error(content);
          break;
      }
    }
  };

  useEffect(() => {
    displayStatus(status);
  }, [status]);

  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me);
    }
  }, [signedIn, me]);
  return (
    <div className="App">
      {signedIn === true ? (
        <>
          <Chatroom
            me={me}
            messages={messages}
            clearMessages={clearMessages}
          ></Chatroom>
          <Input.Search
            enterButton="Send"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder="Type a message here..."
            onSearch={(msg) => {
              if (!msg) {
                displayStatus({
                  type: "error",
                  msg: "Please enter a message body",
                });
                return;
              }
              sendMessage({ name: me, body: msg });
              setBody("");
            }}
          ></Input.Search>
        </>
      ) : (
        <SignIn
          me={me}
          setMe={setMe}
          setSignedIn={setSignedIn}
          displayStatus={displayStatus}
        />
      )}
    </div>
  );
}

export default App;
