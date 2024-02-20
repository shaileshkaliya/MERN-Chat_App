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

  return (
    <div className=" flex justify-between items-center w-full gap-4 px-4">
      <BsEmojiSmileFill
        className="w-[20px] h-[20px] text-yellow-400"
        onClick={handleEmojiPickerHideShow}
      />
      {showEmoji && (
        <Picker
          onEmojiClick={handleEmojiClick}
          className=""
        />
      )}

      {!showEmoji && (
        <form className="w-full flex justify-between gap-2">
          <input
            type="text"
            placeholder="Enter your message"
            className="w-full rounded-lg p-2 outline-none border-none text-[#0a0a13]"
            value={msg}
            onChange={(e) => {
              setMsg(e.target.value);
            }}
          />
          <button className="p-2 bg-[#9a86f3] rounded-lg">
            <IoMdSend className="w-[30px] text-xl text-black" />
          </button>
        </form>
      )}
    </div>
  );
}
