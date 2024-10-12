"use client"; // Ensure this is a client component

import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { MessageSquare, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  text: string;
  sender: "user" | "bot";
};

const API_ENDPOINT = "http://localhost:8000/api/chatbot";

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate or retrieve session ID
    const storedSessionId = localStorage.getItem("chatbot_session_id");
    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      const newSessionId = uuidv4();
      localStorage.setItem("chatbot_session_id", newSessionId);
      setSessionId(newSessionId);
    }
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim()) {
      const userMessage: Message = { text: input, sender: "user" };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setError(null);

      try {
        const response = await fetch(API_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: sessionId, message: input }),
        });

        if (!response.ok) {
          throw new Error("Failed to get response from chatbot");
        }

        const data = await response.json();
        const botMessage: Message = { text: data.reply, sender: "bot" };
        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error("Error communicating with chatbot:", error);
        setError("Unable to reach the chatbot. Please try again later.");
      }
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-5 w-80 bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-4 bg-blue-500 text-white flex justify-between items-center">
              <h3 className="font-bold">Chat with Me</h3>
              <Button
                variant="outline"
                size="md"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="h-80 p-4" ref={scrollAreaRef}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 p-2 rounded ${
                    msg.sender === "user"
                      ? "bg-blue-100 ml-auto"
                      : "bg-gray-100"
                  } max-w-[80%]`}
                >
                  {msg.text}
                </div>
              ))}
              {error && (
                <div className="text-red-500 text-center mt-2">{error}</div>
              )}
            </ScrollArea>
            <div className="p-4 border-t">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow"
                />
                <Button type="submit">Send</Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Button
        className="fixed bottom-5 right-5 rounded-full"
        size="md"
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    </>
  );
};

export default Chatbot;
