import { FiArrowLeftCircle, FiSend } from "react-icons/fi";
import React, { useEffect, useState, useRef } from "react";

export default function ChatWindow({activeChat, setChats, setActiveChatId}) {
  const [input, setInput] =useState("");
  const messagesEnd = useRef(null);

  const handleSend = () => {
    if(!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      username: "You",
      content: input,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === activeChat.id
        ? {...chat, messages: [...chat.messages, newMessage]}
        : chat
      )
    );

    setInput("");
  };

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth"});
  }, [activeChat]);

  if(!activeChat){
    return (
      <div className="h-full flex items-center justify-center bg-white shadow-lg">
        <p className="text-gray-400 text-xl"> Select a chat to start messaging</p>
      </div>
    )
  }
  return (
        <div className="flex flex-col h-full bg-[#f0e1d1] shadow-lg">
          {/* GroupName */}

          <div className='p-4 flex items-center gap-3 bg-white'>
            <button onClick={() => setActiveChatId(null)}>
              <FiArrowLeftCircle size={20} className=" cursor-pointer"/>
            </button>
            <h2 className="font-semibold">{activeChat.name}</h2>
          </div>

          {/* messages */}
          <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-3">
            {activeChat.messages.map((msg, index) => (
              <div 
              key={`${activeChat.id}-${msg.id}-${index}`}
              className={`max-w-xs px-4 py-2 rounded-xl text-md ${
                msg.username === "You"
                ? "self-end bg-white text-[#63372c]"
                : "self-start bg-white text-[#63372c]"}`}>
                  <p>{msg.content}</p>
                  <span className="text-xs opacity-70 block mt-1">
                    {msg.timestamp}
                  </span>
              </div>
            ))}
            <div ref={messagesEnd}/>
          </div>
            
            {/* input */}
          <div className="mx-8 my-2 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={1}
              placeholder="Type a message..."
              onInput={(e) =>{
                e.target.style.height ="auto";
                e.target.style.height = e.target.scrollHeight + "px";
            }}
            className="w-full min-h-14 max-h-40 resize-none pl-6 pr-12 py-4 border-2 bg-white rounded-3xl focus:outline-none focus:ring-0 border-[#d4c3b0] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            onKeyDown={(e) =>{
              if(e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button 
          onClick={handleSend}
          className="absolute right-2 bottom-3 rounded-3xl border-0 p-2">
          <FiSend size ={30} />
          </button>
            </div>
          </div>
  );
}