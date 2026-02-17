"use client";
import React from "react";
import Link from "next/link";
import { FiUser, FiKey, FiLock } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const router = useRouter();

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
            setError("Failed to create account. Username may already be taken.");
            return;
        }
        const data = await res.json();
        console.log(data);
        router.push("/Home");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#f0e1d1]">
            <div className="flex w-full max-w-md shadow-2xl rounded-sm flex-col items-center p-10 bg-white">

                <h1 className="text-3xl font-extrabold text-[#63372c] leading-tight mb-8 tracking-tight">
                    CREATE A PROFILE
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full text-[#63372c] text-sm">

                    <div className="flex flex-col gap-2 leading-normal">
                        <label className="flex items-center gap-2 font-bold uppercase tracking-wider">
                            <FiUser size={20} />
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full h-12 px-4 rounded-md bg-[#f0e1d1]/30 border-2 border-[#63372c]/20 focus:border-[#63372c] focus:bg-white outline-none transition-all font-medium"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2 leading-normal">
                        <label className="flex items-center gap-2 font-bold uppercase tracking-wider">
                            <FiKey size={20} />
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-12 px-4 rounded-md bg-[#f0e1d1]/30 border-2 border-[#63372c]/20 focus:border-[#63372c] focus:bg-white outline-none transition-all font-medium"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2 leading-normal">
                        <label className="flex items-center gap-2 font-bold uppercase tracking-wider">
                            <FiLock size={20} />
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full h-12 px-4 rounded-md bg-[#f0e1d1]/30 border-2 border-[#63372c]/20 focus:border-[#63372c] focus:bg-white outline-none transition-all font-medium"
                            required
                        />
                    </div>

                    <button type="submit" className="bg-[#63372c] text-[#f0e1d1] w-full h-12 rounded-md mt-4 font-bold text-sm shadow-md transition-all transform hover:-translate-y-1">
                        Sign Up
                    </button>
                    <div className="min-h-[18px] text-center">
                        {error && (
                            <p className="text-red-500 text-center font-medium">
                                {error}
                            </p>
                        )}
                    </div>
                </form>

                <div className="flex gap-2 mt-4 m-10 leading-normal text-sm">
                    <p>Already have an account?</p>
                    <Link href="/Login" className="font-bold text-[#63372c] underline decoration-2 underline-offset-4 hover:text-[#8d4f3f]">
                        Log In
                    </Link>
                </div>

            </div>
        </div>
    );
}
