import React, { useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatbotWidget from '../pages/Chatbot/ChatbotWidget';

// ─── Scroll To Top On Route Change Component ──────────────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

// ─── Main Website Layout Component ────────────────────────────────────────────
export default function WebsiteLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-[#F5F4F0] text-[#4A5652] overflow-x-hidden flex flex-col justify-between">

      <ScrollToTop />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-[#2B3B32] focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-50 w-full">
        <Navbar />
      </header>

      <main
        id="main-content"
        className="w-full flex-1 flex flex-col items-center justify-center"
      >
        {children || <Outlet />}
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}
