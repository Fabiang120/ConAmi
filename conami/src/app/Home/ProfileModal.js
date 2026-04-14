"use client";
import { FiMessageSquare } from "react-icons/fi";
import { useRouter } from 'next/navigation.js';

export function ProfileModal({ profile, onClose }) {
  if (!profile) return null;
  const router = useRouter();
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "/api";
  const startConversation = async (profileUsername) => {
    try {
      const res = await fetch(`${API_BASE}/conversations`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user2: profileUsername }),
      });
      if (!res.ok) throw new Error("Failed to start conversation");
      const data = await res.json();
      router.push(`/ChatRoom/${data.id}`);
    } catch (err) {
      console.error("Error starting conversation:", err);
    }
  };
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-xl p-8 w-[500px] max-w-[90%] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 cursor-pointer text-xl font-bold"
          onClick={onClose}
        >✕</button>

        <div className="bg-[#63372C] h-32"></div>

        <div className="flex justify-center">
          <div className="w-28 h-28 bg-white rounded-full -mt-14 border-4 border-white shadow-md"></div>
        </div>

        <div className="text-center mt-3 space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">{profile.username}</h1>
          <p className="text-gray-400 text-sm">{profile.email}</p>
          <p className="text-gray-500 text-sm">{profile.gender} • {profile.age} yrs</p>
        </div>

        <div className="flex justify-between items-stretch mt-8 px-8 text-center">
          <div className="flex flex-col items-center justify-center gap-1">
            <p className="text-lg font-semibold">{profile.fluent}</p>
            <p className="text-xs text-gray-400 tracking-wide">FLUENT IN</p>
          </div>
          <div className="w-[2px] bg-gray-200 self-stretch"></div>
          <div className="flex flex-col items-center justify-center gap-1">
            <p className="text-lg font-semibold">{profile.practice}</p>
            <p className="text-xs text-gray-400 tracking-wide">PRACTICING</p>
          </div>
          <div className="w-[2px] bg-gray-200 self-stretch"></div>
          <div className="flex flex-col items-center justify-center gap-1">
            <p className="text-lg font-semibold">{profile.country}</p>
            <p className="text-xs text-gray-400 tracking-wide">COUNTRY</p>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            className="flex items-center gap-2 text-xl mt-6 p-3 text-white bg-[#63372C] rounded-2xl cursor-pointer transform transition-transform duration-200 hover:scale-105"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
              startConversation(profile.username);
            }}
          >
            Start Chatting! <FiMessageSquare />
          </button>
        </div>
      </div>
    </div>
  );
}