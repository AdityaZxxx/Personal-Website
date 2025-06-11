"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useChat, type Message } from "@ai-sdk/react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Maximize2, Minimize2, Send, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ChatMessage = ({ message }: { message: Message }) => {
  if (message.role !== "user" && message.role !== "assistant") {
    return null;
  }

  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      layout
      className={cn(
        "flex items-start gap-3 max-w-[85%]",
        isUser ? "self-end" : "self-start"
      )}
    >
      {!isUser && (
        <div className="bg-primary text-primary-foreground rounded-full p-1.5 mt-0.5 flex-shrink-0">
          <Bot className="h-4 w-4" />
        </div>
      )}
      <div
        className={cn(
          "rounded-lg px-3 py-2 text-sm whitespace-pre-wrap",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted"
        )}
      >
        {message.content}
      </div>
      {isUser && (
        <div className="bg-primary text-primary-foreground rounded-full p-1.5 mt-0.5 flex-shrink-0">
          <User className="h-4 w-4" />
        </div>
      )}
    </motion.div>
  );
};

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
      initialMessages: [
        {
          id: "initial-1",
          role: "assistant",
          content:
            "Hi there! I'm Archi. Ask me anything about Aditya Rahmad or how I can help you!",
        },
      ],
    });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChat = () => setIsOpen((prev) => !prev);
  const minimizeChat = () => setIsMinimized((prev) => !prev);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? "4rem" : "clamp(300px, 80vh, 500px)",
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-80 md:w-96 shadow-xl"
          >
            <Card className="h-full flex flex-col overflow-hidden">
              <CardHeader
                className="p-3 border-b flex flex-row items-center justify-between bg-card-foreground text-card cursor-pointer"
                onClick={minimizeChat}
              >
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  <h3 className="font-medium text-sm">Archi Assistant</h3>
                </div>
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-card hover:bg-white/20"
                    onClick={(e) => {
                      e.stopPropagation();
                      minimizeChat();
                    }}
                  >
                    {isMinimized ? (
                      <Maximize2 className="h-4 w-4" />
                    ) : (
                      <Minimize2 className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-card hover:bg-white/20"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleChat();
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <AnimatePresence>
                {!isMinimized && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col flex-1 min-h-0"
                  >
                    <CardContent className="p-4 flex-1 overflow-y-auto">
                      <div className="flex flex-col gap-4">
                        {messages.map((m) => (
                          <ChatMessage key={m.id} message={m} />
                        ))}
                        {isLoading &&
                          messages[messages.length - 1]?.role === "user" && (
                            <ChatMessage
                              message={{
                                id: "loading",
                                role: "assistant",
                                content: "...",
                              }}
                            />
                          )}
                        <div ref={messagesEndRef} />
                      </div>
                    </CardContent>

                    <CardFooter className="p-3 border-t">
                      <form
                        className="flex w-full gap-2"
                        onSubmit={handleSubmit}
                      >
                        <Input
                          value={input}
                          onChange={handleInputChange}
                          placeholder="Type your message..."
                          disabled={isLoading}
                          className="flex-1"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleSubmit(e);
                            }
                          }}
                        />
                        <Button
                          type="submit"
                          size="icon"
                          disabled={isLoading || !input.trim()}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </form>
                    </CardFooter>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Button
            onClick={toggleChat}
            className="rounded-full h-14 w-14 shadow-lg"
          >
            <Bot className="h-7 w-7" />
          </Button>
        </motion.div>
      )}
    </div>
  );
}
