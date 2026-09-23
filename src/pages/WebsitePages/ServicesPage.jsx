import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ─── Minimalist Architectural Line Art Icons ─────────────────────────────────
const StairIcon = () => (
  <svg width="48" height="48" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <path d="M8 42H18V32H28V22H38" stroke="#B87E58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="34" cy="14" r="4.5" fill="#E4DCD2" />
  </svg>
);

const HouseRoofIcon = () => (
  <svg width="48" height="48" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <path d="M12 40V25L27 13L42 25V40" stroke="#B87E58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="27" cy="34" r="4.5" fill="#E4DCD2" />
  </svg>
);

const ValuationDiagonalIcon = () => (
  <svg width="48" height="48" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <line x1="18" y1="44" x2="38" y2="10" stroke="#B87E58" strokeWidth="2" strokeLinecap="round" />
    <circle cx="10" cy="36" r="4.5" fill="#E4DCD2" />
    <circle cx="44" cy="24" r="4.5" fill="#E4DCD2" />
  </svg>
);

// ─── Services Data ─────────────────────────────────────────────────────────────
const SERVICES_DATA = [
  {
    icon: <StairIcon />,
    title: 'Investment Planning',
    desc: "I'm a paragraph. Click here to add your own text and edit me. It's easy. Just click \"Edit Text\" or double click me to add your own content and make changes to the font. I'm a great place for you to tell a story and let your users know a little more about you.",
  },
  {
    icon: <HouseRoofIcon />,
    title: 'Real Estate Guidance',
    desc: "I'm a paragraph. Click here to add your own text and edit me. It's easy. Just click \"Edit Text\" or double click me to add your own content and make changes to the font. I'm a great place for you to tell a story and let your users know a little more about you.",
  },
  {
    icon: <ValuationDiagonalIcon />,
    title: 'Property Tax Valuation',
    desc: "I'm a paragraph. Click here to add your own text and edit me. It's easy. Just click \"Edit Text\" or double click me to add your own content and make changes to the font. I'm a great place for you to tell a story and let your users know a little more about you.",
  },
];

// ─── Services Page Component ───────────────────────────────────────────────────
export default function ServicesPage() {
  const navigate = useNavigate();

  // Scroll to top when page is mounted
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="w-full bg-white flex flex-col items-center">
      {/* ── Top Cream Header Banner ── */}
      <section
        className="w-full bg-[#F7F6F0] flex flex-col items-center justify-center"
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
          Services
        </h1>
      </section>

      {/* ── Main White Content Card Overlapping the Banner ── */}
      <section className="w-full max-w-[880px] px-4 sm:px-6 -mt-[88px] z-10 mb-20 sm:mb-28">
        <div
          className="bg-white w-full flex flex-col items-center shadow-none"
          style={{
            paddingTop: '55px',
            paddingBottom: '70px',
            paddingLeft: '32px',
            paddingRight: '32px',
          }}
        >
          {/* Services List */}
          <div className="w-full max-w-[580px] flex flex-col items-center">
            {SERVICES_DATA.map((service, index) => (
              <React.Fragment key={service.title}>
                {/* Single Service Item Row */}
                <div className="w-full flex flex-row items-start text-left gap-7 sm:gap-9">
                  {/* Icon */}
                  <div className="shrink-0 flex items-start justify-center pt-0.5">
                    {service.icon}
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 flex flex-col items-start text-left">
                    <h2
                      className="text-[20px] sm:text-[22px] font-normal text-[#233B33] tracking-[-0.01em]"
                      style={{
                        fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif',
                        marginBottom: '10px',
                      }}
                    >
                      {service.title}
                    </h2>
                    <p
                      className="text-[12px] sm:text-[12.5px] font-light text-[#3F524A] leading-[1.75]"
                      style={{
                        fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif',
                      }}
                    >
                      {service.desc}
                    </p>
                  </div>
                </div>

                {/* Divider between items */}
                {index < SERVICES_DATA.length - 1 && (
                  <div
                    className="w-full"
                    style={{
                      borderBottom: '1px solid #E5E7EB',
                      marginTop: '34px',
                      marginBottom: '34px',
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Book Free Consultation CTA Button */}
          <div
            className="flex justify-center items-center w-full"
            style={{ marginTop: '48px' }}
          >
            <button
              onClick={() => navigate('/booking')}
              className="border border-[#B87E58] bg-transparent text-[#233B33] transition-colors duration-300 hover:bg-[#B87E58] hover:text-white cursor-pointer inline-flex items-center justify-center"
              style={{
                fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif',
                width: '210px',
                height: '42px',
                fontSize: '11px',
                letterSpacing: '0.16em',
                fontWeight: 400,
                textTransform: 'uppercase',
              }}
            >
              BOOK FREE CONSULTATION
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
