import { useEffect, useState } from "react";

export default function InfoPage() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hei! Hva lurer du på om Skillhouse?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = { from: "user", text: input.trim() };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: `Interessant spørsmål om "${newMessage.text}"! Jeg jobber med svaret.` }
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-between py-10 px-4">
      <div className="w-full max-w-xl flex flex-col gap-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`px-4 py-3 rounded-2xl max-w-[80%] whitespace-pre-wrap ${
              msg.from === "bot"
                ? "bg-[#2bb77b] text-black self-start"
                : "bg-[#fcfcf2] text-black self-end"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {isTyping && (
          <div className="text-sm italic text-gray-400">Skillbot skriver...</div>
        )}
      </div>
      <div className="w-full max-w-xl mt-6 flex gap-2">
        <input
          className="flex-1 px-4 py-3 rounded-2xl text-black"
          placeholder="Spør meg om Skillhouse..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-[#2bb77b] text-black font-semibold px-6 py-3 rounded-2xl"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
      <div className="mt-12 text-xs opacity-60">
        Skillhouse • InfoPage • <img src="/skillhouse-logo.svg" alt="Skillhouse logo" className="inline h-4 ml-1" />
      </div>
    </main>
  );
}