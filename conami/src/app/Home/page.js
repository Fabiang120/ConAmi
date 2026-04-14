"use client"
import Sidebar from '../Components/sidebar.js';
import BottomNav from '../Components/BottomNav.js';
import ProfilesList from './ProfilesList.js';
import { useState } from "react";
import { useRouter } from 'next/navigation.js';

export default function Home() {
  const [addedUsers, setAdded] = useState({});
  const handleAdded = (id) => {
    setAdded(prev => ({ ...prev, [id]: !prev[id] }));
  };

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
            <div className="col-span-1 sm:col-span-1 lg:col-span-3 xl:col-span-3">
              <ProfilesList />
            </div>

          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}