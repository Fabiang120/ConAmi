"use client";

import React, { useState, useEffect } from "react";
import BottomNav from "../Components/BottomNav.js";
import Sidebar from "../Components/sidebar.js"
import { RiCustomerService2Line } from "react-icons/ri";
import { LuUser, LuKeyRound, LuShieldCheck, LuMail, LuTriangleAlert/*, LuMoon, LuType*/ } from "react-icons/lu";

export default function Settings() {
    const [activeSection, setActiveSection] = useState("blocked");
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
                    {/*
                    <li className="cursor-pointer hover:text-[#63372c]">
                        <button onClick={() => setActiveSection("appearance")}>
                            Appearance
                        </button>
                    </li>
                    */}
                    <li className="cursor-pointer hover:text-[#63372c]">
                        <button onClick={() => setActiveSection("blocked")}>
                            Blocked Users
                        </button>
                    </li>
                    <li className="cursor-pointer hover:text-[#63372c]">
                        <button onClick={() => setActiveSection("login")}>
                            Login Details
                        </button>
                    </li>
                    <li className="cursor-pointer hover:text-[#63372c]">
                        <button onClick={() => setActiveSection("help")}>
                            Help Center
                        </button>
                    </li>
                </ul>
                <main className="p-15">
                    {/* {activeSection === "appearance" && <AppearanceSection />} */}
                    {activeSection === "blocked" && <BlockedUsersSection />}
                    {activeSection === "login" && <LoginDetailsSection />}
                    {activeSection === "help" && <HelpCenterSection />}
                </main>
            </div>
            <BottomNav />
        </div>
    )
}

/*
function AppearanceSection() {
    const [darkMode, setDarkMode] = useState(false);
    const [fontSize, setFontSize] = useState("medium");
    return (
        <div className="flex flex-col items-center md:items-stretch w-full">
            <div className="flex flex-col justify-center items-center lg:items-start">
                <h2 className="text-[2rem] font-semibold leading-tight tracking-tight">Appearance Settings</h2>
                <p className="text-[1rem] font-normal leading-6">Customize the way ConAmi looks and feels for you.</p>
            </div>
            <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-4 mt-5 bg-white/70 border-2 border-[#63372c] rounded-md px-2 py-2 md:h-40 w-full max-w-175 md:max-w-none">
                <div className="flex justify-start items-center gap-4">
                    <LuMoon className="text-[#63372c] shrink-0" size={40} />
                    <div>
                        <h3 className="text-[1.5rem] font-medium leading-tight tracking-tight">Dark Mode</h3>
                        <p className="text-[1rem] font-normal leading-6">Switch between light and dark appearance.</p>
                    </div>
                </div>
                <div>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`w-28 h-12 rounded-full px-2 flex items-center bg-[#63372c] ${darkMode ? "justify-end" : "justify-start"}`}
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
            <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-4 mt-5 bg-white/70 border-2 border-[#63372c] rounded-md px-2 py-2 md:h-40 w-full max-w-175 md:max-w-none">
                <div className="flex justify-start items-center gap-4">
                    <LuType className="text-[#63372c] shrink-0" size={40} />
                    <div>
                        <h3 className="text-[1.5rem] font-medium leading-tight tracking-tight">Font Size</h3>
                        <p className="text-[1rem] font-normal leading-6">Adjust text size for preference</p>
                    </div>
                </div>

                <div className="flex w-fit border-2 border-[#63372c] rounded-md md:self-auto">
                    <button
                        onClick={() => setFontSize("small")}
                        className={`px-6 py-3 text-sm font-medium ${fontSize === "small" ? "bg-[#63372c] text-white" : "bg-white/70 text-[#63372c]"}`}
                    >
                        Small
                    </button>
                    <button
                        onClick={() => setFontSize("medium")}
                        className={`px-6 py-3 text-sm font-medium border-l-2 border-r-2 border-[#63372c] ${fontSize === "medium" ? "bg-[#63372c] text-white" : "bg-white/70 text-[#63372c]"}`}
                    >
                        Medium
                    </button>
                    <button
                        onClick={() => setFontSize("large")}
                        className={`px-6 py-3 text-sm font-medium ${fontSize === "large" ? "bg-[#63372c] text-white" : "bg-white/70 text-[#63372c]"}`}
                    >
                        Large
                    </button>
                </div>
            </div>
        </div>
    );
}
*/

function BlockedUsersSection() {
    const [blockedUsers, setBlockedUsers] = useState([]);
    const [PersonToBlock, setPersonToBlock] = useState("");
    const [error, setError] = useState(null);
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "/api";
    useEffect(() => {
        const getBlockedUsers = async () => {
            try {
                const res = await fetch(`${API_BASE}/users/blocked`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                if (!res.ok) {
                    setError("Failed to get blocked users.");
                    return;
                }

                const data = await res.json();
                setBlockedUsers(data);
            } catch (err) {
                setError("Network error occurred.");
            }
        };

        getBlockedUsers();
    }, []);

    const AddUserToBlock = async (e) => {
        e.preventDefault();
        if (!PersonToBlock.trim()) return;
        try {
            const res = await fetch(`${API_BASE}/users/block/` + PersonToBlock, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.detail || "Failed to block user.");
                return;
            }

            setBlockedUsers((prev) => [...prev, data]);
            setPersonToBlock("");
            setError(null);

        } catch (err) {
            setError("Network error occurred.");
        }
    }

    const UnblockUser = async (blockedUsername) => {
        try {
            const res = await fetch(`${API_BASE}/users/block/` + blockedUsername, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.detail || "Failed to unblock user.");
                return;
            }

            setError(null);
            setBlockedUsers((prev) =>
                prev.filter((user) => user.blocked_username !== blockedUsername)
            );
        } catch (err) {
            setError("Network error occurred.");
        }
    }

    return (
        <div>
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                <div className="flex flex-col justify-center items-center md:items-start gap-4">
                    <h2 className="text-[2rem] font-semibold leading-tight text-center tracking-tight">Blocked Users List</h2>
                    <p className="text-[1rem] font-normal text-center leading-6">Manage your blocked list to control who can interact with you.</p>
                </div>
                <div className="flex items-center gap-3 ">
                    <input
                        type="text"
                        placeholder="Search by username..."
                        value={PersonToBlock}
                        onChange={(e) => setPersonToBlock(e.target.value)}
                        className="flex-1 rounded-md py-2 text-center bg-white/70 border border-[#63372c] text-sm font-normal"
                    />
                    <button
                        className="px-2 py-2 bg-[#63372c] text-white rounded-md text-sm font-medium"
                        onClick={(e) => AddUserToBlock(e)}
                    >
                        + Add User
                    </button>
                </div>
            </div>

            <p className="text-[1rem] font-normal leading-6 mt-5">Total Blocked: {blockedUsers.length} </p>
            {error && <p className="text-red-500 mt-2">{error}</p>}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-5 ">
                {blockedUsers.map((user, index) => (
                    <div
                        key={user.id || index}
                        className="h-40 bg-white/70 border-2 border-[#63372c] rounded-md p-4 flex flex-col justify-between"
                    >
                        <div>
                            <h3 className="text-[1.5rem] font-medium leading-tight tracking-tight">{user.blocked_username}</h3>
                        </div>
                        <p className="text-[1rem] font-normal leading-6 mt-2 italic text-gray-500">
                            Blocked User
                        </p>
                        <button
                            className="w-40 h-9 px-4 py-2.5 bg-[#63372c] text-white rounded-md text-sm font-medium leading-none hover:bg-[#4a2921]"
                            onClick={() => UnblockUser(user.blocked_username)}
                        >
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
    const [TimeSetUsername, setTimeSetUsername] = useState("Loading...");
    const [TimeSetPassword, setTimeSetPassword] = useState("Recently updated");
    const [TimeSetEmail, setTimeSetEmail] = useState("Loading...");
    const [openModal, setOpenModal] = useState(null);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "/api";

    useEffect(() => {
        const loadLoginDetails = async () => {
            try {
                const [meRes, profileRes] = await Promise.all([
                    fetch(`${API_BASE}/auth/me`, {
                        method: "GET",
                        credentials: "include",
                    }),
                    fetch(`${API_BASE}/profile`, {
                        method: "GET",
                        credentials: "include",
                    }),
                ]);

                if (meRes.ok) {
                    const meData = await meRes.json();
                    setTimeSetUsername(meData.username || "No username found");
                } else {
                    setTimeSetUsername("No username found");
                }

                if (profileRes.ok) {
                    const profileData = await profileRes.json();
                    setTimeSetEmail(profileData.email || "No email set");
                } else {
                    setTimeSetEmail("No email set");
                }
            } catch (err) {
                setTimeSetUsername("Unable to load");
                setTimeSetEmail("Unable to load");
            }
        };

        loadLoginDetails();
    }, [API_BASE]);

    const closeModal = () => {
        setOpenModal(null);
        setUsername("");
        setPassword("");
        setEmail("");
        setError(null);
        setSuccessMessage(null);
    };

    const handleUpdateUsername = async () => {
        try {
            const res = await fetch(`${API_BASE}/users/update-username`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ new_username: username }),
            });

            const rawText = await res.text();

            let data = {};
            try {
                data = JSON.parse(rawText);
            } catch { }

            if (!res.ok) {
                setError(data.detail || "Failed to update username.");
                setSuccessMessage(null);
                return;
            }

            setTimeSetUsername(username);
            setSuccessMessage("Username updated successfully.");
            setError(null);
            closeModal();
        } catch (err) {
            setError("Network error occurred.");
            setSuccessMessage(null);
        }
    };

    const handleUpdatePassword = async () => {
        try {
            const res = await fetch(`${API_BASE}/users/update-password`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ new_password: password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.detail || "Failed to update password.");
                setSuccessMessage(null);
                return;
            }

            setTimeSetPassword("Password updated");
            setSuccessMessage("Password updated successfully.");
            setError(null);
            closeModal();
        } catch (err) {
            setError("Network error occurred.");
            setSuccessMessage(null);
        }
    };

    const handleUpdateEmail = async () => {
        try {
            const res = await fetch(`${API_BASE}/users/update-email`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ new_email: email }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.detail || "Failed to update email.");
                setSuccessMessage(null);
                return;
            }

            setTimeSetEmail(email);
            setSuccessMessage("Email updated successfully.");
            setError(null);
            closeModal();
        } catch (err) {
            setError("Network error occurred.");
            setSuccessMessage(null);
        }
    };

    return (
        <div>
            <div className="flex flex-col justify-center items-center md:items-start">
                <div>
                    <h2 className="text-[2rem] font-semibold leading-tight tracking-tight text-center md:text-start">Login Details Management</h2>
                    <p className="text-[1rem] font-normal leading-6 text-center md:text-start">Update and manage your primary account security settings</p>
                </div>

                {error && <p className="text-red-600 font-medium mt-4">{error}</p>}
                {successMessage && <p className="text-green-600 font-medium mt-4">{successMessage}</p>}

                <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 justify-items-stretch w-full gap-5">
                    <div className="flex flex-col justify-between bg-white/70 border-2 border-[#63372c] rounded-md px-4 py-3 w-60 h-50">
                        <div className="flex justify-start items-center gap-4">
                            <LuUser className="text-[#63372c]" size={50} />
                            <div>
                                <h3 className="text-[1.5rem] font-medium leading-tight tracking-tight">Username</h3>
                                <p className="text-[1rem] font-normal leading-6">Info: {TimeSetUsername}</p>
                            </div>
                        </div>
                        <button
                            className="w-40 h-9 px-4 py-2.5 bg-[#63372c] text-white rounded-md text-sm font-medium leading-none self-start mt-2"
                            onClick={() => {
                                setOpenModal("username");
                                setError(null);
                                setSuccessMessage(null);
                            }}
                        >
                            Change Username
                        </button>
                    </div>

                    <div className="flex flex-col justify-between bg-white/70 border-2 border-[#63372c] rounded-md px-4 py-3 w-60 h-50">
                        <div className="flex justify-start items-center gap-4">
                            <LuKeyRound className="text-[#63372c]" size={50} />
                            <div>
                                <h3 className="text-[1.5rem] font-medium leading-tight tracking-tight">Password</h3>
                                <p className="text-[1rem] font-normal leading-6">Info: {TimeSetPassword}</p>
                            </div>
                        </div>
                        <button
                            className="w-40 h-9 px-4 py-2.5 bg-[#63372c] text-white rounded-md text-sm font-medium leading-none self-start mt-2"
                            onClick={() => {
                                setOpenModal("password");
                                setError(null);
                                setSuccessMessage(null);
                            }}
                        >
                            Update Password
                        </button>
                    </div>

                    <div className="flex flex-col justify-between bg-white/70 border-2 border-[#63372c] rounded-md px-4 py-3 w-60 h-50">
                        <div className="flex justify-start items-center gap-4">
                            <LuMail className="text-[#63372c]" size={50} />
                            <div>
                                <h3 className="text-[1.5rem] font-medium leading-tight tracking-tight">Email</h3>
                                <p className="text-[1rem] font-normal leading-6">Info: {TimeSetEmail}</p>
                            </div>
                        </div>
                        <button
                            className="w-40 h-9 px-4 py-2.5 bg-[#63372c] text-white rounded-md text-sm font-medium leading-none self-start mt-2"
                            onClick={() => {
                                setOpenModal("email");
                                setError(null);
                                setSuccessMessage(null);
                            }}
                        >
                            Change Email
                        </button>
                    </div>

                    {/*
            <div className="flex flex-col md:flex-row md:justify-between md:items-center bg-white/70 border-2 border-[#63372c] rounded-md px-4 py-3 gap-4 w-full min-h-25">
                <div className="flex justify-start items-center gap-4">
                    <LuShieldCheck className="text-[#63372c]" size={50} />
                    <div>
                        <h3 className="text-[1.5rem] font-medium leading-tight tracking-tight">2FA</h3>
                        <p className="text-[1rem] font-normal leading-6">Info: Disabled</p>
                    </div>
                </div>
                <button className="w-40 h-9 px-4 py-2.5 bg-[#63372c] text-white rounded-md text-sm font-medium leading-none">
                    Manage 2FA
                </button>
            </div>
            */}
                </div>
            </div>

            {openModal && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50"
                    onClick={closeModal}
                >
                    <div
                        className="relative bg-white rounded-2xl shadow-xl w-[420px] max-w-[90%] p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 text-gray-500 cursor-pointer text-xl font-bold"
                            onClick={closeModal}
                        >
                            ✕
                        </button>

                        {openModal === "username" && (
                            <>
                                <h3 className="text-2xl font-semibold text-[#63372c] mb-4">Change Username</h3>
                                <input
                                    type="text"
                                    placeholder="Enter new username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full rounded-md px-4 py-3 bg-white/70 border-2 border-[#63372c] text-sm font-normal"
                                />
                                <button
                                    className="mt-4 w-full bg-[#63372c] text-white rounded-md text-sm font-medium py-3"
                                    onClick={handleUpdateUsername}
                                >
                                    Save Username
                                </button>
                            </>
                        )}

                        {openModal === "password" && (
                            <>
                                <h3 className="text-2xl font-semibold text-[#63372c] mb-4">Update Password</h3>
                                <input
                                    type="password"
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-md px-4 py-3 bg-white/70 border-2 border-[#63372c] text-sm font-normal"
                                />
                                <button
                                    className="mt-4 w-full bg-[#63372c] text-white rounded-md text-sm font-medium py-3"
                                    onClick={handleUpdatePassword}
                                >
                                    Save Password
                                </button>
                            </>
                        )}

                        {openModal === "email" && (
                            <>
                                <h3 className="text-2xl font-semibold text-[#63372c] mb-4">Change Email</h3>
                                <input
                                    type="email"
                                    placeholder="Enter new email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-md px-4 py-3 bg-white/70 border-2 border-[#63372c] text-sm font-normal"
                                />
                                <button
                                    className="mt-4 w-full bg-[#63372c] text-white rounded-md text-sm font-medium py-3"
                                    onClick={handleUpdateEmail}
                                >
                                    Save Email
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

function HelpCenterSection() {
    const [PersonToReport, setPersonToReport] = useState("");
    const [MessageToSupport, setMessageToSupport] = useState("");
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "/api";
    const ReportUser = async (e) => {
        e.preventDefault();
        if (!PersonToReport.trim()) return;

        try {
            const res = await fetch(`${API_BASE}/users/report/` + PersonToReport, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ reason: "Reported from Help Center" })
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.detail || "Failed to report user.");
                setSuccessMessage(null);
                return;
            }

            setPersonToReport("");
            setError(null);
            setSuccessMessage("User reported successfully.");

        } catch (err) {
            setError("Network error occurred.");
            setSuccessMessage(null);
        }
    }

    const SendTicket = async (e) => {
        e.preventDefault();
        if (!MessageToSupport.trim()) return;

        try {
            const res = await fetch(`${API_BASE}/support/message`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ message: MessageToSupport })
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.detail || "Failed to send ticket.");
                setSuccessMessage(null);
                return;
            }

            setMessageToSupport("");
            setError(null);
            setSuccessMessage("Support ticket sent successfully!");

        } catch (err) {
            setError("Network error occurred.");
            setSuccessMessage(null);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center xl:items-start">
            <div className="text-center xl:text-left flex flex-col items-center xl:items-start">
                <h2 className="text-[2rem] font-semibold leading-tight tracking-tight">Get The Support You Need!</h2>
                <p className="text-[1rem] font-normal leading-6 mt-1">We're here to help you with any questions or issues you may have.</p>

                {error && <p className="text-red-600 font-medium mt-2">{error}</p>}
                {successMessage && <p className="text-green-600 font-medium mt-2">{successMessage}</p>}
            </div>

            <div className="flex flex-col xl:flex-row items-start justify-center rounded-md gap-10 mt-6">
                <div className="flex flex-col justify-center items-center bg-white/70 border-2 border-[#63372c] rounded-md w-120 md:px-5 py-10">
                    <LuTriangleAlert className="text-[#63372c]" size={50} />
                    <h3 className="text-[1.5rem] font-medium leading-tight tracking-tight mt-2">Report a User</h3>
                    <p className="text-[1rem] font-normal leading-6 text-center px-4">Search for a username to submit a Behavioral Report.</p>
                    <div className="flex items-center gap-3 mt-5 w-full px-6">
                        <input
                            type="text"
                            placeholder="Find User to Report"
                            value={PersonToReport}
                            onChange={(e) => setPersonToReport(e.target.value)}
                            className="flex-1 rounded-md px-4 py-2 bg-white/70 border-2 border-[#63372c] text-sm font-normal"
                        />
                        <button
                            className="px-4 py-2 bg-[#63372c] text-white rounded-md text-sm font-medium hover:bg-[#4a2921]"
                            onClick={(e) => ReportUser(e)}
                        >
                            Report
                        </button>
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center bg-white/70 border-2 border-[#63372c] rounded-md w-120 px-10 py-10">
                    <RiCustomerService2Line className="text-[#63372c]" size={50} />
                    <h3 className="text-[1.5rem] font-medium leading-tight tracking-tight mt-2">Chat with Support</h3>
                    <p className="text-[1rem] font-normal leading-6 mt-2 text-center">Send a message to our support team for assistance.</p>
                    <div className="mt-6 w-full max-w-md">
                        <textarea
                            placeholder="How can we assist you?"
                            value={MessageToSupport}
                            onChange={(e) => setMessageToSupport(e.target.value)}
                            className="w-full h-32 rounded-md px-4 py-3 bg-white/70 border-2 border-[#63372c] text-sm font-normal resize-none"
                        />
                        <button
                            className="mt-4 w-full bg-[#63372c] text-white rounded-md text-sm font-medium py-3 hover:bg-[#4a2921]"
                            onClick={(e) => SendTicket(e)}
                        >
                            Send Message
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}