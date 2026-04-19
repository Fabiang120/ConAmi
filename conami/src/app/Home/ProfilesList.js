"use client";
import React, { useEffect, useState } from "react";
import { ProfileModal } from "./ProfileModal";
import { FiMessageSquare } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useAuth } from "../Components/AuthContext";

export default function ProfilesList() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const { username } = useAuth();
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

  useEffect(() => {
    if (!username) return;

    let mounted = true;

    const loadUsers = async () => {
      try {
        const res = await fetch(`${API_BASE}/users`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch users");

        const users = await res.json();

        if (mounted) {
          setProfiles(users.filter((p) => p.username !== username));
          setLoading(false);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    loadUsers();

    const intervalId = setInterval(() => {
      loadUsers();
    }, 5000);

    return () => {
      mounted = false;
      clearInterval(intervalId);
    };
  }, [username]);

  if (loading) return <div className="p-4 text-center font-semibold">Scanning for partners...</div>;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-y-10 gap-x-[75px] p-8">
        {profiles.map((profile, index) => (
          <div
            key={profile.username || index}
            onClick={() => setSelected(profile)}
            className="bg-white rounded-3xl shadow-lg p-6 min-w-0 hover:shadow-2xl transition flex flex-col justify-between cursor-pointer overflow-hidden"
          >
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-[#63372C] rounded-full flex-shrink-0"></div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-baseline gap-8">
                  <span className="text-2xl font-semibold break-words">{profile.username}</span>
                  <span className="text-gray-400 text-sm font-normal">
                    {profile.age ? `${profile.age} yrs` : "New User"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-10 mt-5 min-w-0">
              <div className="text-gray-600 mb-1 whitespace-normal min-w-0">
                <p className="text-xs text-gray-400 uppercase tracking-wider">Fluent</p>
                <p className="break-words">{profile.fluent || "—"}</p>
              </div>
              <div className="text-gray-600 mb-1 whitespace-normal min-w-0">
                <p className="text-xs text-gray-400 uppercase tracking-wider">Practice</p>
                <p className="break-words">{profile.practice || "—"}</p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-gray-500 mt-3 break-words">
                {profile.country ? `From ${profile.country}` : "Global"}
              </p>
              <span
                className="flex text-3xl mt-6 cursor-pointer text-[#63372C] hover:scale-110 transition-transform"
                onClick={(e) => {
                  e.stopPropagation();
                  startConversation(profile.username);
                }}
              >
                <FiMessageSquare />
              </span>
            </div>
          </div>
        ))}
      </div>

      <ProfileModal profile={selected} onClose={() => setSelected(null)} />
    </>
  );
}