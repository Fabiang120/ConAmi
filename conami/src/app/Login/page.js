"use client";
import React from "react"
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login (){
    const [username, setUsername] = React.useState("");
    const [password, setPassword]= React.useState("");
    const isFormValid = username.trim() !== "" && password.trim() !=="";
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!username || !password) return;
         console.log(username, password);
         router.push("/Home");
    };

    return(
        <div className="flex items-center justify-center min-h-screen bg-[#63372c]">
        <div className="flex w-180 h-90 shadow-lg rounded-lg flex-col items-center p-8 bg-[#f0e1d1]">
            <h1 className="font-bold text-black">LOG IN</h1>

<form onSubmit={handleSubmit} className=" flex flex-col gap-2 w-full max-w-sm items-center">
                <div className="flex flex-col  bg-[#f0e1d1] ">
                    <label className="flex items-center gap-2 text-sm font-medium text-[#63372c]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 12.47c2.392 0 4.331-1.896 4.331-4.235C16.331 5.896 14.391 4 12 4 9.608 4 7.669 5.896 7.669 8.235c0 2.34 1.94 4.236 4.331 4.236Zm0 0c-4.8 0-6.617 2.597-7.298 4.74-.183.579-.275.868-.132 1.392.1.369.505.906.835 1.109.47.289.911.289 1.794.289h9.602c.883 0 1.324 0 1.794-.29.33-.202.735-.74.835-1.108.143-.524.051-.813-.133-1.391-.68-2.144-2.496-4.74-7.297-4.74Z"/>
                        </svg>
                    Username
                    </label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="shadow-sm w-80 h-10 p-4 border " required />
                </div>
                <div className="flex flex-col  bg-[#f0e1d1] ">
                    <label className="flex items-center gap-2 text-sm font-medium text-[#63372c]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m13.83 7.823 2.316 2.297m-.579-5.168 3.474 3.445a3.23 3.23 0 0 1 0 4.595l-2.316 2.297a3.293 3.293 0 0 1-4.63 0 .564.564 0 0 0-.465-.16l-1.387.166a.544.544 0 0 0-.474.453l-.212 1.32a.544.544 0 0 1-.497.455l-1.146.088a.545.545 0 0 0-.49.413l-.38 1.562a.545.545 0 0 1-.555.413l-1.969-.09a.543.543 0 0 1-.52-.553l.04-1.99a.54.54 0 0 1 .16-.371l4.42-4.386a.539.539 0 0 0 0-.766 3.23 3.23 0 0 1 0-4.594l2.316-2.297a3.293 3.293 0 0 1 4.632 0Z"/>
                    </svg>
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