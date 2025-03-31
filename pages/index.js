import { useState, useEffect } from 'react';

export default function InfoPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [placeholder, setPlaceholder] = useState('');

  useEffect(() => {
    const welcome = "Hei! Hva lurer du på?";
    let i = 0;
    setIsTyping(true);
    const interval = setInterval(() => {
      setMessages([{ from: 'bot', text: welcome.slice(0, i + 1) }]);
      i++;
      if (i === welcome.length) {
        clearInterval(interval);
        setIsTyping(false);
        setPlaceholder('Spør meg om Skillhouse...');
      }
    }, 40);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    const question = input.trim();
    setMessages((prev) => [...prev, { from: 'user', text: question }]);
    setInput('');
    setIsTyping(true);
    let i = 0;
    const answer = "Takk for spørsmålet! Skillhouse leverer rådgivning innen teknologi, ingeniørfag og salg.";
    const interval = setInterval(() => {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { from: 'bot', text: answer.slice(0, i + 1) }
      ]);
      i++;
      if (i === answer.length) {
        clearInterval(interval);
        setIsTyping(false);
        setPlaceholder('Vil du høre en suksesshistorie?');
      }
    }, 30);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 pt-24 relative">
      <div className="w-full max-w-2xl">
        {messages.map((msg, i) => (
          <p key={i} className={`whitespace-pre-wrap mb-4 ${msg.from === 'bot' ? 'italic' : 'font-semibold'}`}>
            {msg.text}
          </p>
        ))}
        {isTyping && <p className="italic text-gray-400 mb-4">Skillbot skriver...</p>}
        <div className="flex items-center mt-4">
          <input
            type="text"
            className="bg-transparent border-none text-skillwhite placeholder-gray-500 focus:outline-none flex-1 text-lg"
            placeholder={placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            className="ml-4 p-2 bg-skillgreen rounded-md hover:bg-opacity-80 transition"
            aria-label="Send"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7-7l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 opacity-50">
        <img src="/skillhouse-logo.svg" alt="Skillhouse logo" className="h-5" />
      </div>
    </main>
  );
}