"use client"
import Sidebar from '../Components/sidebar.js';
import BottomNav from '../Components/BottomNav.js';
import ProfilesList from './ProfilesList.js'; // default import is correct
import {ProfileModal} from './ProfileModal.js';
import { FiStar, FiUserCheck, FiUserPlus, FiMessageSquare } from "react-icons/fi";
import { useState } from "react";
import { useRouter } from 'next/navigation.js';

export default function Home() {
  const renderStars = (rating) => {
    if (typeof rating !== "number") {
      return <span className="text-gray-400 text-sm">No Reviews</span>;
    }
    return (
      <div className="flex text-xs items-center text-yellow-500">
        {Array.from({ length: 5 }).map((_, i) => (
          <FiStar
            key={i}
            className={i < Math.round(rating) ? "fill-yellow-500" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  // ADDED USER - add notification feature later
  const [addedUsers, setAdded] = useState({});
  const handleAdded = (id) => {
    setAdded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // PROFILE SELECTION (optional if you want centralized modal)
  const [selectedProfile, setSelectedProfile] = useState(null);

  const router = useRouter();

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1 min-h-screen items-center justify-center font-sans bg-[#f0e1d1] pb-16">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-10">
            <h1 className="text-3xl font-semibold leading-10 tracking-tight">
              FIND YOUR
              <br />LANGUAGE
              <br />PARTNER.
              <span className="font-normal">
                <br />FIND A
                <br />FRIEND.
              </span>
            </h1>

            {/* Render the profiles list component directly */}
            <ProfilesList />
            
          </div>
          {selectedProfile && (
            <ProfileModal
              profile={selectedProfile}
              onClose={() => setSelectedProfile(null)}
            />
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}