"use client";
import Sidebar from "../Components/sidebar.js"
import { MdAdminPanelSettings } from "react-icons/md";

export default function Settings(){
    return(
        <div className ="grid grid-cols-12 min-h-screen">
            <div className="col-span-12 md:col-span-3 lg:col-span-2">
                <Sidebar />
            </div>
            <div className="col-span-12 md:col-span-9 lg:col-span-10 bg-[#f0e1d1] font-sans px-20">
                <div className="flex items-center py-6">
                    <MdAdminPanelSettings size={48} className="text-[#63372c]" />
                    <h1 className="text-2xl font-bold p-6">Settings</h1>
                </div>
                <ul className="flex justify-between text-[#63372c] font-medium">
                    <li className="py-4 cursor-pointer hover:text-black">
                        Chat Settings
                    </li>
                    <li className="py-4 cursor-pointer hover:text-black">
                        Blocked Users
                    </li>
                    <li className="py-4 cursor-pointer hover:text-black">
                        Login Details
                    </li>
                    <li className="py-4 cursor-pointer hover:text-black">
                        Help Center
                    </li>
                </ul>
                <div className="h-px bg-[#63372c]" />
            </div>
            
        </div>
    )
}