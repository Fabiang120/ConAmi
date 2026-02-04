import Link from "next/link";
import { FiUser, FiMessageSquare, FiSettings } from "react-icons/fi";

export default function Sidebar() {
    return (
        <div
            className="transition-all duration-300 min-h-screen w-56"
            style={{ backgroundColor: "#8D4F3F" }}
        >
            <nav className="p-4 space-y-2 text-white">

                <Link
                    href="/Profile"
                    className="flex items-center gap-2 text-[#C37050] hover:text-white"
                >
                    <FiUser size={24} />
                    <span className="underline cursor-pointer">Profile</span>
                </Link>

                <a className="flex items-center gap-2 text-[#C37050] hover:text-white cursor-pointer">
                    <FiMessageSquare size={24} />
                    Chats
                </a>

                <a className="flex items-center gap-2 text-[#C37050] hover:text-white cursor-pointer">
                    <FiSettings size={24} />
                    Settings
                </a>

            </nav>
        </div>
    );
}
