import React from "react";
import Link from "next/link";

const HarmonyLogo: React.FC = () => {
  return (
    <Link href="/" passHref>
      <div className="flex items-center space-x-2 p-1 bg-transparent rounded-md shadow-sm hover:shadow-md transition-shadow cursor-pointer">
        <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-teal-400 to-indigo-500 rounded-full shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="w-5 h-5"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-1.1 0-2-.9-2-2h4c0 1.1-.9 2-2 2zm3.07-4.25c-.9.9-2.07 1.25-3.07 1.25s-2.17-.35-3.07-1.25C7.35 11.94 7 10.78 7 9.5V9c0-2.76 2.24-5 5-5s5 2.24 5 5v.5c0 1.28-.35 2.44-1.07 3.25z" />
          </svg>
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">Harmony</h1>
          <p className="text-xs text-gray-600 dark:text-gray-300 italic">Your Personal AI Therapist</p>
        </div>
      </div>
    </Link>
  );
};

export default HarmonyLogo;