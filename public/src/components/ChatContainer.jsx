import React, { useEffect, useRef, useState } from "react";
import parse from "html-react-parser";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import axios from "axios";
import { getAllMsgRoute, sendMsgRoute } from "../utils/APIRoutes";

function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  const handleSendMsg = async (msg) => {
    try {
      await axios.post(sendMsgRoute, {
        message: msg,
        from: currentUser._id,
        to: currentChat._id,
      });
    } catch (er) {
      console.log(er);
    }

    socket.current.emit('send-msg', {
      to:currentChat._id,
      from:currentUser._id,
      message:msg
    })

    const msgs = [...messages];
    msgs.push({fromSelf:true, message:msg})
    setMessages(msgs)
  };

  useEffect(() => {
    if(socket.current){
      socket.current.on('msg-receive', (msg) =>{
        setArrivalMessage({fromSelf:false, message:msg});
      })
    }
  }, [])

  useEffect( () => {
    arrivalMessage && setMessages((prev) => {[...prev, arrivalMessage]});
  }, [arrivalMessage])

  useEffect ( () => {
    scrollRef.current ? scrollIntoView({behaviour:'smooth'}) : "";
  }, [messages])

  const fetchData = async () => {
    if(currentChat){

      const response = await axios.post(getAllMsgRoute, {
        from: currentUser._id,
        to: currentChat._id,
      }); 
      setMessages(response.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentChat]);

  return (
    <>
      {currentChat && (
        <div className="text-white w-full h-full overflow-y-hidden ">
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

          <div className="h-4/6 w-full flex flex-col gap-4 overflow-y-scroll">
            {messages.map((message) => {
              return (
                <div
                  className={`flex w-full px-6 items-center ${
                    message.fromSelf ? "justify-end" : "justify-start"
                  }`}
                >
                  <p className={`text-white p-2 rounded-lg ${message.fromSelf ? 'bg-[#4f0fff21]' : 'bg-[#9900ff20]'}`}>{message.message}</p>
                </div>
              );
            })}
          </div>

          <ChatInput handleSendMsg={handleSendMsg} />
        </div>
      )}
    </>
  );
}

export default ChatContainer;
