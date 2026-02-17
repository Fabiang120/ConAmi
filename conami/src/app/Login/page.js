"use client";
import React from "react"
import Link from "next/link";
import { FiUser, FiKey } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function Login() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const isFormValid = username.trim() !== "" && password.trim() !== "";
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`http://localhost:8000/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password })
        });
        if (!res.ok) {
            setError("Username or Password incorrect")
            return;
        }
        setError("");
        const data = await res.json();
        console.log(data);
        router.push("/Home");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#f0e1d1] p-4">
            <div className="flex w-full max-w-md shadow-2xl rounded-sm flex-col items-center p-10 bg-white">

                <h1 className="text-3xl font-extrabold text-[#63372c] mb-8 tracking-tight">
                    LOG IN
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full text-[#63372c] text-sm">

                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2 font-bold uppercase tracking-wider">
                            <FiUser size={18} />
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

                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2 font-bold uppercase tracking-wider">
                            <FiKey size={18} />
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
                        <button
                            type="submit"
                            disabled={!isFormValid}
                            className={`w-full h-12 rounded-md mt-4 font-bold text-sm shadow-md transition-all transform hover:-translate-y-1 ${isFormValid
                                    ? "bg-[#63372c] text-[#f0e1d1] hover:shadow-lg cursor-pointer"
                                    : "bg-[#ded0c1] text-[#b0a095] cursor-not-allowed"
                                }`}
                        >
                            Login
                        </button>
                    <div className="min-h-4.5 text-center">
                        {error && (
                            <p className="text-red-500 font-medium">
                                {error}
                            </p>
                        )}
                    </div>
                </form>
                <div className="flex gap-2 mt-8 font-medium text-[#63372c]/80 text-sm">
                    <p>Don't have an account?</p>
                    <Link href="/SignUp" className="font-bold text-[#63372c] underline decoration-2 underline-offset-4 hover:text-[#8d4f3f]">
                        Sign up
                    </Link>
                </div>

            </div>
        </div>
    );
}
