"use client";
import Link from "next/link";
import BottomNav from "../Components/BottomNav.js";
import Sidebar from "../Components/sidebar.js"
import { useState } from "react";
import { LuUser, LuKeyRound, LuShieldCheck, LuMail } from "react-icons/lu";
import { LuTriangleAlert } from "react-icons/lu";
import { RiCustomerService2Line } from "react-icons/ri";
import { LuMoon, LuType } from "react-icons/lu";

export default function Settings() {
    const [activeSection, setActiveSection] = useState("appearance");
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
    const [darkMode, setDarkMode] = useState(false);
    const [fontSize, setFontSize] = useState("medium");
    return (
        <div>
            <h2 className="text-[2rem] font-semibold leading-tight tracking-tight">Appearance Settings</h2>
            <p className="text-[1rem] font-normal leading-6">Customize the way ConAmi looks and feels for you.</p>
            <div className="flex flex-col lg:flex-row md:justify-between items-center gap-4 mt-5 bg-white/70 border-2 border-[#63372c] rounded-md px-2 py-2 md:h-24">
                <div className="flex justify-start items-center gap-4">
                    <LuMoon className="text-[#63372c]" size={40} />
                    <div>
                        <h3 className="text-[1.5rem] font-medium leading-tight tracking-tight">Dark Mode</h3>
                        <p className="text-[1rem] font-normal leading-6">Switch between light and dark appearance.</p>
                    </div>
                </div>
                <div>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`w-28 h-12 rounded-full px-2 flex items-center bg-[#63372c] ${darkMode ? "justify-end" : "justify-start"
                            }`}
                    >
                        <div className={`flex w-full justify-between items-center px-2 ${darkMode ? "flex-row" : "flex-row-reverse"}`}>
                            <span className="text-white text-sm font-medium">
                                {darkMode ? "On" : "Off"}
                            </span>
                            <span className="w-8 h-8 rounded-full bg-white block"></span>
                        </div>
                    </button>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row md:justify-between items-center gap-4 mt-5 bg-white/70 border-2 border-[#63372c] rounded-md px-2 py-2 md:h-24">
                <div className="flex justify-start items-center gap-4">
                    <LuType className="text-[#63372c]" size={40} />
                    <div>
                        <h3 className="text-[1.5rem] font-medium leading-tight tracking-tight">Font Size</h3>
                        <p className="text-[1rem] font-normal leading-6">Adjust text size for preference</p>
                    </div>
                </div>

                <div className="flex w-fit border-2 border-[#63372c] rounded-md  md:self-auto">
                    <button
                        onClick={() => setFontSize("small")}
                        className={`px-6 py-3 text-sm font-medium ${fontSize === "small"
                                ? "bg-[#63372c] text-white"
                                : "bg-white/70 text-[#63372c]"
                            }`}
                    >
                        Small
                    </button>
                    <button
                        onClick={() => setFontSize("medium")}
                        className={`px-6 py-3 text-sm font-medium border-l-2 border-r-2 border-[#63372c] ${fontSize === "medium"
                                ? "bg-[#63372c] text-white"
                                : "bg-white/70 text-[#63372c]"
                            }`}
                    >
                        Medium
                    </button>
                    <button
                        onClick={() => setFontSize("large")}
                        className={`px-6 py-3 text-sm font-medium ${fontSize === "large"
                                ? "bg-[#63372c] text-white"
                                : "bg-white/70 text-[#63372c]"
                            }`}
                    >
                        Large
                    </button>
                </div>
            </div>
        </div>
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
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                {/* This part will be on the top left of the main part */}
                <div className="flex flex-col justify-center items-center md:items-start gap-4">
                    <h2 className="text-[2rem] font-semibold leading-tight text-center tracking-tight">Blocked Users List</h2>
                    <p className="text-[1rem] font-normal text-center leading-6">Manage your blocked list to control who can interact with you.</p>
                </div>
                <div className="flex items-center gap-3 ">
                    <input
                        type="text"
                        placeholder="Search by username..."
                        className="flex-1 rounded-md py-2 text-center bg-white/70 border border-[#63372c] text-sm font-normal"
                    />
                    <button className="px-2 py-2 bg-[#63372c] text-white rounded-md text-sm font-medium">+ Add User</button>
                </div>
            </div>
            <p className="text-[1rem] font-normal leading-6 mt-5">Total Blocked: {blockedUsers.length} </p>
            {/* This part will be below the top part and will be a list of blocked users */}
            <div className="grid md:grid-cols-4 gap-4 mt-5 ">
                {blockedUsers.map((user) => (
                    <div
                        key={user.id}
                        className="h-40 bg-white/70 border-2 border-[#63372c] rounded-md p-4 flex flex-col justify-between"
                    >
                        <div>
                            <h3 className="text-[1.5rem] font-medium leading-tight tracking-tight">{user.username}</h3>
                        </div>
                        <p className="text-[1rem] font-normal leading-6 mt-2">
                            Note: {user.note}
                        </p>
                        <button className="w-40 h-9 px-4 py-2.5 bg-[#63372c] text-white rounded-md text-sm font-medium leading-none">
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
            <div className="flex flex-col justify-center items-center md:items-start">
                {/* This part will be on the top left of the main part */}
                <div>
                    <h2 className="text-[2rem] font-semibold leading-tight tracking-tight text-center md:text-start">Login Details Management</h2>
                    <p className="text-[1rem] font-normal leading-6 text-center md:text-start">Update and manage your primary account security settings</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 justify-items-center md:w-full md:justify-items-stretch">
                    <div className="inline-flex md:flex flex-col md:flex-row md:justify-between md:items-center bg-white/70 border-2 border-[#63372c] rounded-md px-4 py-3 mt-5 gap-4 w-50 md:w-full min-h-25">
                        <div className="flex justify-start items-center gap-4">
                            <LuUser className="text-[#63372c]" size={50} />
                            <div>
                                <h3 className="text-[1.5rem] font-medium leading-tight tracking-tight">Username</h3>
                                <p className="text-[1rem] font-normal leading-6">Info: {TimeSetUsername}</p>
                            </div>
                        </div>
                        <button className="w-40 h-9 px-4 py-2.5 bg-[#63372c] text-white rounded-md text-sm font-medium leading-none">Change Username</button>
                    </div>

                    <div className="inline-flex md:flex flex-col md:flex-row md:justify-between md:items-center bg-white/70 border-2 border-[#63372c] rounded-md px-4 py-3 mt-5 gap-4 w-50 md:w-full min-h-25">
                        <div className="flex justify-start items-center gap-4">
                            <LuKeyRound className="text-[#63372c]" size={50} />
                            <div>
                                <h3 className="text-[1.5rem] font-medium leading-tight tracking-tight">Password</h3>
                                <p className="text-[1rem] font-normal leading-6">Info: {TimeSetPassword}</p>
                            </div>
                        </div>
                        <button className="w-40 h-9 px-4 py-2.5 bg-[#63372c] text-white rounded-md text-sm font-medium leading-none">Update Password</button>
                    </div>

                    <div className="inline-flex md:flex flex-col md:flex-row md:justify-between md:items-center bg-white/70 border-2 border-[#63372c] rounded-md px-4 py-3 mt-5 gap-4 w-50 md:w-full min-h-25">
                        <div className="flex justify-start items-center gap-4">
                            <LuMail className="text-[#63372c]" size={50} />
                            <div>
                                <h3 className="text-[1.5rem] font-medium leading-tight tracking-tight">Email</h3>
                                <p className="text-[1rem] font-normal leading-6">Info: {TimeSetEmail}</p>
                            </div>
                        </div>
                        <button className="w-40 h-9 px-4 py-2.5 bg-[#63372c] text-white rounded-md text-sm font-medium leading-none">Change Email</button>
                    </div>

                    <div className="inline-flex md:flex flex-col md:flex-row md:justify-between md:items-center bg-white/70 border-2 border-[#63372c] rounded-md px-4 py-3 mt-5 gap-4 w-50 md:w-full min-h-25">
                        <div className="flex justify-start items-center gap-4">
                            <LuShieldCheck className="text-[#63372c]" size={50} />
                            <div>
                                <h3 className="text-[1.5rem] font-medium leading-tight tracking-tight">2FA</h3>
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
    return(
        <div>
            <h2 className="text-[2rem] font-semibold leading-tight tracking-tight">Get The Support You Need!</h2>
            <p className="text-[1rem] font-normal leading-6">We're here to help you with any questions or issues you may have.</p>
            <div className="flex flex-row items-start justify-center rounded-md gap-10 mt-10">
                <div className="flex flex-col justify-center items-center bg-white/70 border-2 border-[#63372c] rounded-md px-5 py-10">
                    <LuTriangleAlert className="text-[#63372c]" size={50} />
                    <h3 className="text-[1.5rem] font-medium leading-tight tracking-tight">Report a User</h3>
                    <p className="text-[1rem] font-normal leading-6">Search for a username to submit a Behavioral Report.</p>
                    <div className="flex items-center gap-3 mt-5">
                        <input
                            type="text"
                            placeholder="Find User to Report"
                            className="flex-1 rounded-md px-4 py-2 bg-white/70 border-2 border-[#63372c] text-sm font-normal"
                        />
                        <button className="px-4 py-2 bg-[#63372c] text-white rounded-md text-sm font-medium">Send Message</button>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center bg-white/70 border-2 border-[#63372c] rounded-md px-10 py-15">
                    <RiCustomerService2Line className="text-[#63372c]" size={50} />
                    <h3 className="text-[1.5rem] font-medium leading-tight tracking-tight">Chat with Support</h3>
                    <p className="text-[1rem] font-normal leading-6 mt-2">Send a message to our support team for assistance.</p>
                    <div className="mt-8 w-full max-w-[28rem]">
                        <textarea
                            placeholder="How can we assist you?"
                            className="w-full h-32 rounded-md px-4 py-3 bg-white/70 border-2 border-[#63372c] text-sm font-normal resize-none"
                        />
                        <button className="mt-4 w-full bg-[#63372c] text-white rounded-md text-sm font-medium py-3">
                            Send Message
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}