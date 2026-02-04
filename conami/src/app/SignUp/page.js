"use client";
import React from "react";
import Link from "next/link";
import { FiUser, FiKey, FiLock } from "react-icons/fi";

export default function SignUp() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        const res = await fetch("http://localhost:8000/users/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password })
        });
        if (!res.ok) {
            alert("Login failed");
            return;
        }
        const data = await res.json();
        console.log(data);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#63372c]">
            <div className="flex w-180 h-120 shadow-lg rounded-lg flex-col items-center p-8 bg-[#f0e1d1]">
                <h1 className="font-bold text-black m-5">CREATE A PROFILE</h1>

                <form onSubmit={handleSubmit} className=" flex flex-col gap-2 w-full max-w-sm items-center">
                    <div className="flex flex-col  bg-[#f0e1d1] ">
                        <label className="flex items-center gap-2 text-sm font-medium text-[#63372c]">
                            <FiUser size={20} />
                            Username
                        </label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="shadow-sm w-80 h-10 p-4 border " required />
                    </div>

                    <div className="flex flex-col  bg-[#f0e1d1] ">
                        <label className="flex items-center gap-2 text-sm font-medium text-[#63372c]">
                            <FiKey size={20} />
                            Password
                        </label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="shadow-sm w-80 h-10 p-4 border" required />
                    </div>

                    <div className="flex flex-col bg-[#f0e1d1] ">
                        <label className="flex items-center gap-2 text-sm font-medium text-[#63372c]">
                            <FiLock size={20} />
                            Confirm Password
                        </label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="shadow-sm w-80 h-10 p-4 border" required />
                    </div>

                    <button type="submit" className="w-80 h-10 bg-[#63372c] text-[#f0e1d1] rounded-full m-5 hover:scale-110 hover:ease-in-out hover:duration-300 transition-all">
                        <Link href="/Profile">Sign Up</Link>
                    </button>
                </form>

                <div className="flex gap-2 mt-4 text-sm m-10">
                    <p>Already have an account?</p>
                    <Link href="/Login" className="underline text-[#63372c] cursor-pointer">Log In</Link>
                </div>
            </div>
        </div>
    );
}
