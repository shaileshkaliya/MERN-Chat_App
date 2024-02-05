import React from 'react'
import robot from '../assets/robot.gif'

function Welcome({currentUser}) {
  return (
    <div className='text-white w-full h-full flex flex-col justify-center items-center'>

        <img src={robot} alt="Welcome..." className='w-48 h-48'/>
        <h1 className='font-bold text-3xl'>
            Welcome, <span className='text-[#4e00ff]'>{currentUser.username} !</span>
        </h1>
        <h3 className='font-bold'>Please select a chat to start messaging</h3>

    </div>
  )
}

export default Welcome