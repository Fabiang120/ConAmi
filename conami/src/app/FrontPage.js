import Image from "next/image";
import Logo from "./Components/Logo";
import Link from "next/link";

export default function FrontPage() {
    return (
        <div className="grid min-h-screen lg:grid-cols-2 bg-[#f0e1d1]">
            <div className="absolute top-8 left-8">
                <Logo width={60} height={60}/>
            </div>
            {/* Image Section - Left */}
            <div className="order-2 lg:order-1 col-span-1 flex items-center justify-center p-8 md:p-12 lg:pl-16 lg:pr-12 lg:pt-30">
                <Image
                    src="/newheader.png"
                    alt="Person Typing"
                    className="relative w-full h-auto object-cover max-w-xl"
                    width={600}
                    height={400}
                />
            </div>

            {/* Vertical Divider - only visible on large screens */}
            <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-y-1/2 w-px h-48 bg-[#63372c]/30"></div>

            {/* Text Section - Right */}
            <div className="order-1 lg:order-2 col-span-1 flex flex-col justify-center p-8 pt-28 md:p-12 md:pt-28 lg:p-16 lg:pl-12 lg:pt-30">
                <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-wider uppercase font-bold leading-[0.90] text-[#63372c]">
                    LEARN LANGUAGES
                    <br />
                    BY CHATTING.
                </h1>
                <p className="text-lg md:text-xl tracking-wide font-medium leading-relaxed pt-8 text-[#4a3228] max-w-lg">
                    ConAmi brings English and Spanish speakers together to practice naturally
                    through conversation. Learn from each other, explore culture, and keep
                    chats flowing with built-in AI support when you need it.
                </p>
            </div>
            <div className="order-3 lg:col-span-2 flex flex-col gap-6 md:gap-10 md:flex-row md:justify-center items-center lg:-mt-20">
                <Link href="/Login" >
                <button className="cursor-pointer w-72 bg-[#63372c] text-[#f0e1d1] text-xl py-5 rounded-2xl font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
                    Sign in to ConAmi
                </button></Link>
                 <Link href="/SignUp">
                <button className="cursor-pointer w-72 border-2 border-[#63372c] text-[#63372c] text-xl py-5 rounded-2xl font-bold hover:shadow-lg transition-all transform hover:-translate-y-1">
                   Create your ConAmi Profile 
                </button></Link>
            </div >
        </div >
    );
}