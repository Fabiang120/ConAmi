"use client";
import Sidebar from '../Components/sidebar.js'
import { FiSend } from "react-icons/fi";
import React from "react";

export default function ChatRoom() {
  // const [message, setMessage] = React.useState("");
  // const handleSend = () => {
  //   if(!message.trim()) return;
  //   onSend(message);
  //   setMessage("");
  // }
  return (
    <div className="flex min-h-screen bg-[#f0e1d1]">
          <Sidebar/>
          <div className="flex-1 flex flex-col justify-end">
            <div className="m-8 relative">
          <textarea
            //value={message}
            // onChange={(e) => setMessage(e.target.value)}
            rows={1}
            placeholder="Type a message..."
            onInput={(e) =>{
              e.target.style.height ="auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
            className="w-full min-h-14 max-h-40 resize-none pl-6 pr-12 py-4 border-2 bg-white rounded-3xl focus:outline-none focus:ring-0 border-[#d4c3b0] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            // onKeyDown={(e) =>{
            //   if(e.key === "Enter" && !e.shiftKey) {
            //     e.preventDefault();
            //     handleSend;
            //   }
            // }}
          />
          <button 
          // onClick={handleSend}
          className="absolute right-2 bottom-3 rounded-3xl border-0 p-2">
          <FiSend size ={30} />
          </button>
            </div>
          </div>
    </div>
  )
}