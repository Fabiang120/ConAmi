"use client";
import Sidebar from "../Components/sidebar.js";
import BottomNav from "../Components/BottomNav.js";
import { FiSend } from "react-icons/fi";
import React, { useEffect, useState, useRef } from "react";

export default function Profile() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [language, setLanguage] = useState("");
    const [country, setCountry] = useState("");
    const [gender, setGender] = useState("");
    return (
        <div className="grid grid-cols-12 min-h-screen">
            <div className="hidden md:block md:col-span-3 lg:col-span-2">
                <Sidebar />
            </div>
            <div className="col-span-12 md:col-span-9 lg:col-span-10 bg-[#f0e1d1] font-sans pb-16">
                <h1 className="text-3xl py-4 font-semibold mb-6 justify-center items-center leading-tight tracking-tight flex">
                    Self-Evaluation
                </h1>
                <div className="w-full max-w-5xl mx-auto space-y-8">
                    <div className="flex gap-6 justify-center">
                        <text>Compared to last evaluation, I feel more confident speaking Spanish/English:</text>
                        {/* <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}>
                            <option value="Disagree">Disagree</option>
                            </select> */}
                    </div>
                </div>
            </div>
            <BottomNav />
        </div>
    )
}