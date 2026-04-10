"use client";
import React, { useEffect, useState } from "react";
import { ProfileModal } from "./ProfileModal";
import { FiStar, FiMessageSquare } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function ProfilesList() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [current, setCurrent] = useState(null);
  const router = useRouter();


  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try{
        setLoading(true);
        const meRes = await fetch("http://localhost:8000/auth/me",{
          credentials: "include",
        })
        const meData = await meRes.json();
        const username = meData.username;

        const userRes = await fetch("http://localhost:8000/users/", {
          credentials: "include",
        })
        if (!userRes.ok) throw new Error("Network error");
        
        const users = await userRes.json();
        console.log("USERS FROM BACKEND:", users);
      
        if (mounted) {
          setCurrent(username);
          setProfiles(users.filter(p => p.username !== username));
        }
      } catch(err) {
        console.error(err);
        if (mounted) setProfiles([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div className="p-4">Loading profiles...</div>;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-75 p-8">
        {profiles.map((profile) => (
          <div
            key={profile.username}
            onClick={() => setSelected(profile)}
            className="bg-white rounded-3xl shadow-lg p-6 min-w-[250px] shadow-xl hover:shadow-2xl transition flex flex-col justify-between cursor-pointer"
          >
            <div className="flex gap-3">
              {/* PICTURE PLACEHOLDER */}
              <div className="w-10 h-10 bg-[#63372C] rounded-full flex-shrink-0"></div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-8">
                  <span className="text-2xl font-semibold">{profile.username}</span>
                  <span className="text-gray-400 text-sm font-normal">{profile.age} yrs</span>
                </div>
                {/* <span className="text-sm text-gray-500">{renderStars(profile.rating)}</span> */}
              </div>
            </div>

            <div className="flex items-center gap-10 mt-5">
              <p className="text-gray-600 mb-1">
                Fluent in:<br /> {profile.fluent}
              </p>
              <p className="text-gray-600 mb-1">
                To Practice:<br /> {profile.practice}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-gray-500 mt-3">From {profile.country}</p>
              <span
                className="flex text-3xl mt-6 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/chat?user=${profile.username}`);
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