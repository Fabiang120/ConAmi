import Image from "next/image";
import Logo from "./Components/Logo";

export default function FrontPage() {
    return (
        <div className="grid min-h-screen lg:grid-cols-2 bg-[#f0e1d1]">
            <div className="col-span-1">
                <Logo />
                <h1>
                    LEARN LANGUAGES
                    <br />
                    BY TALKING.
                </h1>
                <p>
                    ConAmi brings English and Spanish speakers together to practice naturally
                    through conversation. Learn from each other, explore culture, and keep
                    chats flowing with built-in AI support when you need it.
                </p>
            </div>
            <div className="col-span-1 flex items-center justify-center">
                <div className="relative">
                    {/* The glow behind image is this div */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#63372c] to-[#a05e4b] rounded-3xl blur opacity-30"></div>
                    <Image
                        src="/newheader.png"
                        alt="Person Typing"
                        className="rounded-3xl relative"
                        width={600}
                        height={400}
                    />
                </div>
            </div>
            <div className="col-span-2 flex flex-col gap-6 md:gap-8 md:flex-row md:justify-center items-center">
                <button className="w-72 bg-[#63372c] text-[#f0e1d1] text-xl py-5 rounded-2xl font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
                    Sign in to ConAmi
                </button>

                <button className="w-72 border-2 border-[#63372c] text-[#63372c] text-xl py-5 rounded-2xl font-bold hover:shadow-lg transition-all transform hover:-translate-y-1">
                    Create your ConAmi Profile
                </button>
            </div>
        </div>
    );
}