import { useVoice } from "@humeai/voice-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { Phone } from "lucide-react";

export default function StartCall() {
  const { status, connect } = useVoice();

  return (
    <AnimatePresence>
      {status.value !== "connected" && (
        <div className="fixed inset-0 p-4 flex items-center justify-center bg-background">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
            >
              <Button
                className="z-50 flex items-center gap-1.5"
                onClick={() => {
                  connect()
                    .then(() => {})
                    .catch(() => {})
                    .finally(() => {});
                }}
              >
                <Phone
                  className="size-4 opacity-50"
                  strokeWidth={2}
                  stroke="currentColor"
                />
                <span>Start Call</span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
