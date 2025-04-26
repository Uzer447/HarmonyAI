"use client";

import { cn } from "@/utils";
import { useVoice } from "@humeai/voice-react";
import Expressions from "./Expressions";
import { AnimatePresence, motion, HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

interface MessagesProps extends HTMLMotionProps<"div"> {
  layoutScroll?: boolean;
}

const Messages = forwardRef<HTMLDivElement, MessagesProps & { className?: string }>(function Messages(
  { layoutScroll, className, ...props },
  ref
) {
  const { messages } = useVoice();

  return (
    <motion.div
    layoutScroll={layoutScroll}
    ref={ref}
    {...props} 
    className={cn("grow rounded-md overflow-auto p-4", className)}
  >
      <motion.div
        className="max-w-2xl mx-auto w-full flex flex-col gap-4 pb-24"
        layout
      >
        <AnimatePresence mode="popLayout">
          {messages.map((msg, index) => {
            if (
              msg.type === "user_message" ||
              msg.type === "assistant_message"
            ) {
              return (
                <motion.div
                  key={msg.type + index}
                  className={cn(
                    "w-[80%]",
                    "bg-card",
                    "border border-border rounded",
                    msg.type === "user_message" ? "ml-auto" : ""
                  )}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 0 }}
                  tabIndex={msg.type === "user_message" ? 0 : undefined}
                  role={msg.type === "assistant_message" ? "assistant" : undefined}
                  layout
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
      </motion.div>
    </motion.div>
  );
});

export default Messages;
