import React from "react";
import parse from "html-react-parser";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import Messages from "./Messages";

function ChatContainer({ currentChat }) {
  const handleSendMsg = async () => {};

  return (
    <>
      {currentChat && (
        <div className="text-white w-full h-full ">
          <div className="flex justify-between gap-6 items-center pt-4 px-8 h-1/6">
            <div className="flex justify-start gap-6 items-center ">
              {(() => {
                let svgString = currentChat.avatarImage;
                svgString = svgString.replace(
                  /height="[^"]+"/,
                  'height="32px"'
                );
                svgString = svgString.replace(/width="[^"]+"/, 'width="36px"');

                return parse(svgString);
              })()}
              <div className="flex items-center h-full">
                <h3 className="text-white text-xl">{currentChat.username}</h3>
              </div>
            </div>
            <Logout />
          </div>

          <div className="h-4/6">
            <Messages />
          </div>

          <div className="h-1/6 w-full">
            <ChatInput handleSendMsg={handleSendMsg} />
          </div>
        </div>
      )}
    </>
  );
}

export default ChatContainer;
