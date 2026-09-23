import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Wifi,
  WifiOff,
} from 'lucide-react';
import './Chatbot.css';
import {
  INITIAL_MESSAGES,
  QUICK_PROMPTS,
} from './knowledgeBase';
import {
  askRealEstateAssistant,
  getGeminiApiKey,
  saveGeminiApiKey,
  isGeminiConnected,
} from './geminiService';

const createMessageId = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export default function ChatbotWidget() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  
  // Gemini API key state & drawer
  const [showApiKeyDrawer, setShowApiKeyDrawer] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [hasGeminiKey, setHasGeminiKey] = useState(false);
  const [saveStatusMsg, setSaveStatusMsg] = useState('');
  const [saveStatusType, setSaveStatusType] = useState('success'); // 'success' | 'error' | 'info'

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const statusTimeoutRef = useRef(null);

  // Sync Gemini connection status on mount
  useEffect(() => {
    const connected = isGeminiConnected();
    setHasGeminiKey(connected);
    // Don't pre-fill the API key for security — show masked placeholder instead
    if (connected) {
      const key = getGeminiApiKey();
      setApiKeyInput(key || '');
    }
  }, []);

  // Auto-scroll to bottom of chat
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isTyping, scrollToBottom]);

  // Format time (e.g., 6:54 PM)
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Handle sending a user message
  const handleSend = async (textToSend) => {
    const query = typeof textToSend === 'string' ? textToSend : inputVal;
    if (!query || !query.trim() || isTyping) return;

    const userMessage = {
      id: createMessageId('user'),
      sender: 'user',
      text: query.trim(),
      timestamp: getCurrentTime(),
    };

    const updatedHistory = [...messages, userMessage];
    setMessages(updatedHistory);
    setInputVal('');
    setIsTyping(true);

    try {
      // Connect live to Gemini AI or fallback smoothly to curated KB
      const aiResponse = await askRealEstateAssistant(query.trim(), updatedHistory);

      const botMessage = {
        id: createMessageId('bot'),
        sender: 'bot',
        text: aiResponse.text,
        timestamp: getCurrentTime(),
        actions: aiResponse.actions || [],
        isLiveAI: aiResponse.isLiveAI,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: createMessageId('bot'),
          sender: 'bot',
          text: "I appreciate your patience! Barbaranne Hill-Irving specializes in luxury property investments, acquisitions, and property tax valuations across Clearwater Beach and Tampa Bay. How can I assist you with your property journey?",
          timestamp: getCurrentTime(),
          actions: [
            { label: 'Book 1-Hr Free Consultation', path: '/booking' },
            { label: 'Contact Barbaranne Directly', path: '/contact' },
          ],
          isLiveAI: false,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Reset chat to initial greeting
  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
    setInputVal('');
    setIsTyping(false);
  };

  // Handle action click
  const handleActionClick = (path) => {
    if (path.startsWith('http')) {
      window.open(path, '_blank', 'noopener,noreferrer');
    } else if (path.startsWith('tel:') || path.startsWith('mailto:')) {
      window.open(path, '_self');
    } else {
      navigate(path);
    }
  };

  // Show a status message with auto-clear
  const showStatus = (message, type = 'success', duration = 2500) => {
    if (statusTimeoutRef.current) clearTimeout(statusTimeoutRef.current);
    setSaveStatusMsg(message);
    setSaveStatusType(type);
    statusTimeoutRef.current = setTimeout(() => {
      setSaveStatusMsg('');
      setSaveStatusType('success');
    }, duration);
  };

  // Save or clear user's Gemini API Key
  const handleSaveApiKey = (e) => {
    e.preventDefault();
    const cleanKey = apiKeyInput.trim();
    
    if (cleanKey) {
      // Validate key format before saving
      if (!cleanKey.startsWith('AIza') || cleanKey.length < 30) {
        showStatus('Invalid key format. Gemini keys start with "AIza" and are ~39 characters.', 'error', 4000);
        return;
      }
      saveGeminiApiKey(cleanKey);
      setHasGeminiKey(true);
      showStatus('✓ Gemini AI connected successfully!', 'success');
      setTimeout(() => setShowApiKeyDrawer(false), 1800);
    } else {
      saveGeminiApiKey('');
      setHasGeminiKey(false);
      showStatus('Gemini key removed. Using offline advisory.', 'info');
    }
  };

  // Disconnect Gemini
  const handleDisconnectGemini = () => {
    setApiKeyInput('');
    saveGeminiApiKey('');
    setHasGeminiKey(false);
    showStatus('Gemini disconnected. Using offline advisory.', 'info');
  };

  // Render markdown-like bold text, links & bullet points cleanly
  const renderFormattedText = (rawText) => {
    if (!rawText) return null;
    const lines = rawText.split('\n');
    
    return lines.map((line, lineIdx) => {
      // Detect bullet points (- , * , or numbered 1. 2. etc.)
      const bulletMatch = line.match(/^(\s*)([-*•]|\d+\.)\s+(.*)/);
      const isBullet = Boolean(bulletMatch);
      const bulletContent = isBullet ? bulletMatch[3] : line;
      const indentLevel = isBullet ? Math.floor((bulletMatch[1] || '').length / 2) : 0;

      // Parse the line content for links and bold formatting
      const parseInlineContent = (text) => {
        const elements = [];
        // Regex to find [title](href) links and **bold** text
        const inlineRegex = /(\*\*.*?\*\*|\[.*?\]\(.*?\))/g;
        let lastIdx = 0;
        let matchResult;

        while ((matchResult = inlineRegex.exec(text)) !== null) {
          // Add plain text before this match
          if (matchResult.index > lastIdx) {
            elements.push(text.substring(lastIdx, matchResult.index));
          }

          const fragment = matchResult[0];

          if (fragment.startsWith('**') && fragment.endsWith('**')) {
            // Bold text
            elements.push(
              <strong key={`bold-${lineIdx}-${matchResult.index}`} style={{ fontWeight: 600, color: '#1F342D' }}>
                {fragment.slice(2, -2)}
              </strong>
            );
          } else if (fragment.startsWith('[')) {
            // Link [title](href)
            const linkMatch = fragment.match(/\[(.*?)\]\((.*?)\)/);
            if (linkMatch) {
              const linkTitle = linkMatch[1];
              const linkUrl = linkMatch[2];
              elements.push(
                <a
                  key={`link-${lineIdx}-${matchResult.index}`}
                  href={linkUrl}
                  onClick={(e) => {
                    if (linkUrl.startsWith('/')) {
                      e.preventDefault();
                      navigate(linkUrl);
                    }
                  }}
                  target={linkUrl.startsWith('http') ? '_blank' : undefined}
                  rel={linkUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{
                    color: '#B87E58',
                    textDecoration: 'underline',
                    fontWeight: 500,
                  }}
                >
                  {linkTitle}
                </a>
              );
            }
          }

          lastIdx = matchResult.index + fragment.length;
        }

        // Add remaining plain text
        if (lastIdx < text.length) {
          elements.push(text.substring(lastIdx));
        }

        return elements.length > 0 ? elements : [text];
      };

      const parsedContent = parseInlineContent(bulletContent);

      // Empty line = spacer
      if (!line.trim()) {
        return <span key={lineIdx} style={{ display: 'block', height: '6px' }} />;
      }

      return (
        <span
          key={lineIdx}
          style={{
            display: 'block',
            lineHeight: '1.65',
            marginTop: lineIdx > 0 && line.trim() ? '3px' : '0',
            paddingLeft: isBullet ? `${12 + indentLevel * 12}px` : '0',
            position: 'relative',
          }}
        >
          {isBullet && (
            <span style={{ position: 'absolute', left: `${indentLevel * 12}px`, color: '#B87E58', fontWeight: 600 }}>•</span>
          )}
          {parsedContent}
        </span>
      );
    });
  };

  return (
    <div className="luxury-chatbot-container">
      {/* ── Chat Window Modal ──────────────────────────────────────────────── */}
      {isOpen && (
        <div className="luxury-chatbot-window">
          {/* ── 1. Top Luxury Header ───────────────────────────────────────── */}
          <div className="luxury-chatbot-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Avatar with live online pulse */}
              <div className="luxury-chatbot-avatar-wrap">
                <img
                  src="/berne.jpg"
                  alt="Barbaranne Hill-Irving"
                  className="luxury-chatbot-avatar"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <span className="luxury-chatbot-online-dot" />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <h3 className="luxury-chatbot-title">
                    Barbaranne Hill-Irving
                  </h3>
                  <span className={`luxury-chatbot-badge-ai ${hasGeminiKey ? 'live' : ''}`}>
                    {hasGeminiKey ? <Wifi size={10} /> : <Sparkles size={10} />}
                    {hasGeminiKey ? 'Gemini Live' : 'AI Advisory'}
                  </span>
                </div>
                <p className="luxury-chatbot-subtitle">
                  Luxury Real Estate Concierge
                </p>
              </div>
            </div>

            {/* Header Action Buttons */}
            <div className="luxury-chatbot-header-actions">
              {/* Gemini Key Settings Toggle */}
              <button
                type="button"
                onClick={() => setShowApiKeyDrawer((prev) => !prev)}
                title={hasGeminiKey ? "Gemini AI Active — Click for settings" : "Configure Gemini AI API Key"}
                className="luxury-chatbot-icon-btn"
                style={{
                  color: hasGeminiKey ? '#F5C79E' : 'rgba(255,255,255,0.7)',
                  backgroundColor: showApiKeyDrawer ? 'rgba(255,255,255,0.15)' : 'transparent',
                }}
                aria-label="Gemini API Key settings"
              >
                <KeyRound size={15} />
              </button>

              {/* Reset Conversation */}
              <button
                type="button"
                onClick={handleResetChat}
                title="Restart Conversation"
                className="luxury-chatbot-icon-btn"
                aria-label="Restart chat"
              >
                <RotateCcw size={14} />
              </button>

              {/* Minimize / Close */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Minimize chat"
                className="luxury-chatbot-icon-btn"
                aria-label="Close chat"
              >
                <ChevronDown size={17} />
              </button>
            </div>
          </div>

          {/* ── 1.1 Gemini API Key Settings Drawer (Optional/Collapsible) ──── */}
          {showApiKeyDrawer && (
            <div className="luxury-chatbot-apikey-drawer">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', fontWeight: 500, color: '#233B33', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Sparkles size={12} color="#B87E58" />
                  Google Gemini AI Setup
                </span>
                <span style={{ fontSize: '9.5px', color: hasGeminiKey ? '#1F7A4C' : '#8C9B94', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  {hasGeminiKey ? <CheckCircle2 size={11} /> : <WifiOff size={11} />}
                  {hasGeminiKey ? 'Live Mode Active' : 'Offline Advisory'}
                </span>
              </div>

              <p style={{ margin: 0, fontSize: '10px', color: '#6C7D76', lineHeight: '1.4' }}>
                Enter your Google Gemini API Key to enable real-time AI responses.{' '}
                <a 
                  href="https://aistudio.google.com/app/apikey" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: '#B87E58', textDecoration: 'underline' }}
                >
                  Get a free key here
                </a>.
              </p>

              <form onSubmit={handleSaveApiKey} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <input
                  type="password"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder="Paste your Gemini API Key (AIza...)"
                  className="luxury-chatbot-apikey-input"
                  autoComplete="off"
                />

                <div className="luxury-chatbot-apikey-actions">
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button type="submit" className="luxury-chatbot-apikey-btn-primary">
                      Save & Connect
                    </button>
                    {hasGeminiKey && (
                      <button
                        type="button"
                        onClick={handleDisconnectGemini}
                        className="luxury-chatbot-apikey-btn-secondary"
                      >
                        Disconnect
                      </button>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowApiKeyDrawer(false)}
                    className="luxury-chatbot-apikey-btn-secondary"
                  >
                    Close
                  </button>
                </div>
              </form>

              {saveStatusMsg && (
                <div 
                  className={`luxury-chatbot-status-msg ${saveStatusType}`}
                  style={{ 
                    fontSize: '10px', 
                    fontWeight: 500, 
                    textAlign: 'center',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    color: saveStatusType === 'error' ? '#DC2626' : saveStatusType === 'info' ? '#6C7D76' : '#B87E58',
                    backgroundColor: saveStatusType === 'error' ? 'rgba(220,38,38,0.08)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                  }}
                >
                  {saveStatusType === 'error' && <AlertCircle size={12} />}
                  {saveStatusMsg}
                </div>
              )}
            </div>
          )}

          {/* ── 2. Message History Stream ──────────────────────────────────── */}
          <div className="luxury-chatbot-messages">
            {/* Timestamp Notice */}
            <div style={{ display: 'flex', justifyContent: 'center', margin: '2px 0 6px 0' }}>
              <span className="luxury-chatbot-badge-notice">
                <Clock size={11} color="#B87E58" />
                {hasGeminiKey ? 'Gemini AI Live • Instant Advisory' : 'Real Estate Concierge • 24/7 Advisory'}
              </span>
            </div>

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`luxury-chatbot-msg-row ${msg.sender === 'user' ? 'user' : 'bot'}`}
              >
                {/* Bubble Container */}
                <div className="luxury-chatbot-bubble">
                  {renderFormattedText(msg.text)}

                  {/* Interactive Action Buttons inside Bot Message */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="luxury-chatbot-actions-wrap">
                      {msg.actions.map((act, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleActionClick(act.path)}
                          className="luxury-chatbot-action-btn"
                        >
                          <span>{act.label}</span>
                          <ArrowRight size={13} style={{ flexShrink: 0, marginLeft: '6px' }} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Message Timestamp & Live Tag */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <span className="luxury-chatbot-timestamp">
                    {msg.timestamp}
                  </span>
                  {msg.isLiveAI && (
                    <span
                      style={{
                        fontSize: '8.5px',
                        color: '#B87E58',
                        fontWeight: 500,
                        letterSpacing: '0.02em',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px',
                      }}
                    >
                      <Wifi size={9} />
                      Gemini AI
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="luxury-chatbot-typing-row">
                <div className="luxury-chatbot-typing-bubble">
                  <span className="luxury-chatbot-dot" />
                  <span className="luxury-chatbot-dot" />
                  <span className="luxury-chatbot-dot" />
                </div>
                <span style={{ fontSize: '10px', color: '#8C9B94', fontStyle: 'italic' }}>
                  {hasGeminiKey ? "Gemini AI is composing..." : "Composing response..."}
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ── 3. Quick Prompt Chips ──────────────────────────────────────── */}
          <div className="luxury-chatbot-chips">
            {QUICK_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSend(prompt)}
                className="luxury-chatbot-chip-btn"
                disabled={isTyping}
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
            className="luxury-chatbot-input-form"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={isTyping ? "Waiting for response..." : "Ask about properties, investments, valuation..."}
              className="luxury-chatbot-input"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!inputVal.trim() || isTyping}
              className="luxury-chatbot-send-btn"
              aria-label="Send message"
            >
              <Send size={15} />
            </button>
          </form>

          {/* ── 5. Subtle Footer Note ─────────────────────────────────────── */}
          <div className="luxury-chatbot-footer">
            {hasGeminiKey 
              ? 'Powered by Google Gemini AI • Barbaranne Hill-Irving Real Estate'
              : 'Barbaranne Hill-Irving Real Estate Advisor • Confidential & Instant'
            }
          </div>
        </div>
      )}

      {/* ── Floating Launcher Button ──────────────────────────────────────── */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`luxury-chatbot-launcher ${isOpen ? 'open' : ''}`}
        aria-label={isOpen ? 'Close AI Chat' : 'Open AI Real Estate Concierge'}
      >
        {/* Pulsing online ring when closed */}
        {!isOpen && <span className="luxury-chatbot-pulse-ring" />}

        {isOpen ? (
          <X size={24} color="#FFFFFF" />
        ) : (
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MessageSquare size={24} color="#FFFFFF" />
            <span className="luxury-chatbot-launcher-badge" />
          </div>
        )}
      </button>
    </div>
  );
}
