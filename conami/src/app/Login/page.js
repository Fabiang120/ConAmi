"use client";
import React from "react"
import Link from "next/link";
import { FiUser, FiKey } from "react-icons/fi";
import { useRouter } from "next/navigation";


// .venv\Scripts\Activate.ps1
// fastapi dev main.py
export default function Login (){
    const [username, setUsername] = React.useState("");
    const [password, setPassword]= React.useState("");
    const isFormValid = username.trim() !== "" && password.trim() !=="";
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`http://localhost:8000/auth/login`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password})
        });
        if (!res.ok) {
            alert("Login failed");
            return;
        }
        const data = await res.json();
        console.log(data);
        router.push("/Home");
    };

    return(
        <div className="flex items-center justify-center min-h-screen bg-[#63372c]">
        <div className="flex w-180 h-90 shadow-lg rounded-lg flex-col items-center p-8 bg-[#f0e1d1]">
            <h1 className="font-bold text-black">LOG IN</h1>

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
                <button type="submit" disabled={!isFormValid} className={`w-80 h-10 rounded-full m-5 transition-all ${isFormValid ? " bg-[#63372c] text-[#f0e1d1] hover:scale-110 hover:ease-in-out hover:duration-300" : "bg-gray-400 text-gray-200 cursor-not-allowed" }`}>
                    Login
                </button>
            </form>
            <div className="flex gap-2 mt-4 text-sm m-10">
                <p>Dont have an account?</p>
                <Link href="/SignUp" className="underline text-[#63372c] cursor-pointer">Sign up</Link>
            </div>
        </div>
        </div>
    );
}