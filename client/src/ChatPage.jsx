import { useState, useRef, useEffect } from "react";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, { sender: "User", text: input }]);

      try {
        const response = await fetch("http://localhost:3000/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: input }),
        });

        const data = await response.json();
        setMessages((prev) => [...prev, { sender: "Server", text: data.reply }]);
      } catch (error) {
        console.error("Error sending message:", error);
      }

      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="fixed top-0 w-full bg-white shadow-sm z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => window.history.back()} className="text-teal-600 text-lg font-bold">
            ←
          </button>
          <h1 className="font-medium text-gray-800">Smart Assistant</h1>
          <i className="fas fa-robot text-teal-600 text-xl"></i>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto px-4 py-4 mt-14">
        <div className="max-w-screen-sm mx-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === "User" ? "justify-end" : "justify-start"} mb-4`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  message.sender === "User"
                    ? "bg-blue-500 text-white"
                    : "bg-white shadow-sm"
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      </main>
      <div className="border-t bg-white px-4 py-4">
        <div className="max-w-screen-sm mx-auto flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="w-full resize-none rounded-full px-4 py-2 pr-12 border border-gray-200 focus:outline-none focus:border-blue-500 text-sm"
            rows={1}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
          />
          <button
            onClick={handleSend}
            className="!rounded-button bg-teal-600 text-white px-6 py-2 text-sm font-medium hover:bg-teal-700 transition-colors flex items-center justify-center"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
