"use client";

import Sidebar from '../Components/sidebar.js';
import BottomNav from '../Components/BottomNav.js';
import React, { useEffect, useState, useCallback } from "react";
import ChatWindow from './ChatWindow';
import ChatList from './ChatList';
import { useAuth } from "../Components/AuthContext";
import { useSearchParams } from 'next/navigation.js';

export default function ChatRoom() {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { username } = useAuth();
  const searchParams = useSearchParams();
  const targetUser = searchParams.get("user");

  const activeChat = chats.find(chat => chat.id === activeChatId);

  const fetchChats = useCallback(async () => {
    if (!username) return;
    try {
      const res = await fetch(`http://localhost:8000/conversations/full?username=${encodeURIComponent(username)}`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to get conversations");

      const data = await res.json();
      const formattedchats = data.map(conversation_message => ({
        id: conversation_message.id,
        name: (conversation_message.user1 !== username) ? conversation_message.user1 : conversation_message.user2,
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
      setChats(formattedchats);
      setLoading(false);
      return formattedchats;
    } catch (err) {
      setError("Error loading chats");
      setLoading(false);
      return [];
    }
  }, [username]);

  useEffect(() => {
    if (!username) return;
    fetchChats();
    const interval = setInterval(() => {
      fetchChats();
    }, 2000);
    return () => clearInterval(interval);
  }, [username, fetchChats]);

  useEffect(() => {
    if (!targetUser || !username || loading) return;

    const startConversation = async () => {
      const existingChat = chats.find(chat => chat.name === targetUser);
      if (existingChat) {
        setActiveChatId(existingChat.id);
      } else {
        try {
          const res = await fetch(`http://localhost:8000/conversations?username=${encodeURIComponent(username)}`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user2: targetUser })
          });

          if (res.ok) {
            const newConvo = await res.json();
            await fetchChats();
            setActiveChatId(newConvo.id);
          }
        } catch (err) {
          console.error(err);
          setError("Error starting conversation");
        }
      }
    };

    startConversation();
  }, [targetUser, username, loading, chats, fetchChats]);

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