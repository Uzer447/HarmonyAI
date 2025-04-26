"use client";

import HarmonyLogo from "./logos/HarmonyLogo";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useLayoutEffect, useState } from "react";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export const Nav = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useLayoutEffect(() => {
    const el = document.documentElement;
    setIsDarkMode(el.classList.contains("dark"));
  }, []);

  const toggleDark = () => {
    const el = document.documentElement;
    el.classList.toggle("dark");
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="px-4 py-2 w-full flex items-center h-14 z-50 bg-card border-b border-border">
      <HarmonyLogo />

      <div className="ml-auto flex items-center gap-3">
        {/* Theme Toggle Button */}
        <Button
          onClick={toggleDark}
          variant="ghost"
          className="flex items-center gap-1.5"
        >
          {isDarkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}
          <span>{isDarkMode ? "Light" : "Dark"} Mode</span>
        </Button>

        {/* Show SignIn/SignUp buttons only when signed out */}
        <SignedOut>
          <SignInButton mode="modal">
            <button className="rounded-[62px] px-4 py-2 bg-white text-black border border-border hover:bg-black hover:text-white">
              Sign In
            </button>
          </SignInButton>

          <SignUpButton mode="modal">
            <button className="rounded-[62px] px-4 py-2 border border-border hover:bg-black hover:text-white">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>

        {/* Show user profile (avatar dropdown) only when signed in */}
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </div>
  );
};
