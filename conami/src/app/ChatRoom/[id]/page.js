"use client";

import Sidebar from '../../Components/sidebar.js';
import BottomNav from '../../Components/BottomNav.js';
import React, { useEffect, useState, useCallback } from "react";
import ChatWindow from '../ChatWindow';
import ChatList from '../ChatList';
import { useAuth } from "../../Components/AuthContext";
import { useParams } from "next/navigation";

export default function ChatRoom() {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { username } = useAuth();
  const params = useParams();
  const routeChatId = Number(params.id);
  const activeChat = chats.find(chat => chat.id === activeChatId);

  const fetchChats = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:8000/conversations/full", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to get conversations");

      const data = await res.json();
      const formattedChats = data.map(conversation_message => ({
        id: conversation_message.id,
        name: (conversation_message.user1 !== username)
          ? conversation_message.user1
          : conversation_message.user2,
        messages: conversation_message.messages.map(msg => ({
          id: msg.id,
          username: msg.sender_username,
          content: msg.content,
          timestamp: new Date(msg.created_at).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          }),
        })),
      }));

      setChats(formattedChats);
      setLoading(false);
      return formattedChats;
    } catch (err) {
      setError("Error loading chats");
      setLoading(false);
      return [];
    }
  }, [username]);

  useEffect(() => {
    if (!routeChatId) return;
    setActiveChatId(routeChatId);
  }, [routeChatId]);

  useEffect(() => {
    if (!username) return;
    fetchChats();
    const interval = setInterval(() => {
      fetchChats();
    }, 2000);
    return () => clearInterval(interval);
  }, [username, fetchChats]);

  return (
    <div className="grid grid-cols-12 h-screen bg-white overflow-hidden">
      <div className="hidden md:block md:col-span-3 lg:col-span-2">
        <Sidebar />
      </div>
      <div className="col-span-12 md:col-span-9 lg:col-span-10 grid grid-cols-12 pb-16 h-full min-h-0">
        <div className="col-span-4 lg:col-span-3 border-r h-full min-h-0">
          <ChatList
            chats={chats}
            setActiveChatId={setActiveChatId}
            activeChatId={activeChatId}
          />
        </div>
        <div className="col-span-8 lg:col-span-9 h-full min-h-0">
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