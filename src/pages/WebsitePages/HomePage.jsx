import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';

// ─── Minimalist Architectural Line Art Icons (Services) ───────────
const StairIcon = () => (
  <svg width="92" height="92" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:scale-105">
    <path d="M12 50H26V36H40V22H54" stroke="#B87E58" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="48" cy="13" r="5.5" fill="#E4DCD2" />
  </svg>
);

const HouseRoofIcon = () => (
  <svg width="92" height="92" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:scale-105">
    <path d="M16 48V28L32 14L48 28V48" stroke="#B87E58" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="38" r="5.5" fill="#E4DCD2" />
  </svg>
);

const ValuationDiagonalIcon = () => (
  <svg width="92" height="92" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:scale-105">
    <line x1="18" y1="46" x2="46" y2="18" stroke="#B87E58" strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="16" cy="36" r="5.5" fill="#E4DCD2" />
    <circle cx="48" cy="28" r="5.5" fill="#E4DCD2" />
  </svg>
);

// ─── Main Home Page Component ─────────────────────────────────────
export default function HomePage() {
  const navigate = useNavigate();

  // Full-width Architectural Hero Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const bannerSlides = [
    {
      image: '/pool-banner.jpg',
      subtitle: 'Embrace',
      title: 'Your Passion',
    },
    {
      image: '/pool-clean.jpg',
      subtitle: 'Follow',
      title: 'Your Path',
    },
    {
      image: '/villa.jpg',
      subtitle: 'Build',
      title: 'Your Future',
    },
  ];

  // Testimonials Slider State
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonials = [
    {
      author: 'Sheila Patel',
      quote:
        "“I'm a testimonial. Click to edit me and add text that says something nice about you and your services. Let your customers review you and tell their friends how great you are.”",
    },
    {
      author: 'David & Karen Miller',
      quote:
        '“Barbaranne provided exceptional guidance through every step of our luxury estate purchase. Her professionalism, deep market insights, and responsiveness are unmatched.”',
    },
    {
      author: 'Robert Sterling',
      quote:
        '“Barbaranne’s strategic tax valuation and real estate consulting saved our family substantial capital. We wouldn’t consider any real estate investment without her counsel.”',
    },
  ];

  // Contact Form State
  const [contactData, setContactData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Auto cycle slider every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [bannerSlides.length]);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactData.firstName || !contactData.email) return;
    setContactSubmitted(true);
    setTimeout(() => {
      setContactData({ firstName: '', lastName: '', email: '', message: '' });
      setContactSubmitted(false);
    }, 4000);
  };

  return (
    <div className="w-full bg-white flex flex-col items-center justify-center">
      {/* 1. Hero Title & Subtitle — Exact match to screenshot */}
      <section
        className="w-full bg-[#F5F4F0] px-6 text-center flex flex-col items-center justify-center shrink-0"
        style={{
          paddingTop: '70px',
          paddingBottom: '70px',
          minHeight: '240px',
        }}
      >
        <div className="mx-auto flex flex-col items-center justify-center text-center max-w-4xl">
          <h1
            className="text-4xl sm:text-5xl md:text-[62px] font-normal tracking-tight text-[#233B33] text-center leading-none"
            style={{ fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif' }}
          >
            Barbaranne Hill-Irving
          </h1>
          <p
            className="text-[15px] sm:text-[16.5px] tracking-[0.15em] text-[#3F524A] text-center"
            style={{ fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif', fontWeight: 400, marginTop: '24px' }}
          >
            Trusted Real Estate Consultant
          </p>
        </div>
      </section>

      {/* 2. Split 2-Column Banner — Full Bleed & Centered */}
      <section className="w-full bg-[#F5F4F0] flex justify-center items-center px-6 sm:px-10 md:px-16">
        <div className="w-full max-w-[1700px] grid grid-cols-1 md:grid-cols-2 items-center justify-center">
          {/* Left: Portrait */}
          <div className="h-[560px] w-full overflow-hidden sm:h-[680px] md:h-[800px] flex items-center justify-center">
            <img
              src="/berne.jpg"
              alt="Barbaranne Hill-Irving"
              className="h-full w-full object-cover object-top"
            />
          </div>

          {/* Right: Terracotta block — inset photo CENTERED */}
          <div className="flex h-[560px] items-center justify-center bg-[#B87E58] sm:h-[680px] md:h-[800px]">
            <div className="w-[220px] sm:w-[270px] md:w-[310px] aspect-[3/4] overflow-hidden shadow-xl transition-transform duration-500 hover:scale-[1.02] flex items-center justify-center">
              <img
                src="/villa.jpg"
                alt="Luxury Property"
                className="block h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. About Me Section — Exact match to screenshot */}
      <section
        className="w-full bg-white px-6 text-center flex flex-col items-center justify-center shrink-0"
        style={{
          paddingTop: '80px',
          paddingBottom: '100px',
        }}
      >
        <div className="mx-auto max-w-[740px] w-full flex flex-col items-center justify-center text-center">
          <h2
            className="text-[28px] sm:text-[30px] font-normal tracking-[-0.01em] text-[#233B33] text-center leading-tight"
            style={{ fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif', marginBottom: '48px' }}
          >
            About Me
          </h2>
          <p
            className="mx-auto mt-8 text-center"
            style={{
              fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif',
              fontSize: '15px',
              lineHeight: '2.25',
              color: '#3F524A',
              fontWeight: 400,
              maxWidth: '700px',
              letterSpacing: '0.01em',
            }}
          >
            I am a licensed REALTOR® with Berkshire Hathaway HomeServices Florida Properties Group (BHHS). After relocating from Ohio to Clearwater Beach in April 2016, I can confidently say it was one of the best decisions of my life. I'm passionate about helping others make that same seamless transition to Florida and find their own piece of paradise.
          </p>
          <p
            className="mx-auto mt-8 text-center"
            style={{
              fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif',
              fontSize: '15px',
              lineHeight: '2.25',
              color: '#3F524A',
              fontWeight: 400,
              maxWidth: '700px',
              letterSpacing: '0.01em',
            }}
          >
            I am dedicated to delivering exceptional real estate services with integrity, professionalism, and a personalized touch. With a strong understanding of the local market and a commitment to my clients' success, I guide buyers, sellers, and investors through every step of the process with confidence. My attention to detail, skilled negotiation, and genuine passion for helping clients achieve their goals set me apart in today's competitive market.
          </p>
          <p
            className="mx-auto mt-6 mb-9 text-center"
            style={{
              fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif',
              fontSize: '15px',
              lineHeight: '2.25',
              color: '#3F524A',
              fontWeight: 400,
              maxWidth: '700px',
              letterSpacing: '0.01em',
            }}
          >
            To me, real estate is about more than transactions—it's about building lasting relationships. I take pride in guiding my clients through one of life's most important decisions with care, honesty, and dedication. Whether you're buying your first home, selling, or investing, I will work tirelessly to ensure a smooth and successful experience from start to finish.
          </p>
          <div className="flex justify-center items-center w-full" style={{ marginTop: '56px' }}>
            <button
              onClick={() => navigate('/about')}
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
              LEARN MORE
            </button>
          </div>
        </div>
      </section>

      {/* 4. Full-Width Architectural Hero Slider — Centered */}
      <section className="relative h-[360px] w-full overflow-hidden sm:h-[440px] md:h-[500px] flex items-center justify-center">
        {bannerSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-[#1E3A33]/35" />
            <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center text-white">
              <p className="font-sans text-2xl font-light tracking-[0.06em] text-white drop-shadow-md sm:text-3xl text-center">
                {slide.subtitle}
              </p>
              <h2 className="font-sans text-4xl font-bold tracking-[0.14em] text-white drop-shadow-lg sm:text-6xl md:text-7xl text-center">
                {slide.title}
              </h2>
            </div>
          </div>
        ))}

        {/* Arrow Navigation Controls */}
        <button
          onClick={() =>
            setCurrentSlide(
              (prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length
            )
          }
          className="absolute left-4 top-1/2 z-20 -translate-y-1/2 p-2 text-white/80 transition-all hover:scale-125 hover:text-white sm:left-8 cursor-pointer"
          aria-label="Previous Slide"
        >
          <ArrowLeft className="h-7 w-7 sm:h-9 sm:w-9 stroke-[1.2]" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)}
          className="absolute right-4 top-1/2 z-20 -translate-y-1/2 p-2 text-white/80 transition-all hover:scale-125 hover:text-white sm:right-8 cursor-pointer"
          aria-label="Next Slide"
        >
          <ArrowRight className="h-7 w-7 sm:h-9 sm:w-9 stroke-[1.2]" />
        </button>

        {/* Centered Pagination Dots */}
        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center justify-center gap-2.5">
          {bannerSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 w-2.5 rounded-full transition-all cursor-pointer ${idx === currentSlide ? 'scale-125 bg-white' : 'bg-white/50'
                }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 5. Services Section — Exact match to screenshot */}
      <section
        className="w-full bg-white px-6 text-center flex flex-col items-center justify-center shrink-0"
        style={{
          paddingTop: '85px',
          paddingBottom: '85px',
        }}
      >
        <div className="mx-auto max-w-[1040px] w-full flex flex-col items-center justify-center text-center">
          <h2
            className="text-[28px] sm:text-[30px] font-normal tracking-[-0.01em] text-[#233B33] text-center leading-tight"
            style={{ fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif' }}
          >
            Services
          </h2>
          <p
            className="mt-2.5 text-[13.5px] font-light tracking-[0.05em] text-[#3F524A] text-center"
            style={{ fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif' }}
          >
            Experience You Can Trust
          </p>

          <div
            className="grid grid-cols-1 gap-12 sm:grid-cols-3 justify-center items-start w-full"
            style={{ marginTop: '95px' }}
          >
            {/* Service 1 */}
            <div className="group flex flex-col items-center justify-center text-center">
              <div className="mb-6 flex h-24 w-24 items-center justify-center">
                <StairIcon />
              </div>
              <h3
                className="mb-2 text-[15.5px] font-normal tracking-[-0.01em] text-[#233B33] text-center"
                style={{ fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif' }}
              >
                Investment Planning
              </h3>
              <p
                className="mx-auto text-center"
                style={{
                  fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif',
                  fontSize: '12.5px',
                  lineHeight: '1.85',
                  color: '#3F524A',
                  fontWeight: 300,
                  maxWidth: '240px',
                }}
              >
                I'm a paragraph. Click here to add your
                <br className="hidden sm:inline" /> own text and edit me. It's easy.
              </p>
            </div>

            {/* Service 2 */}
            <div className="group flex flex-col items-center justify-center text-center">
              <div className="mb-6 flex h-24 w-24 items-center justify-center">
                <HouseRoofIcon />
              </div>
              <h3
                className="mb-2 text-[15.5px] font-normal tracking-[-0.01em] text-[#233B33] text-center"
                style={{ fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif' }}
              >
                Real Estate Guidance
              </h3>
              <p
                className="mx-auto text-center"
                style={{
                  fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif',
                  fontSize: '12.5px',
                  lineHeight: '1.85',
                  color: '#3F524A',
                  fontWeight: 300,
                  maxWidth: '240px',
                }}
              >
                I'm a paragraph. Click here to add your
                <br className="hidden sm:inline" /> own text and edit me. It's easy.
              </p>
            </div>

            {/* Service 3 */}
            <div className="group flex flex-col items-center justify-center text-center">
              <div className="mb-6 flex h-24 w-24 items-center justify-center">
                <ValuationDiagonalIcon />
              </div>
              <h3
                className="mb-2 text-[15.5px] font-normal tracking-[-0.01em] text-[#233B33] text-center"
                style={{ fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif' }}
              >
                Property Tax Valuation
              </h3>
              <p
                className="mx-auto text-center"
                style={{
                  fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif',
                  fontSize: '12.5px',
                  lineHeight: '1.85',
                  color: '#3F524A',
                  fontWeight: 300,
                  maxWidth: '240px',
                }}
              >
                I'm a paragraph. Click here to add your
                <br className="hidden sm:inline" /> own text and edit me. It's easy.
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center w-full" style={{ marginTop: '85px' }}>
            <button
              onClick={() => navigate('/services')}
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
              LEARN MORE
            </button>
          </div>
        </div>
      </section>

      {/* 6. Reach Your Goals & Centered Consultation Card — Exact match to screenshot */}
      <section
        className="relative w-full bg-white flex flex-col items-center justify-center shrink-0"
        style={{
          paddingTop: '130px',
          paddingBottom: '80px',
        }}
      >
        <div
          className="text-center w-full flex flex-col items-center justify-center"
          style={{ transform: 'translateY(-48px)' }}
        >
          <h2
            className="text-[28px] sm:text-[31px] font-normal tracking-[-0.01em] text-[#233B33] text-center leading-tight"
            style={{ fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif' }}
          >
            Reach Your Goals
          </h2>
        </div>

        {/* Free Consultation Card — Overlapping Split & Centered */}
        <div
          className="relative z-20 mx-auto max-w-[680px] w-full px-6 flex justify-center items-center mt-16 sm:mt-20"
          style={{ marginBottom: '-215px' }}
        >
          <div
            className="bg-[#F7F6F0] w-full flex flex-col items-start text-left shadow-none border-none"
            style={{
              paddingTop: '68px',
              paddingBottom: '68px',
              paddingLeft: '72px',
              paddingRight: '60px',
            }}
          >
            <h3
              className="text-[22px] sm:text-[24px] font-normal tracking-[-0.01em] text-[#233B33] text-left leading-tight"
              style={{
                fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif',
                marginBottom: '14px',
              }}
            >
              Free Consultation
            </h3>
            <p
              className="text-[13px] font-light text-[#3F524A] text-left"
              style={{
                fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif',
                marginBottom: '50px',
              }}
            >
              I'm a tagline. Click here to add your own text and edit me.
            </p>
            <div
              className="flex flex-col items-start text-left"
              style={{ marginBottom: '36px' }}
            >
              <span
                className="text-[13px] font-light text-[#3F524A] leading-normal"
                style={{
                  fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif',
                  marginBottom: '10px',
                }}
              >
                1 hr
              </span>
              <span
                className="text-[13px] font-light text-[#3F524A] leading-normal"
                style={{ fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif' }}
              >
                Free
              </span>
            </div>
            <div className="flex justify-start items-center">
              <button
                onClick={() => navigate('/booking')}
                className="border border-[#B87E58] bg-transparent text-[#B87E58] transition-colors duration-300 hover:bg-[#B87E58] hover:text-white cursor-pointer inline-flex items-center justify-center"
                style={{
                  fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif',
                  width: '138px',
                  height: '42px',
                  fontSize: '11.5px',
                  letterSpacing: '0.08em',
                  fontWeight: 400,
                }}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Testimonials Section — Expansive luxury padding */}
      <section
        className="relative w-full bg-[#2D3E35] px-8 sm:px-16 text-center text-white flex flex-col items-center justify-center shrink-0"
        style={{
          paddingTop: '310px',
          paddingBottom: '130px',
        }}
      >
        {/* Arrows at outer edges */}
        <button
          onClick={() =>
            setCurrentTestimonial(
              (prev) => (prev - 1 + testimonials.length) % testimonials.length
            )
          }
          className="absolute left-6 sm:left-14 top-[58%] -translate-y-1/2 p-2 text-white/70 transition-colors hover:text-white cursor-pointer"
          aria-label="Previous Testimonial"
        >
          <ArrowLeft className="h-7 w-7 stroke-[1]" />
        </button>
        <button
          onClick={() =>
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
          }
          className="absolute right-6 sm:right-14 top-[58%] -translate-y-1/2 p-2 text-white/70 transition-colors hover:text-white cursor-pointer"
          aria-label="Next Testimonial"
        >
          <ArrowRight className="h-7 w-7 stroke-[1]" />
        </button>

        <div className="mx-auto max-w-[620px] w-full flex flex-col items-center justify-center text-center">
          <p
            className="text-[15px] text-[#B87E58] text-center"
            style={{
              fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif',
              letterSpacing: '0.04em',
              marginBottom: '36px',
            }}
          >
            Testimonials
          </p>
          <h4
            className="text-[17px] sm:text-[18px] font-normal text-white text-center"
            style={{
              fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif',
              letterSpacing: '0.05em',
              marginBottom: '28px',
            }}
          >
            {testimonials[currentTestimonial].author}
          </h4>
          <p
            className="text-[14px] sm:text-[15px] font-light leading-[2.1] text-white/85 text-center"
            style={{
              fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif',
            }}
          >
            {testimonials[currentTestimonial].quote}
          </p>
        </div>
      </section>

      {/* 8. Visual Feature Block — Centered */}
      <section className="w-full bg-white flex justify-center items-center">
        <div className="w-full max-w-[1440px] grid grid-cols-1 md:grid-cols-2 items-center justify-center">
          {/* Left: Terracotta panel */}
          <div className="flex h-[400px] items-center justify-center bg-[#B87E58] sm:h-[480px] md:h-[520px]">
            <div className="w-[150px] sm:w-[185px] md:w-[210px] aspect-[2/3] overflow-hidden shadow-xl transition-transform duration-300 hover:scale-[1.02] flex items-center justify-center">
              <img
                src="/palm.jpg"
                alt="Palm Tree Architectural View"
                className="block h-full w-full object-cover"
                onError={(e) => { e.target.src = '/villa.jpg'; }}
              />
            </div>
          </div>

          {/* Right: Client Consultation Photo */}
          <div className="h-[400px] overflow-hidden sm:h-[480px] md:h-[520px] flex items-center justify-center">
            <img
              src="/consultation.jpg"
              alt="Client Consultation Meeting"
              className="h-full w-full object-cover"
              onError={(e) => { e.target.src = '/berne.jpg'; }}
            />
          </div>
        </div>
      </section>

      {/* 9. Contact Form ("Let's Chat") — Exact match to screenshot */}
      <section
        className="w-full bg-white px-6 text-center flex flex-col items-center justify-center shrink-0"
        style={{
          paddingTop: '135px',
          paddingBottom: '145px',
        }}
      >
        <div className="mx-auto max-w-[570px] w-full flex flex-col items-center justify-center text-center">
          <h2
            className="text-[29px] sm:text-[31px] font-normal tracking-[-0.01em] text-[#233B33] text-center leading-tight"
            style={{ fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif' }}
          >
            Let's Chat
          </h2>
          <p
            className="text-[13.5px] font-light text-[#3F524A] text-center"
            style={{
              fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif',
              marginTop: '12px',
              marginBottom: '72px',
            }}
          >
            Email:{' '}
            <a
              href="mailto:info@mysite.com"
              className="text-inherit hover:text-[#B87E58] transition-colors"
            >
              info@mysite.com
            </a>{' '}
            &nbsp;/&nbsp; Tel:{' '}
            <a
              href="tel:123-456-7890"
              className="text-inherit hover:text-[#B87E58] transition-colors"
            >
              123-456-7890
            </a>
          </p>

          {contactSubmitted && (
            <div className="mx-auto mb-8 w-full border border-[#B87E58] bg-[#FAF9F5] p-4 text-center text-sm text-[#233B33]">
              Thank you! Your message has been sent to Barbaranne Hill-Irving.
            </div>
          )}

          <form onSubmit={handleContactSubmit} className="w-full flex flex-col justify-center">
            <div
              className="grid grid-cols-1 gap-7 sm:grid-cols-2 text-left"
              style={{ marginBottom: '46px' }}
            >
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-2 block text-[11.5px] font-light tracking-[0.04em] text-[#3F524A]"
                  style={{ fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif' }}
                >
                  First Name *
                </label>
                <Input
                  id="firstName"
                  required
                  value={contactData.firstName}
                  onChange={(e) =>
                    setContactData({ ...contactData, firstName: e.target.value })
                  }
                  className="rounded-none border-0 border-b border-[#233B33] bg-transparent px-0 py-2 text-xs text-[#233B33] focus-visible:border-[#B87E58] focus-visible:outline-none focus:ring-0 shadow-none"
                  style={{ fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif' }}
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="mb-2 block text-[11.5px] font-light tracking-[0.04em] text-[#3F524A]"
                  style={{ fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif' }}
                >
                  Last Name *
                </label>
                <Input
                  id="lastName"
                  required
                  value={contactData.lastName}
                  onChange={(e) =>
                    setContactData({ ...contactData, lastName: e.target.value })
                  }
                  className="rounded-none border-0 border-b border-[#233B33] bg-transparent px-0 py-2 text-xs text-[#233B33] focus-visible:border-[#B87E58] focus-visible:outline-none focus:ring-0 shadow-none"
                  style={{ fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif' }}
                />
              </div>
            </div>

            <div className="text-left" style={{ marginBottom: '46px' }}>
              <label
                htmlFor="email"
                className="mb-2 block text-[11.5px] font-light tracking-[0.04em] text-[#3F524A]"
                style={{ fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif' }}
              >
                Email *
              </label>
              <Input
                id="email"
                type="email"
                required
                value={contactData.email}
                onChange={(e) =>
                  setContactData({ ...contactData, email: e.target.value })
                }
                className="rounded-none border-0 border-b border-[#233B33] bg-transparent px-0 py-2 text-xs text-[#233B33] focus-visible:border-[#B87E58] focus-visible:outline-none focus:ring-0 shadow-none"
                style={{ fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif' }}
              />
            </div>

            <div className="text-left" style={{ marginBottom: '54px' }}>
              <label
                htmlFor="message"
                className="mb-2 block text-[11.5px] font-light tracking-[0.04em] text-[#3F524A]"
                style={{ fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif' }}
              >
                Message
              </label>
              <Textarea
                id="message"
                rows={3}
                value={contactData.message}
                onChange={(e) =>
                  setContactData({ ...contactData, message: e.target.value })
                }
                className="rounded-none border-0 border-b border-[#233B33] bg-transparent px-0 py-2 text-xs text-[#233B33] focus-visible:border-[#B87E58] focus-visible:outline-none focus:ring-0 shadow-none resize-none min-h-[80px]"
                style={{ fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif' }}
              />
            </div>

            <div className="flex justify-center items-center w-full">
              <button
                type="submit"
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
                SEND
              </button>
            </div>
          </form>
        </div>
      </section>

    </div>
  );
}
