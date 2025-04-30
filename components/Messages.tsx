"use client";

import { cn } from "@/utils";
import { useVoice } from "@humeai/voice-react";
import Expressions from "./Expressions";
import { AnimatePresence, motion } from "framer-motion";
import { forwardRef } from "react";

interface MessagesProps {
  layoutScroll?: boolean;
  className?: string;
}

const Messages = forwardRef<HTMLDivElement, MessagesProps>(function Messages(
  { layoutScroll, className, ...props },
  ref
) {
  const { messages } = useVoice();

  return (
    <div
      ref={ref}
      {...props}
      className={cn("grow rounded-md overflow-auto p-4", className)}
    >
      <div className="max-w-2xl mx-auto w-full flex flex-col gap-4 pb-24">
        <AnimatePresence mode="popLayout">
          {messages.map((msg, index) => {
            if (
              msg.type === "user_message" ||
              msg.type === "assistant_message"
            ) {
              return (
                <motion.div
                  key={msg.type + index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={cn(
                    "w-[80%]",
                    "bg-card",
                    "border border-border rounded",
                    msg.type === "user_message" ? "ml-auto" : ""
                  )}
                >
                  <div className="text-xs capitalize font-medium leading-none opacity-50 pt-4 px-3">
                    {msg.message.role}
                  </div>
                  <div className="pb-3 px-3">{msg.message.content}</div>
                  <Expressions values={{ ...msg.models.prosody?.scores }} />
                </motion.div>
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

