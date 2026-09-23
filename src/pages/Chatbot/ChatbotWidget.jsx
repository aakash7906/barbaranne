import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  RotateCcw,
  ArrowRight,
  ChevronDown,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import {
  INITIAL_MESSAGES,
  QUICK_PROMPTS,
  getAIResponse,
} from './knowledgeBase';

export default function ChatbotWidget() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isTyping]);

  // Format time (e.g., 6:54 PM)
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Handle sending a user message
  const handleSend = (textToSend) => {
    const query = typeof textToSend === 'string' ? textToSend : inputVal;
    if (!query || !query.trim()) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputVal('');
    setHasInteracted(true);
    setIsTyping(true);

    // Simulate AI thinking and response delay (500ms - 900ms)
    setTimeout(() => {
      const botResponse = getAIResponse(query);
      const botMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponse.text,
        timestamp: getCurrentTime(),
        actions: botResponse.actions || [],
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 700);
  };

  // Reset chat to initial greeting
  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
    setInputVal('');
    setIsTyping(false);
  };

  // Handle action click
  const handleActionClick = (path) => {
    navigate(path);
  };

  // Render markdown-like bold text & bullet points cleanly
  const renderFormattedText = (rawText) => {
    const lines = rawText.split('\n');
    return lines.map((line, lineIdx) => {
      // Parse **bold** fragments
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedParts = parts.map((part, partIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={partIdx} className="font-medium text-[#233B33]">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      return (
        <span key={lineIdx} className="block leading-relaxed">
          {formattedParts}
        </span>
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* ── Chat Window Modal ──────────────────────────────────────────────── */}
      {isOpen && (
        <div
          className="mb-4 w-[92vw] sm:w-[390px] h-[540px] max-h-[82vh] bg-[#FAF9F5] rounded-2xl shadow-2xl border border-[#233B33]/15 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300"
          style={{
            boxShadow: '0 20px 40px -15px rgba(35, 59, 51, 0.25), 0 0 20px rgba(0,0,0,0.06)',
          }}
        >
          {/* ── 1. Top Luxury Header ───────────────────────────────────────── */}
          <div className="bg-[#233B33] text-white px-5 py-4 flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-3">
              {/* Avatar with live online pulse */}
              <div className="relative">
                <img
                  src="/berne.jpg"
                  alt="Barbaranne Hill-Irving"
                  className="w-10 h-10 rounded-full object-cover object-top border-2 border-[#B87E58]"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#233B33] rounded-full animate-pulse" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3
                    className="text-sm font-medium tracking-wide text-white leading-tight"
                    style={{ fontFamily: '"Jost", "Outfit", sans-serif' }}
                  >
                    Barbaranne Hill-Irving
                  </h3>
                  <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] bg-[#B87E58]/30 text-[#E8D9C8] font-light">
                    <Sparkles className="w-2.5 h-2.5" /> AI
                  </span>
                </div>
                <p className="text-[11px] text-[#A3B3AC] font-light mt-0.5 flex items-center gap-1">
                  Luxury Real Estate Concierge
                </p>
              </div>
            </div>

            {/* Header Action Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Restart Conversation"
                className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                aria-label="Restart chat"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ── 2. Message History Stream ──────────────────────────────────── */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-light">
            {/* Timestamp Notice */}
            <div className="flex justify-center my-1">
              <span className="text-[10px] text-[#8C9B94] px-2 py-0.5 bg-[#233B33]/5 rounded-full flex items-center gap-1">
                <Clock className="w-2.5 h-2.5" /> Instant AI Advisory • 24/7
              </span>
            </div>

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                {/* Bubble Container */}
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 shadow-sm text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#233B33] text-white rounded-br-none'
                      : 'bg-white text-[#3F524A] border border-[#233B33]/10 rounded-bl-none'
                  }`}
                  style={{ fontFamily: '"Jost", "Outfit", -apple-system, sans-serif' }}
                >
                  {renderFormattedText(msg.text)}

                  {/* Interactive Action Buttons inside Bot Message */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-[#233B33]/10 flex flex-col gap-1.5">
                      {msg.actions.map((act, i) => (
                        <button
                          key={i}
                          onClick={() => handleActionClick(act.path)}
                          className="w-full inline-flex items-center justify-between px-3 py-2 text-[11px] font-normal text-[#233B33] bg-[#F7F6F0] hover:bg-[#B87E58] hover:text-white rounded-lg transition-all duration-200 border border-[#B87E58]/30 group cursor-pointer"
                        >
                          <span>{act.label}</span>
                          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Message Timestamp */}
                <span className="text-[9.5px] text-[#8C9B94] mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Simulated Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-[#3F524A]">
                <div className="bg-white border border-[#233B33]/10 rounded-2xl rounded-bl-none px-4 py-2.5 shadow-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#B87E58] rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-[#B87E58] rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-[#B87E58] rounded-full animate-bounce" />
                </div>
                <span className="text-[10px] text-[#8C9B94] italic">
                  Barbaranne's AI is replying...
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ── 3. Quick Prompt Chips ──────────────────────────────────────── */}
          <div className="bg-[#FAF9F5] px-3.5 py-2 border-t border-[#233B33]/8 overflow-x-auto no-scrollbar flex items-center gap-1.5">
            {QUICK_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="shrink-0 text-[10.5px] px-2.5 py-1 rounded-full bg-white text-[#233B33] border border-[#233B33]/15 hover:border-[#B87E58] hover:bg-[#F7F6F0] hover:text-[#B87E58] transition-all cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* ── 4. Input Bar ──────────────────────────────────────────────── */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputVal);
            }}
            className="p-3 bg-white border-t border-[#233B33]/10 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask about properties, investments, valuation..."
              className="flex-1 bg-[#FAF9F5] border border-[#233B33]/15 rounded-xl px-3.5 py-2 text-xs text-[#233B33] placeholder-[#8C9B94] focus:outline-none focus:border-[#B87E58] focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!inputVal.trim() || isTyping}
              className={`p-2 rounded-xl text-white transition-all cursor-pointer flex items-center justify-center ${
                inputVal.trim() && !isTyping
                  ? 'bg-[#233B33] hover:bg-[#B87E58] scale-100 shadow-sm'
                  : 'bg-[#233B33]/30 text-white/50 cursor-not-allowed'
              }`}
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* ── 5. Subtle Footer Note ─────────────────────────────────────── */}
          <div className="bg-[#FAF9F5] px-3 py-1 text-center border-t border-[#233B33]/5">
            <span className="text-[9.5px] text-[#8C9B94] tracking-tight">
              Barbaranne Hill-Irving Real Estate Advisor • Confidential & Instant
            </span>
          </div>
        </div>
      )}

      {/* ── Floating Launcher Button ──────────────────────────────────────── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center h-14 w-14 rounded-full bg-[#233B33] text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#2D3E35] focus:outline-none cursor-pointer border border-[#B87E58]/40"
        aria-label={isOpen ? 'Close AI Chat' : 'Open AI Real Estate Concierge'}
      >
        {/* Pulsing online ring when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-[#B87E58]/25 animate-ping -z-10" />
        )}

        {isOpen ? (
          <X className="w-6 h-6 text-white transition-transform group-hover:rotate-90" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#B87E58] rounded-full border-2 border-[#233B33]" />
          </div>
        )}
      </button>
    </div>
  );
}
