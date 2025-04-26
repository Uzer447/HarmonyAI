"use client";

import { cn } from "@/utils";
import { useVoice } from "@humeai/voice-react";
import Expressions from "./Expressions";
import { AnimatePresence } from "framer-motion";
import { forwardRef, useEffect, useState } from "react";

interface MessagesProps {
  layoutScroll?: boolean;
  className?: string;
}

const Messages = forwardRef<HTMLDivElement, MessagesProps>(function Messages(
  { layoutScroll, className, ...props },
  ref
) {
  const { messages } = useVoice();
  const [visibleMessages, setVisibleMessages] = useState<any[]>([]);

  useEffect(() => {
    // Simulate the animation by adding/removing messages with transitions.
    const timeoutIds: NodeJS.Timeout[] = [];
    setVisibleMessages([]);

    messages.forEach((msg, index) => {
      timeoutIds.push(
        setTimeout(() => {
          setVisibleMessages((prev) => [...prev, msg]);
        }, index * 200) // Delay for each message for a cascading effect
      );
    });

    // Cleanup timeout IDs on component unmount
    return () => {
      timeoutIds.forEach((id) => clearTimeout(id));
    };
  }, [messages]);

  return (
    <div
      ref={ref}
      {...props}
      className={cn("grow rounded-md overflow-auto p-4", className)}
    >
      <div className="max-w-2xl mx-auto w-full flex flex-col gap-4 pb-24">
        <AnimatePresence mode="popLayout">
          {visibleMessages.map((msg, index) => {
            if (
              msg.type === "user_message" ||
              msg.type === "assistant_message"
            ) {
              return (
                <div
                  key={msg.type + index}
                  className={cn(
                    "w-[80%]",
                    "bg-card",
                    "border border-border rounded",
                    msg.type === "user_message" ? "ml-auto" : "",
                    "transition-all duration-300 ease-in-out opacity-0 translate-y-10", // Initial styles for animation
                    "animate-opacity-100 animate-translate-y-0" // Final styles for animation
                  )}
                  style={{ opacity: 1, transform: "translateY(0)" }}
                >
                  <div className="text-xs capitalize font-medium leading-none opacity-50 pt-4 px-3">
                    {msg.message.role}
                  </div>
                  <div className="pb-3 px-3">{msg.message.content}</div>
                  <Expressions values={{ ...msg.models.prosody?.scores }} />
                </div>
              );
            }
            return null;
          })}
        </AnimatePresence>
      </div>
    </div>
  );
});

export default Messages;
