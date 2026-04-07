"use client";
import Link from "next/link";
import BottomNav from "../Components/BottomNav.js";
import Sidebar from "../Components/sidebar.js"
import { useState } from "react";
import { LuUser, LuKeyRound, LuShieldCheck, LuMail } from "react-icons/lu";

export default function Settings() {
    const [activeSection, setActiveSection] = useState("Appearance");
    return (
        <div className="grid grid-cols-12 min-h-screen">
            <div className="hidden md:block md:col-span-3 lg:col-span-2">
                <Sidebar />
            </div>
            <div className="col-span-12 md:col-span-9 lg:col-span-10 bg-[#f0e1d1] font-sans px-8">
                <div className="flex items-center py-6">
                    <h1 className="text-2xl font-bold">Settings</h1>
                </div>
                <ul className="ml-2 flex space-x-4 text-[#63372c]/80 text-base">
                    <li className="cursor-pointer hover:text-[#63372c]">
                        <button
                            onClick={() => setActiveSection("appearance")}>
                            Appearance
                        </button>
                    </li>
                    <li className="cursor-pointer hover:text-[#63372c]">
                        <button
                            onClick={() => setActiveSection("blocked")}>
                            Blocked Users
                        </button>
                    </li>
                    <li className="cursor-pointer hover:text-[#63372c]">
                        <button
                            onClick={() => setActiveSection("login")}>
                            Login Details
                        </button>
                    </li>
                    <li className="cursor-pointer hover:text-[#63372c]">
                        <button
                            onClick={() => setActiveSection("help")}>
                            Help Center
                        </button>
                    </li>
                </ul>
                <main className="p-15">
                    {activeSection === "appearance" && <AppearanceSection />}
                    {activeSection === "blocked" && <BlockedUsersSection />}
                    {activeSection === "login" && <LoginDetailsSection />}
                    {activeSection === "help" && <HelpCenterSection />}
                </main>
            </div>
            <BottomNav />
        </div>
    )
}

function AppearanceSection() {
    return (
        <div>
            <h2>Appearance</h2>
            {/* Change App UI to Dark Mode */}
            {/* Make Chat Font larger */}
        </div >
    );
}
function BlockedUsersSection() {
    const [blockedUsers, setBlockedUsers] = useState([
        { id: 1, username: "user1", note: "Repeated offensive language" },
        { id: 2, username: "user2", note: "Spamming in comments" },
        { id: 3, username: "user3", note: "Harassment in messages" },
    ]);
    return (
        <div>
            <div className="flex justify-between items-center">
                {/* This part will be on the top left of the main part */}
                <div>
                    <h2 className="text-3xl font-semibold tracking-tight">Blocked Users List</h2>
                    <p className="text-sm font-normal leading-5">Manage your blocked list to control who can interact with you.</p>
                </div>
                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        placeholder="Search by username..."
                        className="flex-1 rounded-md px-4 py-2 bg-white/70 border border-[#63372c] text-sm font-normal"
                    />
                    <button className="px-4 py-2 bg-[#63372c] text-white rounded-md text-sm font-medium">+ Add User</button>
                </div>
            </div>
            <p className="text-sm font-medium mt-4">Total Blocked: {blockedUsers.length} </p>
            {/* This part will be on the top right of the main part = search bar */}
            {/* This part will be below the top part and will be a list of blocked users */}
            <div className="grid grid-cols-4 gap-4 mt-5">
                {blockedUsers.map((user) => (
                    <div
                        key={user.id}
                        className="h-40 bg-white/70 border-[#63372c] border-2 rounded-md p-4 flex flex-col justify-between"
                    >
                        <div>
                            <h3 className="text-lg font-medium tracking-tight">{user.username}</h3>
                        </div>
                        <p className="text-sm font-normal leading-5 mt-2">
                            Note: {user.note}
                        </p>
                        <button className="w-full flex items-center justify-start border border-[#63372c] rounded-md px-4 py-2 text-sm font-normal mt-4">
                            Unblock
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

function LoginDetailsSection() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [TimeSetUsername, setTimeSetUsername] = useState(null);
    const [TimeSetPassword, setTimeSetPassword] = useState(null);
    const [TimeSetEmail, setTimeSetEmail] = useState(null);
    const [twofa, settwofa] = useState(false);

    return (
        <div>
            <div className="flex flex-col justify-center items-start">
                {/* This part will be on the top left of the main part */}
                <div>
                    <h2 className="text-[2rem] font-semibold leading-tight tracking-tight">Login Details Management</h2>
                    <p className="text-[1rem] font-normal leading-6">Update and manage your primary account security settings</p>
                </div>
                <div className="grid grid-cols-1 gap-2 w-full">
                    <div className="flex justify-between items-center border-2 border-[#63372c] bg-white/70 rounded-md px-4 py-3 mt-5 min-h-25">
                        <div className="flex justify-start items-center gap-4">
                            <LuUser className="text-[#63372c]" size={50} />
                            <div>
                                <h3 className="text-[1.5rem] font-medium leading-tight tracking-tight">Username</h3>
                                <p className="text-[1rem] font-normal leading-6">Info: {TimeSetUsername}</p>
                            </div>
                        </div>
                        <button className="w-40 h-9 px-4 py-2.5 bg-[#63372c] text-white rounded-md text-sm font-medium leading-none">Change Username</button>
                    </div>

                    <div className="flex justify-between items-center border-2 border-[#63372c] bg-white/70  rounded-md px-4 py-3 mt-5 min-h-25">
                        <div className="flex justify-start items-center gap-4">
                            <LuKeyRound className="text-[#63372c]" size={50} />
                            <div>
                                <h3 className="text-[1.5rem] font-medium leading-tight tracking-tight">Password</h3>
                                <p className="text-[1rem] font-normal leading-6">Info: {TimeSetPassword}</p>
                            </div>
                        </div>
                        <button className="w-40 h-9 px-4 py-2.5 bg-[#63372c] text-white rounded-md text-sm font-medium leading-none">Update Password</button>
                    </div>

                    <div className="flex justify-between items-center border-2 border-[#63372c] bg-white/70  rounded-md px-4 py-3 mt-5 min-h-25">
                        <div className="flex justify-start items-center gap-4">
                            <LuMail className="text-[#63372c]" size={50} />
                            <div>
                                <h3 className="text-[1.5rem] font-medium leading-tight tracking-tight">Email</h3>
                                <p className="text-[1rem] font-normal leading-6">Info: {TimeSetEmail}</p>
                            </div>
                        </div>
                        <button className="w-40 h-9 px-4 py-2.5 bg-[#63372c] text-white rounded-md text-sm font-medium leading-none">Change Email</button>
                    </div>

                    <div className="flex justify-between items-center border-2 border-[#63372c] bg-white/70  rounded-md px-4 py-3 mt-5 min-h-25">
                        <div className="flex justify-start items-center gap-4">
                            <LuShieldCheck className="text-[#63372c]" size={50} />
                            <div>
                                <h3 className="text-[1.5rem] font-medium leading-tight tracking-tight">Two-Factor Authentication (2FA)</h3>
                                <p className="text-[1rem] font-normal leading-6">Info: {twofa ? "Enabled" : "Disabled"}</p>
                            </div>
                        </div>
                        <button className="w-40 h-9 px-4 py-2.5 bg-[#63372c] text-white rounded-md text-sm font-medium leading-none">
                            Manage 2FA
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function HelpCenterSection() {
    return (
        <div>
            <h2>Help Center</h2>
            {/* Report User search bar possibly button too */}
            {/* Chat with support text box */}
        </div>
    );

}