"use client"
import Sidebar from '../Components/sidebar.js'
import { mockProfiles } from '../Profile/mockProfiles.js';
import {FiCheck, FiStar, FiUserCheck, FiUserPlus} from "react-icons/fi";
import {useState} from "react";

export default function Home() {
  // STARS
  const renderStars = (rating) => {
    if(typeof rating !== "number"){
      return <span className="text-gray-400 text-sm">No Reviews</span>;
    }
    return (
      <div className="flex text-xs items-center text-yellow-500">
        {Array.from({length: 5}).map((_, i)=> (
          <FiStar
          key={i}
          className={i < Math.round(rating) ? "fill-yellow-500" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };
  // ADDED USER
  const [addedUsers, setAdded] = useState({});
  const handleAdded = (id) => {
    setAdded(prev => ({ ...prev, [id]: !prev[id]}));
  };

  return (
    <div className="flex min-h-screen">
          <Sidebar/>
    <div className="flex-1 min-h-screen items-center justify-center font-sans bg-[#f0e1d1]">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-10">
            <h1 className="text-3xl font-semibold leading-10 tracking-tight">
            FIND YOUR
            <br/>LANGUAGE
            <br/>PARTNER.
          <span className="font-normal">
            <br/>FIND A
            <br/>FRIEND.
            </span>
          </h1>
            {mockProfiles.map((profile)=>(
              <div
              key={profile.id}
              className="bg-white rounded-3xl shadow-lg p-5 hover:shadow-xl transition flex flex-col justify-between "
        >
          <div className="flex gap-3">
            {/* PICTURE PLACEHOLDER*/}
            <div className="w-10 h-10 bg-[#63372C] rounded-full flex-shrink-0"></div>
            <div className="flex flex-col">
              
              <div className="flex items-baseline gap-8">
                <span className="text-2xl font-semibold">
                  {profile.username}
                </span>
                <span className="text-gray-400 text-sm font-normal">
                  {profile.age} yrs
                </span>
              </div>
              <span className="text-sm text-gray-500">
                {renderStars(profile.rating)}
              </span>

            </div>
          </div>
          <div className="flex items-center gap-10 mt-5">
            <p className="text-gray-600 mb-1">
              Fluent in:<br/> {profile.fluent}
            </p>

            <p className="text-gray-600 mb-1">
              To Practice:<br/> {profile.practice}
            </p>
          </div>
          <div className="flex justify-between items-center">
          <p className="text-gray-500 mt-3">
            From {profile.country}
          </p>
          <span className="flex text-3xl mt-6 cursor-pointer "
          onClick={() => handleAdded(profile.id)}
          >
          {addedUsers[profile.id] ? (<FiUserCheck/>) : (<FiUserPlus/>)}
          </span>
          </div>
        </div>
            ))}
          </div>
        </div>
    </div>
    </div>
  );
}