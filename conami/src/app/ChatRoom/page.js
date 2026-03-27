"use client";
import Sidebar from '../Components/sidebar.js';
import BottomNav from '../Components/BottomNav.js';
import { FiSend } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { mockMessages } from './mockmessages.js';
import ChatWindow from './ChatWindow';
import ChatList from './ChatList';
import { useAuth } from "../Components/AuthContext";
import { useSearchParams } from 'next/navigation.js';

export default function ChatRoom() {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [Error, setError] = useState("");
  const activeChat = chats.find(chat => chat.id === activeChatId);
  const { token } = useAuth();
  const handleStart = async () => {
    // Sends token that all screens have as its created by either login or sign up 
    // Sends token to auth/me and gets the user's username
    const res = await fetch(`http://localhost:8000/auth/me`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    if (!res.ok) {
      setError("Failed to authenticate user");
      return;
    }
    const data = await res.json();
    const res2 = await fetch(`http://localhost:8000/conversations/full?username=${data.username}`, {
      method: "GET"
    });
    if (!res2.ok) {
      setError("Failed to get conversatinos for user");
      return;
    }
    const data2 = await res2.json();
    // Res 2 here is a list of objects, where it consists of
    // conversation id, user1, user2, created_at convo, list of messages objects
    // Messages objects have message id, conversation id, sender username, content, created at for message
    const formattedchats = data2.map(conversation_message => ({
      id: conversation_message.id,
      name: (conversation_message.user1 != data.username) ? conversation_message.user1 : conversation_message.user2,
      messages: conversation_message.messages
    }));
    setChats(formattedchats);
  }
  useEffect(() => {
    handleStart();
  },[])

  //From connection from home message button to chat
  const searchParams = useSearchParams();
  const targetUser = searchParams.get("user");
  
  useEffect (() => {
      if(!targetUser || chats.length === 0)
          return;
      const foundChat = chats.find(chat => chat.name === targetUser);
      if(foundChat){
          setActiveChatId(foundChat.id);
      }
  }, [targetUser, chats]);

  return (
    <div className="grid grid-cols-12 min-h-screen">
      <div className="hidden md:block md:col-span-3 lg:col-span-2">
        <Sidebar />
      </div>
      <div className="col-span-12 md:col-span-9 lg:col-span-10 grid grid-cols-12 pb-16">
        <div className="col-span-4 lg:col-span-3 border-r">
          <ChatList
            chats={chats}
            setActiveChatId={setActiveChatId}
            activeChatId={activeChatId}
          />
        </div>
        <div className="col-span-8 lg:col-span-9">
          <ChatWindow
            activeChat={activeChat}
            setChats={setChats}
            setActiveChatId={setActiveChatId}
          />
        </div>
      </div>
      <BottomNav />
    </div>
  );
}