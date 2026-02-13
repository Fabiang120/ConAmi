"use client";
import Sidebar from '../Components/sidebar.js'
import { FiSend } from "react-icons/fi";
import React, { useEffect, useState, useRef } from "react";
import { mockMessages } from './mockmessages.js';
import ChatWindow from './ChatWindow';
import ChatList from './ChatList';

export default function ChatRoom() {
    const[chats, setChats] = useState(mockMessages);
    const [activeChatId, setActiveChatId] = useState(null);
  
    const activeChat = chats.find(chat => chat.id === activeChatId);
  return (
    <div className="flex h-screen  overflow-hidden">
          <Sidebar/>
          
            <ChatList
            chats={chats}
            setActiveChatId = {setActiveChatId}
            activeChatId ={activeChatId}/>

            <ChatWindow
            activeChat={activeChat}
            setChats={setChats}
            setActiveChatId={setActiveChatId}/>
    </div>
  );
}