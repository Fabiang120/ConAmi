import Link from "next/link";
export default function Sidebar(){
    return (
        <div className="transition-all duration-300 min-h-screen w-56"  style={{backgroundColor: '#8D4F3F'}} >
                <nav className="p-4 space-y-2 text-white">
                    <a href='#' className="flex items-center gap-2 text-[#C37050] hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 12.47c2.392 0 4.331-1.896 4.331-4.235C16.331 5.896 14.391 4 12 4 9.608 4 7.669 5.896 7.669 8.235c0 2.34 1.94 4.236 4.331 4.236Zm0 0c-4.8 0-6.617 2.597-7.298 4.74-.183.579-.275.868-.132 1.392.1.369.505.906.835 1.109.47.289.911.289 1.794.289h9.602c.883 0 1.324 0 1.794-.29.33-.202.735-.74.835-1.108.143-.524.051-.813-.133-1.391-.68-2.144-2.496-4.74-7.297-4.74Z"/>
                    </svg>
                        <Link href="/Profile" className="underline text-[#C37050] cursor-pointer">Profile</Link>
                    </a>
                    <a href="#" className="flex items-center gap-2 text-[#C37050] hover:text-white"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.25 16.236c0 .544 0 1.346.106 1.554a.973.973 0 0 0 .426.424c.209.106.482.106 1.028.106h3.886c.052 0 .078 0 .102.005a.241.241 0 0 1 .064.023.55.55 0 0 1 .082.061L18.172 20v-1.291c0-.136 0-.204.026-.256a.243.243 0 0 1 .107-.106c.052-.027.12-.027.257-.027h1.048c.137 0 .205 0 .257-.026a.243.243 0 0 0 .106-.106c.027-.052.027-.12.027-.256v-4.878c0-.544 0-.816-.106-1.024a.972.972 0 0 0-.426-.424c-.209-.106-.922-.106-1.468-.106m-8.128 2.31-3.247 2.44v-2.12c0-.14 0-.21-.027-.264a.25.25 0 0 0-.11-.11c-.053-.027-.123-.027-.263-.027H5.6c-.56 0-.84 0-1.054-.109a1 1 0 0 1-.437-.437C4 12.97 4 12.69 4 12.13V5.6c0-.56 0-.84.109-1.054a1 1 0 0 1 .437-.437C4.76 4 5.04 4 5.6 4h8.8c.56 0 .84 0 1.054.109a1 1 0 0 1 .437.437C16 4.76 16 5.04 16 5.6v6.53c0 .56 0 .84-.109 1.053a1 1 0 0 1-.437.437c-.214.11-.494.11-1.054.11h-4.287c-.05 0-.075 0-.098.004a.252.252 0 0 0-.061.02.52.52 0 0 0-.082.055Z"/>
                        </svg>
                        Chats</a>
                    <a href="#" className="flex items-center gap-2 text-[#C37050] hover:text-white"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.077 12c0 1.657-1.378 3-3.077 3-1.7 0-3.077-1.343-3.077-3S10.301 9 12 9c1.7 0 3.077 1.343 3.077 3Z"/>
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.35 4a.51.51 0 0 0-.498.379l-.416 1.619c-.533.217-1.031.5-1.484.837l-1.647-.46a.519.519 0 0 0-.585.231L4.069 9.394a.49.49 0 0 0 .087.61l1.232 1.16a6.403 6.403 0 0 0 0 1.672l-1.232 1.16a.49.49 0 0 0-.087.61l1.65 2.788a.518.518 0 0 0 .586.23l1.647-.459c.453.338.951.62 1.484.837l.416 1.62a.51.51 0 0 0 .497.378h3.302a.51.51 0 0 0 .497-.379l.416-1.619a6.705 6.705 0 0 0 1.484-.837l1.647.46a.519.519 0 0 0 .585-.231l1.651-2.788a.49.49 0 0 0-.087-.61l-1.232-1.16a6.403 6.403 0 0 0 0-1.672l1.232-1.16a.49.49 0 0 0 .087-.61l-1.65-2.788a.519.519 0 0 0-.586-.23l-1.647.459a6.702 6.702 0 0 0-1.484-.837l-.416-1.62A.51.51 0 0 0 13.651 4h-3.302Z"/>
                        </svg>
                        Settings</a>
                </nav>
            </div>
    );
}