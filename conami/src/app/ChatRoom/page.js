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
    <div className="grid grid-cols-12 min-h-screen">

      {/* Sidebar */}
      <div className="col-span-12 md:col-span-3 lg:col-span-2">
        <Sidebar />
      </div>

      {/* Chat List */}
      <div className="col-span-12 md:col-span-3 lg:col-span-3">
        <ChatList
          chats={chats}
          setActiveChatId={setActiveChatId}
          activeChatId={activeChatId}
        />
      </div>

      {/* Chat Window */}
      <div className="col-span-12 md:col-span-6 lg:col-span-7">
        <ChatWindow
          activeChat={activeChat}
          setChats={setChats}
          setActiveChatId={setActiveChatId}
        />
      </div>
    </div>
  );
}