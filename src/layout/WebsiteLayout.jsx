import React, { useState, useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
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

// ─── Floating Back-To-Top Button Component ────────────────────────────────────
function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 350) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      title="Back to top"
      className="fixed bottom-6 left-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#2B3B32] text-white shadow-lg transition-all duration-300 hover:bg-[#B87E58] hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#B87E58] focus:ring-offset-2"
    >
      <ArrowUp className="h-5 w-5 stroke-[2]" />
    </button>
  );
}

// ─── Main Website Layout Component ────────────────────────────────────────────
export default function WebsiteLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-[#F5F4F0] text-[#4A5652] overflow-x-hidden flex flex-col justify-between">
      {/* 1. Automatic Scroll Reset on Navigation */}
      <ScrollToTop />

      {/* 2. Accessible Skip Link for Screen Readers & Keyboard Navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-[#2B3B32] focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* 3. Sticky Top Navbar */}
      <header className="w-full z-40">
        <Navbar />
      </header>

      {/* 4. Main Content Area (supports children or React Router <Outlet />) */}
      <main
        id="main-content"
        className="w-full flex-1 flex flex-col items-center justify-center"
      >
        {children || <Outlet />}
      </main>

      {/* 5. Floating Back To Top Button */}
      <BackToTopButton />

      {/* 6. Site Footer */}
      <Footer />

      {/* 7. End-to-End AI Real Estate Concierge Chatbot */}
      <ChatbotWidget />
    </div>
  );
}
