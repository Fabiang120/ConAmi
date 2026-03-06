import Link from "next/link";
import { FiHome, FiUser, FiMessageSquare, FiSettings } from "react-icons/fi";

export default function BottomNav() {
    return (
        <>
            <nav className="fixed bottom-0 left-0 right-0 bg-[#63372c] py-3 z-50 border-t-2 border-[#874B3D] md:hidden">
                <ul className="flex flex-row justify-around items-center">
                    <li>
                        <Link href="/Home" className="text-[#f0e1d1] hover:text-white">
                            <FiHome size={26} />
                        </Link>
                    </li>
                    <li>
                        <Link href="/Profile" className="text-[#f0e1d1] hover:text-white">
                            <FiUser size={26} />
                        </Link>
                    </li>
                    <li>
                        <Link href="/ChatRoom" className="text-[#f0e1d1] hover:text-white">
                            <FiMessageSquare size={26} />
                        </Link>
                    </li>
                    <li>
                        <Link href="/Settings" className="text-[#f0e1d1] hover:text-white">
                            <FiSettings size={26} />
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}