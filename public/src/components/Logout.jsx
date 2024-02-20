import React from 'react'
import {BiPowerOff} from 'react-icons/bi'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Logout() {
    const navigate = useNavigate();
    const toastOptions = {
        position: "bottom-right",
        autoClose: 6000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };

    const handleClick = async() => {
        localStorage.clear();
        toast.success("Logout successfully...")
        setTimeout(() => {
            navigate('/login')
        }, 2000);
        
    }
  return (
    <div className='bg-[#9a86f3] cursor-pointer' onClick={handleClick}>
        <BiPowerOff className='h-6 w-6' />
        <ToastContainer />
    </div>
  )
}
