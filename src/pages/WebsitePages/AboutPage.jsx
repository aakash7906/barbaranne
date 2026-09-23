import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AboutPage() {
  const navigate = useNavigate();

  // Smooth scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="relative w-full bg-white min-h-[calc(100vh-72px)] flex flex-col items-center">
      {/* ── Top Half Split Background (Ivory Band) ─────────────────────────── */}
      <div
        className="absolute top-0 left-0 right-0 w-full bg-[#F5F4F0] pointer-events-none"
        style={{ height: '460px' }}
      />

      {/* ── Page Header: About Title ────────────────────────────────────────── */}
      <section
        className="relative z-10 w-full text-center flex flex-col items-center justify-center shrink-0"
        style={{
          paddingTop: '70px',
          paddingBottom: '70px',
          minHeight: '240px',
        }}
      >
        <h1
          className="text-4xl sm:text-5xl md:text-[62px] font-normal tracking-tight text-[#233B33] text-center leading-none"
          style={{ fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif' }}
        >
          About Me
        </h1>
      </section>

      {/* ── Main Two-Column Split Block ─────────────────────────────────────── */}
      <section
        className="relative z-10 w-full max-w-[1240px] px-4 sm:px-6 md:px-8 shrink-0"
        style={{ maxWidth: '1240px', paddingBottom: '130px' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 shadow-none border-none overflow-hidden">
          {/* Left Column: Terracotta Box with Inset Centered Photo */}
          <div
            className="flex items-center justify-center bg-[#B87E58]"
            style={{
              backgroundColor: '#B87E58',
              minHeight: '580px',
              padding: '60px 40px',
            }}
          >
            <div className="w-[210px] sm:w-[250px] md:w-[275px] aspect-[3/4] overflow-hidden shadow-md transition-transform duration-500 hover:scale-[1.02] flex items-center justify-center">
              <img
                src="/berne.jpg"
                alt="Barbaranne Hill-Irving, Certified Real Estate Consultant"
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>

          {/* Right Column: White Background with Bio Text & Contact CTA */}
          <div
            className="flex flex-col justify-center bg-white"
            style={{
              backgroundColor: '#FFFFFF',
              paddingLeft: '75px',
              paddingRight: '55px',
              paddingTop: '65px',
              paddingBottom: '65px',
            }}
          >
            {/* Title & Qualification */}
            <h2
              className="text-[21px] sm:text-[23px] font-normal tracking-[-0.01em] text-[#233B33] leading-snug"
              style={{
                fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif',
                marginBottom: '12px',
              }}
            >
              Barbaranne Hill-Irving,<br />
              Certified Real Estate Consultant
            </h2>

            {/* Subtitle / Tagline */}
            <p
              className="text-[13px] sm:text-[13.5px] font-light text-[#3F524A]"
              style={{
                fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif',
                marginBottom: '26px',
              }}
            >
              Making Your Vision a Reality
            </p>

            {/* Paragraph 1 */}
            <p
              className="text-[12.5px] font-light leading-[2.0] text-[#3F524A]"
              style={{
                fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif',
                marginBottom: '20px',
              }}
            >
              I am a licensed REALTOR® with Berkshire Hathaway HomeServices Florida Properties Group (BHHS). After relocating from Ohio to Clearwater Beach in April 2016, I can confidently say it was one of the best decisions of my life. I'm passionate about helping others make that same seamless transition to Florida and find their own piece of paradise.
            </p>

            {/* Paragraph 2 */}
            <p
              className="text-[12.5px] font-light leading-[2.0] text-[#3F524A]"
              style={{
                fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif',
                marginBottom: '20px',
              }}
            >
              I am dedicated to delivering exceptional real estate services with integrity, professionalism, and a personalized touch. With a strong understanding of the local market and a commitment to my clients' success, I guide buyers, sellers, and investors through every step of the process with confidence. My attention to detail, skilled negotiation, and genuine passion for helping clients achieve their goals set me apart in today's competitive market.
            </p>

            {/* Paragraph 3 */}
            <p
              className="text-[12.5px] font-light leading-[2.0] text-[#3F524A]"
              style={{
                fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif',
                marginBottom: '38px',
              }}
            >
              To me, real estate is about more than transactions—it's about building lasting relationships. I take pride in guiding my clients through one of life's most important decisions with care, honesty, and dedication. Whether you're buying your first home, selling, or investing, I will work tirelessly to ensure a smooth and successful experience from start to finish.
            </p>

            {/* CTA Button */}
            <div>
              <button
                onClick={() => navigate('/contact')}
                className="border border-[#B87E58] bg-transparent text-[#233B33] transition-colors duration-300 hover:bg-[#B87E58] hover:text-white cursor-pointer inline-flex items-center justify-center"
                style={{
                  fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif',
                  width: '184px',
                  height: '44px',
                  fontSize: '11px',
                  letterSpacing: '0.18em',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                }}
              >
                GET IN TOUCH
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
