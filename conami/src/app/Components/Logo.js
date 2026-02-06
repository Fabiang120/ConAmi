export default function Logo() {
    return (
        <div className="flex items-center gap-3 mb-6">
            <svg
                width="60"
                height="60"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#63372c]"
            >
                {/* Person 1 (Left) */}
                <circle cx="25" cy="25" r="8" fill="currentColor" />
                <path
                    d="M25 35 L 25 60"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                />
                <path
                    d="M25 60 L 15 85"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                />
                <path
                    d="M25 60 L 35 85"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                />
                <path
                    d="M25 40 L 10 60"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                />
                {/* Reaching Arm */}
                <path
                    d="M 25 40 L 40 28 L 48 15"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Person 2 (Right) */}
                <circle cx="75" cy="25" r="8" fill="currentColor" />
                <path
                    d="M75 35 L 75 60"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                />
                <path
                    d="M75 60 L 65 85"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                />
                <path
                    d="M75 60 L 85 85"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                />
                <path
                    d="M75 40 L 90 60"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                />
                {/* Reaching Arm */}
                <path
                    d="M 75 40 L 60 28 L 52 15"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* 
                    The Distinguisher / Separator Line 
                */}
                <path
                    d="M 50 32 Q 52 22 49 12"
                    stroke="var(--background)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    style={{ fill: 'none' }}
                />

                {/* High Five Sparks */}
                <path
                    d="M 50 8 L 50 0"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
                <path
                    d="M 44 10 L 38 4"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
                <path
                    d="M 56 10 L 62 4"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                />

            </svg>
            <span className="text-3xl font-bold font-sans tracking-tight text-[#63372c]">
                ConAmi
            </span>
        </div>
    );
}
