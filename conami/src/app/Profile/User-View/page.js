"use client";
import Sidebar from "../../Components/sidebar.js";
import BottomNav from "../../Components/BottomNav.js";
import { FiPlusCircle, FiEdit2, FiUser, FiGlobe, FiBookOpen, FiStar } from "react-icons/fi";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import{ mockUser } from "./mockUser.js";

export default function ProfileView() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const UppercaseVar = (str) => {
    if(!str) return "-"
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleEditClick = () =>{
    router.push("/Profile/User-View/profile-edit")
  };
//Fetching user
   useEffect(() => {
     const fetchUser =async () => {
       try{
        const userRes = await fetch("http://localhost:8000/auth/me", {
          credentials: "include"
         });
         if(!userRes.ok) throw new Error("Failed to fetch user");
         const userData = await userRes.json();

         let profileData = {};
          
        const profileRes = await fetch("http://localhost:8000/profile", {
          credentials: "include",
         });

         if(profileRes.ok){
          profileData = await profileRes.json();
         }
         setUser({
          ...userData,
          ...profileData,
         });

         if(profileData?.image){
          setImage(profileData.image);
         }

       } catch (err){
         console.error(err);
       }
     };

     fetchUser();
   }, []);

    if(!user) return <div>Loading...</div>;
//clicking
   const handlePlusClick = () =>{
    fileInputRef.current.click();
   };

   const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if(!file) return;
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "Profile_Images");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dwaj95bl4/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      const imageUrl = data.secure_url;
      setImage(imageUrl);

      setUser((prev) => ({
            ...prev,
      }));

      await fetch("http://localhost:8000/profile", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({
          image: imageUrl,
        }),
      });
    } catch (err){
      console.error("image uplaod failed:", err);
    }
    };
    
    return (
            <div className="grid grid-cols-12 min-h-screen bg-[#F5E6D3]">
      <div className="hidden md:block md:col-span-3 lg:col-span-2">
        <Sidebar />
      </div>

      <div className="col-span-12 md:col-span-9 lg:col-span-10 ">
        <div className="bg-[#63372C] h-32 relative">

          <FiEdit2 
          size={30} 
          className="absolute right-3  mt-3 text-white cursor-pointer hover:scale-110 transform transition-transform"
          onClick={handleEditClick}/>

          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-14">
            <div className="w-40 h-40 bg-white rounded-full shadow-md relative flex items-center justify-center text-gray-4xl overflow-hidden">
              {image ? (
                <img 
                src={image} 
                alt="Profile" 
                className="w-full h-full object-cover"/>
              ) : (
                <FiUser size={120} className="text-gray-400"/>
              )}
              </div>
              <div className="absolute -bottom-1 right-6 bg-[#63372C] w-6 h-6 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer hover:scale-110 transform transition-transform z-10"
              onClick={handlePlusClick}>
                <FiPlusCircle size={25} />
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}/>
            </div>
          </div>



        <div className="text-center mt-16 space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">{user.username}</h1>
          <p className=" text-sm">{user.email}</p>
          <p className=" text-sm">{UppercaseVar(user.gender) || "-"} • {user.age ?? "-"}</p>
        </div>

      <div className="mt-8 px-4 sm:px-10">
  {/* Grid container */}
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start text-center">
    
    {/* Left Box - Fluent In */}
    <div className="flex flex-col items-center gap-1">
      <FiStar size={30} className="text-yellow-500"/>
      <p className="text-lg font-semibold truncate">{UppercaseVar(user.fluent)}</p>
      <p className="text-xs tracking-wide truncate">FLUENT IN</p>
    </div>

    {/* Middle Box - Practicing */}
    <div className="flex flex-col items-center gap-1">
      <FiBookOpen size={30} className="text-blue-500"/>
      <p className="text-lg font-semibold">{UppercaseVar(user.practice)}</p>
      
      <p className="text-xs tracking-wide">PRACTICING</p>
    </div>

    {/* Right Box - Country */}
    <div className="flex flex-col items-center gap-1">
      <FiGlobe size={30} className="text-green-700"/>
      <p className="text-lg font-semibold truncate">{UppercaseVar(user.country)}</p>
      <p className="text-xs tracking-wide truncate">COUNTRY</p>
    </div>
    
  </div>

  {/* Optional separators using absolute lines (desktop only) */}
  <div className="hidden sm:block relative mt-[-4rem]">
    <div className="absolute left-1/3 top-4 w-[2px] bg-[#63372ca1] h-16"></div>
    <div className="absolute left-2/3 top-4 w-[2px] bg-[#63372ca1] h-16"></div>
  </div>
</div>
    </div>

      <BottomNav />
    </div>
    );
}