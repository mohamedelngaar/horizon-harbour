// import {
//   MultiChatSocket,
//   MultiChatWindow,
//   useMultiChatLogic,
// } from "react-chat-engine-advanced";

import { PrettyChatWindow } from "react-chat-engine-pretty";

import "./Chat.css";

const ChatsPage = (props) => {
  // const chatProps = useMultiChatLogic(
  //   "5a548001-015d-4e2e-805f-49d09627e427",
  //   // eslint-disable-next-line react/prop-types
  //   props.user.username,
  //   // eslint-disable-next-line react/prop-types
  //   props.user.secret
  // );
  return (
    <div style={{ height: "100vh" }}>
      {/* <MultiChatSocket {...chatProps} />
      <MultiChatWindow {...chatProps} style={{ height: "100%" }} /> */}
      <PrettyChatWindow
        projectId="dc9667fd-784e-4f2a-9836-925b146f6296"
        username={props.user.username}
        secret={props.user.secret}
        style={{ height: "100vh" }}
      />
    </div>
  );
};

export default ChatsPage;
