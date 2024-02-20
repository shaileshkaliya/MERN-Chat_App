import React, { useEffect, useState } from "react";
import logo from "../assets/loginLogo.png";
import "./contacts.css";
import parse from "html-react-parser";

function Contacts({ contacts, currentUser, handleChangeChat }) {
  const [currentUsername, setCurrentUsername] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUsername(currentUser.username);
      setCurrentUserImage(currentUser.avatarImage);
      console.log(currentUserImage);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    handleChangeChat(contact);
  };

  return (
    <div className="h-full flex">
      <div className="h-full w-full bg-[#080420] flex flex-col justify-between">
        <div className="flex w-full pl-8 h-1/8">
          <img src={logo} alt="Chatty" className="h-16 w-20 mix-blend-screen" />
          <h1 className="text-2xl text-white font-bold flex w-full leading-3 items-center">
            CHATTY
          </h1>
        </div>

        <div className="text-white flex flex-col gap-1 h-4/5  overflow-y-scroll no-scrollbar">
          {contacts.map((c, index) => {
            return (
              <div
                key={index}
                className={`flex gap-4 items-center p-4 cursor-pointer ${index==currentSelected ? "bg-[#0a0a13]": "bg-gray-900"}`}
                onClick={() => changeCurrentChat(index, c)}

              >
                {(() => {
                  let svgString = c.avatarImage;
                  svgString = svgString.replace(
                    /height="[^"]+"/,
                    'height="32px"'
                  );
                  svgString = svgString.replace(
                    /width="[^"]+"/,
                    'width="36px"'
                  );

                  return parse(svgString);
                })()}
                {c.username}
              </div>
            );
          })}
        </div>

        <div className="flex center-item bg-[#0a0a13] text-white gap-4 w-full p-4">
          {(() => {
            let svgString = currentUserImage;
            if (svgString) {
              svgString = svgString.replace(/height="[^"]+"/, 'height="32px"');
              svgString = svgString.replace(/width="[^"]+"/, 'width="36px"');
              return parse(svgString);
            }
            return null; // or some default value if currentUserImage is undefined
          })()}

          {currentUsername}
        </div>
      </div>
    </div>
  );
}

export default Contacts;
