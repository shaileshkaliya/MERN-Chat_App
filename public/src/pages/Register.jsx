import { useState } from "react";
import logo from "../assets/loginLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

function Register() {
  const signupData = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState(signupData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (handleValidation()) {
      const { username, email, password } = formData;
      try {
        const response = await axios.post(registerRoute, {
          username,
          email,
          password,
        });
        
        console.log(response.data);
        if (response.data.status === false) {
          toast.error(response.data.msg, toastOptions);
        }
        if (response.data.status === true) {
          toast.success(response.data.msg, toastOptions);
          navigate('/')
        }
        
      } catch (error) {
        console.error("Registration failed:", error.response.data);
      }
    }
  };

  const handleValidation = () => {
    const { username, email, password, confirmPassword } = formData;

    if (password != confirmPassword) {
      toast.error("Password & confirm password must be same", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password length should be greater than 8", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    }

    return true;
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#131324]">
      <div className="w-3/4 h-3/4 sm:w-[400px] bg-[#0a0a13] rounded-xl">
        <div className="flex justify-center items-center sm:gap-4  pt-4">
          <img src={logo} alt="Chatty" className="w-20 h-16 mix-blend-screen" />
          <h4 className="text-white sm:text-2xl font-extrabold sm:tracking-widest text-[22px] tracking-wide">
            CHATTY
          </h4>
        </div>

        <div className="w-full flex flex-col items-center h-full">
          <form
            className="flex flex-col w-full items-center h-3/4 justify-evenly"
            onSubmit={(e) => handleSubmit(e)}
            
          >
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
              className="bg-transparent border-[#480eea] border-[1px] rounded-lg text-[#5b5f67] p-2 text-sm w-3/4"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="bg-transparent border-[#480eea] border-[1px] rounded-lg text-[#5b5f67] p-2 text-sm w-3/4"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              className="bg-transparent border-[#480eea] border-[1px] rounded-lg text-[#5b5f67] p-2 text-sm w-3/4"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              required
              className="bg-transparent border-[#480eea] border-[1px] rounded-lg text-[#5b5f67] p-2 text-sm w-3/4"
            />
            <button
              type="submit"
              className="w-3/4 bg-[#9979f1] text-white p-[4px] rounded-lg"
            >
              CREATE USER
            </button>
          </form>
          <p className="text-white font-light sm:text-sm text-[12px]">
            ALREADY HAVE AN ACCOUNT ?{" "}
            <Link to="/login" className="text-[#100bd8]">
              <span className="text-[#100bd8] cursor-pointer">Login .</span>{" "}
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
