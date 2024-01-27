import { useState, useEffect } from "react";
import loginLogo from "../assets/loginLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

function Login() {

  const toastOptions = {
    position: "bottom-right",
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const loginData = { username: "", password: "" };
  const [data, setData] = useState(loginData);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (handleValidations()) {
      const { username, password } = data;
      try {
        const response = await axios.post(loginRoute, {
          username,
          password
        });
  
        console.log(response.data);
  
        if (response.data.status === false) {

          toast.error(response.data.message, toastOptions);
        } else if (response.data.status === true) {
          toast.success("Login Successfull. Redirecting to homepage", toastOptions);
          localStorage.setItem('chat-app-user', JSON.stringify(response.data.user));
          setTimeout(() => {
            navigate('/');
          }, 4000);
        }
  
      } catch (error) {
        console.error("Registration failed:", error.response.data);
        toast.error(error.response.data.message, toastOptions);
      }
    }
  };


  const handleValidations = () => {
    const {username, password} = data;
    if(username.length===""){
      toast.error("Username is required...", toastOptions);
      return false;
    }else if(password===""){
      toast.error("Passowrd is required...", toastOptions);
      return false;
    }

    return true;
  }

  useEffect(
    () => {
      if(localStorage.getItem('chat-app-user')){
        navigate('/');
      }
    }
  )

  return (
    <div className="w-screen h-screen bg-[#131324] flex justify-center items-center">
      <div className="w-3/4 h-2/4 sm:w-96 sm:h-96 bg-[#0a0a13] rounded-3xl flex flex-col gap-8">
        <div className="flex justify-center items-center sm:gap-4  pt-16">
          <img
            src={loginLogo}
            alt="Chat"
            className="w-20 h-16 mix-blend-screen"
          />
          <h3 className="text-white sm:text-2xl font-extrabold sm:tracking-widest text-[22px] tracking-wide">
            CHATTY
          </h3>
        </div>

        <div className="flex flex-col items-center gap-4">
          <form className="flex flex-col justify-center items-center gap-6 w-full"
            onSubmit={(e) => handleSubmit(e)}
          >
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
              required
              min="3"
              className="bg-transparent border-[#480eea] border-[1px] rounded-lg text-[#5b5f67] p-2 text-sm w-3/4"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
              className="bg-transparent border-[#480eea] border-[1px] rounded-lg text-[#5b5f67] p-2 text-sm w-3/4"
            />

            <button className="w-3/4 bg-[#4e0eff] text-white p-[4px] rounded-lg">
              LOG IN
            </button>
          </form>

          <p className="text-white font-light sm:text-sm text-[12px]">
            DON'T HAVE AN ACCOUNT ?{" "}
            <Link to="/register" className="text-[#100bd8]">
              <span className="text-[#100bd8] cursor-pointer">
                CREATE ONE .
              </span>{" "}
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;

//#480eea border
//#131324 bg
