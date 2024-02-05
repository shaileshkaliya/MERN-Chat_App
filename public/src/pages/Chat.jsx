import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { allUsersRoute } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';

function Chat() {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem('chat-app-user')) {
        navigate('/login');
      } else {
        const userFromLocalStorage = JSON.parse(localStorage.getItem('chat-app-user'));
        setCurrentUser(userFromLocalStorage);

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
            currentChat===undefined ? 
            currentUser && <Welcome currentUser={currentUser} /> : 
            currentUser && <ChatContainer currentUser={currentUser} />
          }
        </div>
      </div>
    </div>
  );
}

export default Chat;
