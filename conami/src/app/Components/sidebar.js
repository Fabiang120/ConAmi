import Link from "next/link";
import { FiUser, FiMessageSquare, FiSettings } from "react-icons/fi";
import { LuFilePenLine } from "react-icons/lu";
import { FaFileContract } from "react-icons/fa"; //also temporary for the terms and services, but I will change it later. I just want it to look nice for now
import Logo from "./Logo";

export default function Sidebar() {
    return (
        <div className="transition-all duration-300 min-h-full bg-[#63372c]">
            <nav className="p-6 space-y-6 overflow-hidden">
                <Link href="/Home" className="block mb-8">
                    <Logo className="text-[#f0e1d1] text-2xl" />
                </Link>
                <ul className="space-y-6">
                    <li>
                        <Link
                            href="/Profile"
                            className="flex items-center gap-3 text-[#f0e1d1] hover:text-white text-xl font-medium transition-colors"
                        >
                            <FiUser size={26} />
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/ChatRoom"
                            className="flex items-center gap-3 text-[#f0e1d1] hover:text-white text-xl font-medium transition-colors"
                        >
                            <FiMessageSquare size={26} />
                            Chats
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/Settings"
                            className="flex items-center gap-3 text-[#f0e1d1] hover:text-white text-xl font-medium transition-colors"
                        >
                            <FiSettings size={26} />
                            Settings
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/Self-Evaluation"
                            className="flex items-center gap-3 text-[#f0e1d1] hover:text-white text-xl font-medium transition-colors"
                        >
                            <LuFilePenLine size={26} />
                            Self-Evaluation
                        </Link>
                    </li>
                    {/*This is not supposed to be in the navbar, but I have it here for debugging. I am creating the terms and services for the log in.*/}
                    <li>
                        <Link
                            href="/TermsAndServices"
                            className="flex items-center gap-3 text-[#f0e1d1] hover:text-white text-xl font-medium transition-colors"
                        >
                            <FaFileContract size={26} />
                            Terms and Services
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}