import { useState } from "react";
import logo from "../assets/loginLogo.png";
import {Link} from "react-router-dom"

function Register() {
  const signupData = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(signupData);

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
          <form className="flex flex-col w-full items-center h-3/4 justify-evenly">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
              className="bg-transparent border-[#480eea] border-[1px] rounded-lg text-[#5b5f67] p-2 text-sm w-3/4"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="bg-transparent border-[#480eea] border-[1px] rounded-lg text-[#5b5f67] p-2 text-sm w-3/4"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="bg-transparent border-[#480eea] border-[1px] rounded-lg text-[#5b5f67] p-2 text-sm w-3/4"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              className="bg-transparent border-[#480eea] border-[1px] rounded-lg text-[#5b5f67] p-2 text-sm w-3/4"
            />
            <button className="w-3/4 bg-[#9979f1] text-white p-[4px] rounded-lg">
              CREATE USER
            </button>
          </form>
          <p className="text-white font-light sm:text-sm text-[12px]">
            ALREADY HAVE AN ACCOUNT ?{" "}
            <Link to="/login" className="text-[#100bd8]">
              <span className="text-[#100bd8] cursor-pointer">
                Login .
              </span>{" "}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
