import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m your Inter-India assistant. Ask me about allocations, matches, or career insights.' },
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const onSend = () => {
    const text = input.trim();
    if (!text) return;
    const userMessage = { role: 'user', content: text };
    const botReply = {
      role: 'assistant',
      content:
        text.toLowerCase().includes('top matches') || text.toLowerCase().includes('suit')
          ? 'Based on your profile, roles in Data Analytics, Cybersecurity, and Web Development look promising.'
          : text.toLowerCase().includes('how') && text.toLowerCase().includes('allocation')
          ? 'Allocations consider skill overlap (50%), academics (20%), domain fit (15%), location (10%), and availability (5%).'
          : 'Got it! I\'ll surface insights and guidance as we build your profile.'
    };
    setMessages((m) => [...m, userMessage, botReply]);
    setInput('');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-3 w-[320px] overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900 text-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-indigo-600/20 to-fuchsia-600/20 px-4 py-3">
            <div className="text-sm font-medium">Inter-India Assistant</div>
            <button
              aria-label="Close chatbot"
              className="rounded-md p-1 text-white/70 hover:bg-white/10 hover:text-white"
              onClick={() => setOpen(false)}
            >
              <X size={16} />
            </button>
          </div>
          <div className="max-h-72 space-y-3 overflow-y-auto px-4 py-3 text-sm">
            {messages.map((m, idx) => (
              <div key={idx} className={m.role === 'assistant' ? 'text-white/90' : 'text-white/80'}>
                <span className="mr-2 rounded-md bg-white/5 px-2 py-1 text-xs font-medium text-white/70">
                  {m.role === 'assistant' ? 'Assistant' : 'You'}
                </span>
                <span>{m.content}</span>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="flex items-center gap-2 border-t border-white/10 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSend()}
              placeholder="Ask about matches, allocation, skills..."
              className="flex-1 rounded-lg border border-white/10 bg-slate-800/80 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={onSend}
              className="inline-flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg ring-1 ring-indigo-400/50 transition hover:bg-indigo-500"
        aria-label="Open chatbot"
        title="Chat with Inter-India Assistant"
      >
        <MessageCircle size={22} />
      </button>
    </div>
  );
}
