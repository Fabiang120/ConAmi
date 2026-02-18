"use client";
import Sidebar from '../Components/sidebar.js'
import { FiSend } from "react-icons/fi";
import React, { useEffect, useState, useRef } from "react";

export default function Profile(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [language, setLanguage] = useState("");
    const [country, setCountry] = useState("");
    const [gender, setGender] = useState("");

    return(
    <div className="flex h-screen  overflow-hidden">
        <Sidebar/>
        <div className="flex-1 min-h-screen items-center justify-center font-sans bg-[#f0e1d1]">
            <h1 className="text-3xl py-4 font-semibold mb-6 justify-center items-center flex">
                Create your profile
            </h1>
            <div className="w-full max-w-5xl mx-auto space-y-8">
                <div className="flex gap-6 justify-center">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="px-4 py-2 rounded-lg border border-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-brown-400"
                    />
                    <input
                        type="text"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-4 py-2 rounded-md border border-gray-400 bg-white  focus:outline-none focus:ring-2 focus:ring-brown-400"
                    />
                </div>
                <div className="flex gap-6 justify-center">
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-1/3 px-4 py-3 rounded-lg border border-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-[#63372c]"
                    >
                    <option value="">Language you want to practice?</option>
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    </select>
                    <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-1/3 px-4 py-3 rounded-lg border border-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-[#63372c]"
                    >
                        <option value="">Your Country</option>
                        <option value="argentina">Argentina</option>
                        <option value="australia">Australia</option>
                        <option value="bolivia">Bolivia</option>
                        <option value="canada">Canada</option>
                        <option value="chile">Chile</option>
                        <option value="colombia">Colombia</option>
                        <option value="costa-rica">Costa Rica</option>
                        <option value="cuba">Cuba</option>
                        <option value="dominican-republic">Dominican Republic</option>
                        <option value="ecuador">Ecuador</option>
                        <option value="el-salvador">El Salvador</option>
                        <option value="equatorial-guinea">Equatorial Guinea</option>
                        <option value="guatemala">Guatemala</option>
                        <option value="honduras">Honduras</option>
                        <option value="ireland">Ireland</option>
                        <option value="mexico">Mexico</option>
                        <option value="new-zealand">New Zealand</option>
                        <option value="nicaragua">Nicaragua</option>
                        <option value="panama">Panama</option>
                        <option value="peru">Peru</option>
                        <option value="puerto-rico">Puerto Rico</option>
                        <option value="south-africa">South Africa</option>
                        <option value="spain">Spain</option>
                        <option value="uk">United Kingdom</option>
                        <option value="usa">United States</option>
                        <option value="uruguay">Uruguay</option>
                        <option value="venezuela">Venezuela</option>
                        <option value="other">Other</option>
                        </select>
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-1/3 px-4 py-3 rounded-lg border border-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-[#63372c]"
                    >
                        <option value="">Your Gender (Optional)</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="other">Other</option>
                        </select>
                        
                </div>
                <div className = "flex justify-center">
                    <button className="px-5 py-3 bg-[#63372c] text-white rounded-lg hover:bg-[#4a2a20] focus:outline-none focus:ring-2 focus:ring-[#63372c]">
                        Save Profile
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}