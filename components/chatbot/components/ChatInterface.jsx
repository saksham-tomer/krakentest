"use client";

import { useState } from "react";
import ChatMessage from "./ChatMessage";

import { FiSend } from "react-icons/fi";
import { FaDiceD20 } from "react-icons/fa";

import Button from "@/components/ui/Button";
import { PulseLoader } from "react-spinners";

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", type: "bot" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      type: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response
    setIsTyping(true);
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: "This is a simulated response.",
        type: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-1 bg-jacarta-800 shadow-[0_0_5px_#8358ff] h-[90vh] p-4 rounded-lg rounded-tl-none rounded-bl-none  flex flex-col">
      <div className="flex flex-col h-full p-4">
        {/* Chat Messages */}
        <div className="flex flex-col gap-4 flex-1 overflow-y-auto px-4 py-4 mb-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              type={message.type}
            />
          ))}
          {isTyping && (
            <div className="flex gap-2 items-center text-gray-500 text-sm">
              <PulseLoader color="#B9A0FF" size={10} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="flex gap-2 items-end rounded-lg  bg-black shadow-[0_0_5px_#8358ff] p-4">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 resize-none border-none bg-transparent placeholder:font-semibold text-white placeholder:text-jacarta-300 focus:outline-none focus:ring-0 h-full max-h-[120px] "
            rows={1}
          />
          <div className="flex flex-col gap-3">
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              className={`rounded-lg flex items-center justify-center ${
                !inputValue.trim() || isTyping
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700"
              }`}
            >
              <FiSend className="text-xl" />
            </Button>
            <Button className={`rounded-lg flex items-center justify-center `}>
              <FaDiceD20 className="text-xl" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
