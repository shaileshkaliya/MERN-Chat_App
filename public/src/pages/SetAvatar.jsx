import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";
import loader from "../assets/loader.gif";
import parse from "html-react-parser";

function SetAvatar() {
  const api = "https://api.multiavatar.com";
  const navigate = useNavigate();

  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(
    () => {
      if(!localStorage.getItem('chat-app-user')){
        navigate('/login');
      }
    },[]
  )

  const setProfilePicture = async () => {
    let response;
    let user; // Declare the variable outside the if block
    if (selectedAvatar === undefined) {
      toast.error("Please select one avatar", toastOptions);
    } else {
      user = await JSON.parse(localStorage.getItem('chat-app-user'));
      response = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });
    }
      console.log(response);
  
    if (response.data.isSet) {
      // Rest of your code...
      user.iaAvatarImageSet = true;
      user.image = response.data.image;
      localStorage.setItem('chat-app-user', JSON.stringify(user));
      toast.success("Avatar selected successfully", toastOptions);
      setTimeout(() => { 
        navigate('/');
      }, 4000);
    } else {
      toast.error("Error in setting avatar. Please try again", toastOptions);
    }
  };
  

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        console.log(image.data);
        let svgString = image.data
        const height = "150";
        const width = "150";

        // Use a regular expression to find the opening <svg> tag and insert the attributes
        svgString = svgString.replace(
          /<svg(.*?)>/,
          `<svg$1 height="${height}" width="${width}">`
        );
        data.push(svgString);
      }
      setAvatars(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching avatars:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#121222]">
      {loading ? (
        <img src={loader} alt="Loading..." />
      ) : (
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="text-2xl text-white font-semibold">
            Pick an avatar as our profile picture
          </h1>
          <div className="flex justify-center gap-4 items-center">
            {avatars.map((avatar, index) => {
              return <div key={index}
                onClick={() => setSelectedAvatar(index)}
                className={`${selectedAvatar===index ? "border-4 border-white rounded-full h-[150px] w-[150px] p-2" : ""} flex items-center justify-center`}
              >{parse(`'${avatar}'`)}</div>;
            })}
          </div>
          <button className="text-sm bg-[#8e68dc] w-fit rounded-sm px-2 py-3 text-white font-semibold" onClick={() => setProfilePicture()}>
            SET AS PROFILE PICTURE
          </button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default SetAvatar;
