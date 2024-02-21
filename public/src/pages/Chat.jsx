import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { host, allUsersRoute } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from 'socket.io-client'


function Chat() {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const socket = useRef();

  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem('chat-app-user')) {
        navigate('/login');
      } else {
        const userFromLocalStorage = JSON.parse(localStorage.getItem('chat-app-user'));
        setCurrentUser(userFromLocalStorage);
        setIsLoaded(true);

        if (userFromLocalStorage.isAvatarImageSet) {
          try {
            const { data } = await axios.get(`${allUsersRoute}/${userFromLocalStorage._id}`);
            setContacts(data.users);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        } else {
          navigate('/setAvatar');
        }
      }
    };

    fetchData();
  }, [navigate]);

  useEffect( () => {
    if(currentUser){
      socket.current = io(host);
      socket.current.emit('add-user', currentUser._id)
    }
  }, [currentUser])

  const handleChangeChat = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="w-full h-screen bg-[#131324] flex justify-center items-center">
      <div className="bg-[#00000076] w-5/6 h-5/6 flex ">
        <div className='basis-1/4'>  
          <Contacts contacts={contacts} currentUser={currentUser} handleChangeChat={handleChangeChat} />
        </div>
        <div className='basis-3/4'>
          {
            isLoaded && currentChat===undefined ? 
            <Welcome currentUser={currentUser} /> : 
            <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
          }
        </div>
      </div>
    </div>
  );
}

export default Chat;
