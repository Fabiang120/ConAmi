"use client";
import { useState } from "react";

export default function Profile(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    return(
        <div className="flex-1 min-h-screen items-center justify-center font-sans bg-[#f0e1d1]">
            <h1 className="text-3xl font-semibold mb-6 justify-center items-center flex">
                Create your profile
            </h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-brown-400"
            />
            <input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-brown-400"
            />
        </div>
    )
}