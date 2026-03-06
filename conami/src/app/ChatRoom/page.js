"use client";
import Sidebar from '../Components/sidebar.js';
import BottomNav from '../Components/BottomNav.js';
import { FiSend } from "react-icons/fi";
import React, { useEffect, useState, useRef } from "react";
import { mockMessages } from './mockmessages.js';
import ChatWindow from './ChatWindow';
import ChatList from './ChatList';
export default function ChatRoom() {
  const [chats, setChats] = useState(mockMessages);
  const [activeChatId, setActiveChatId] = useState(null);
  const activeChat = chats.find(chat => chat.id === activeChatId);
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