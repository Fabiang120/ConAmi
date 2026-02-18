export default function ChatList({chats, setActiveChatId, activeChatId}) {
    return (
        <div className="w-70 h-full  overflow-y-auto ">
            <h1 className="text-2xl font-bold p-6">Messages</h1>
            {chats.map(chat=> {
                const lastMes = chat.messages[chat.messages.length-1]
                const isActive = chat.id === activeChatId;
                return (
                <div 
                key={chat.id}
                onClick={() => setActiveChatId(chat.id)}
                className={`
                    p-4 mb-3 cursor-pointer border-transparent
                    ${isActive 
                        ? "bg-[#f0e1d1] text-[#63372c] shadow" 
                        : "bg-white text-[#63372c] "}
                    hover:bg-[#f0e1d1] hover:shadow duration-200
                    `}
                >
                    <div className="flex justify-between items-center">
                        <h2 className="font-semibold text-md">
                            {chat.name}
                        </h2>
                    <span className="text-xs text-[#874B3D]">
                        {lastMes?.timestamp}
                    </span>
                </div>
                </div>
                );
            })}
        </div>
    );

}