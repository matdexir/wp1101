import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "../App.css";

const SignIn = ({ me, setMe, setSignedIn, displayStatus }) => {
  return (
    <>
      <div className="App-title">
        <h1>My Chat Room</h1>
      </div>
      <div className="App">
        <Input.Search
          prefix={<UserOutlined />}
          value={me}
          onChange={(e) => setMe(e.target.value)}
          placeholder="Enter your name."
          size="large"
          style={{ width: 300, margin: 50 }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (!me) {
                displayStatus({
                  type: "error",
                  msg: "Username empty",
                });
                return;
              } else {
                setSignedIn(true);
              }
            }
          }}
        />
      </div>
    </>
  );
};

export default SignIn;
