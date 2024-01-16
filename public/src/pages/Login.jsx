import { useState } from "react";
import loginLogo from "../assets/loginLogo.png";
import { Link } from "react-router-dom";

function Login() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

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
          <form className="flex flex-col justify-center items-center gap-6 w-full">
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
              required
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
              <span
                className="text-[#100bd8] cursor-pointer"
              >
                CREATE ONE .
              </span>{" "}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

//#480eea border
//#131324 bg
