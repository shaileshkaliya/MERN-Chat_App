import React, { useState } from "react";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

export default function ChatInput({ handleSendMsg }) {
  const [showEmoji, setEmojiShow] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerHideShow = () => {
    setEmojiShow(!showEmoji);
  };

  const handleEmojiClick = (emoji) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };

  const sendChat = (e) => {
    e.preventDefault();
    if(msg.length > 0){
      handleSendMsg(msg);
      setMsg("");
    }
  }
  return (
    <div className="w-full flex justify-between items-start gap-4 px-4">
      <div className="">
        {showEmoji && (<Picker
          onEmojiClick={handleEmojiClick}
          className=" w-1/4 relative bottom-[350px] overflow-scroll height-[150px]"
        />)}
      </div>

      <form className={` flex justify-between gap-2 ${showEmoji ? "w-3/4" : "w-full"}`} onSubmit={(e) => {sendChat(e)}}>
        <BsEmojiSmileFill
          className="text-3xl text-yellow-400 cursor-pointer"
          onClick={handleEmojiPickerHideShow}
        />
        <input
          type="text"
          placeholder="Enter your message"
          className="w-full rounded-lg p-2 outline-none border-none text-[#0a0a13]"
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
        />
        <button className="p-2 bg-[#9a86f3] rounded-lg" type="submit">
          <IoMdSend className=" text-xl text-black" />
        </button>
      </form>
    </div>
  );
}
