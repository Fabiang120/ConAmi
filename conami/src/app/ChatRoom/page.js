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
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Chat Area */}
      <div className="flex-1 grid grid-cols-12">

        {/* Chat List */}
        <div className="col-span-4 lg:col-span-3 border-r">
          <ChatList
            chats={chats}
            setActiveChatId={setActiveChatId}
            activeChatId={activeChatId}
          />
        </div>

        {/* Chat Window */}
        <div className="col-span-8 lg:col-span-9">
          <ChatWindow
            activeChat={activeChat}
            setChats={setChats}
            setActiveChatId={setActiveChatId}
          />
        </div>

      </div>
    </div>
  );
}