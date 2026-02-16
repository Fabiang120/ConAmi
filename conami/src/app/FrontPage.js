import Image from "next/image";
import Logo from "./Components/Logo";
import Link from "next/link";

export default function FrontPage() {
    return (
        <div className="relative grid min-h-screen lg:grid-cols-2 bg-[#f0e1d1]">
            <div className="absolute top-8 left-1/2 -translate-x-1/2 lg:left-8 lg:translate-x-0">
                <Logo width={60} height={60} />
            </div>

            <div className="order-2 lg:order-1 col-span-1 flex items-center justify-center p-2 pb-8 lg:pl-16 lg:pr-12 lg:pt-30">
                <Image
                    src="/newheader.png"
                    alt="Person Typing"
                    className="relative w-full h-auto object-cover max-w-xl"
                    width={600}
                    height={400}
                />
            </div>

            <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-y-1/2 w-px h-48 bg-[#63372c]/30"></div>

            <div className="order-1 lg:order-2 col-span-1 flex flex-col items-center lg:items-baseline justify-center p-8 pt-28 md:p-12 md:pt-28 lg:p-16 lg:pl-12 lg:pt-30">
                <h1 className="text-5xl lg:text-6xl tracking-tight uppercase font-bold leading-tight text-[#63372c]">
                    LEARN LANGUAGES
                    <br />
                    BY CHATTING.
                </h1>
                <p className="text-lg font-medium leading-normal pt-8 text-[#4a3228] max-w-lg">
                    ConAmi connects English and Spanish speakers to learn naturally through real conversations, culture exchange, and AI support.
                </p>
            </div>

            <div className="order-3 lg:col-span-2 flex flex-col gap-6 md:gap-10 md:flex-row md:justify-center items-center lg:-mt-20">
                <Link href="/Login">
                    <button className="cursor-pointer leading-normal w-72 bg-[#63372c] text-[#f0e1d1] text-lg py-3 rounded-md font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
                        Sign in to ConAmi
                    </button>
                </Link>
                <Link href="/SignUp">
                    <button className="cursor-pointer leading-normal w-72 border-2 border-[#63372c] text-[#63372c] text-lg py-3 rounded-md font-bold hover:shadow-lg transition-all transform hover:-translate-y-1 mb-9 lg-mb-0">
                        Create your ConAmi Profile
                    </button>
                </Link>
            </div>
        </div>
    );
}
