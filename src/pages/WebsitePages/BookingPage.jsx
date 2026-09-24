import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  CalendarDays,
  Star,
  ShieldCheck,
} from 'lucide-react';
import { Calendar } from '../../components/ui/calendar';

// ─── Service Options ─────────────────────────────────────────────────────────────
const SERVICE_OPTIONS = [
  {
    id: 'consultation',
    title: 'Free Consultation',
    duration: '45 min',
    price: 'Complimentary',
    description: 'A private discovery call covering your luxury real estate goals, timeline, and strategic market advisory.',
    includes: ['Off-market luxury portfolio access', 'Local zoning & development insights', 'Personalized acquisition timeline'],
  },
  {
    id: 'investment',
    title: 'Investment Advisory',
    duration: '60 min',
    price: 'Complimentary',
    description: 'Strategic portfolio analysis, ROI projections, and prime high-yield neighborhood evaluations.',
    includes: ['Comparative yield analysis', 'Tax optimization strategy', 'Development opportunity mapping'],
  },
  {
    id: 'valuation',
    title: 'Property Valuation Review',
    duration: '45 min',
    price: 'Complimentary',
    description: 'Detailed comparative market analysis (CMA) and equity assessment for homeowners.',
    includes: ['Professional CMA report', 'Neighborhood trend analysis', 'Improvement ROI assessment'],
  },
];

// ─── Font Styles ─────────────────────────────────────────────────────────────────
const geo = { fontFamily: '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif' };
const serif = { fontFamily: '"Cormorant Garamond", Georgia, serif' };

// ─── Time Slots ──────────────────────────────────────────────────────────────────
const ALL_SLOTS = [
  '09:30 am', '10:00 am', '10:30 am', '11:00 am', '11:30 am',
  '01:00 pm', '01:30 pm', '02:00 pm', '02:30 pm',
  '03:30 pm', '04:00 pm', '04:30 pm',
];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// =============================================================================
export default function BookingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);

  // ─── State ──────────────────────────────────────────────────────────────────
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(8);
  const [day, setDay] = useState(24);
  const [time, setTime] = useState('10:00 am');
  const [allSlots, setAllSlots] = useState(false);
  const [details, setDetails] = useState(false);
  const [step, setStep] = useState(1);

  const initId = searchParams.get('service') || 'consultation';
  const [service, setService] = useState(
    SERVICE_OPTIONS.find((s) => s.id === initId) || SERVICE_OPTIONS[0]
  );

  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    format: 'Video Call (Google Meet)', notes: '',
  });

  const dayName = (d) => new Date(year, month, d).toLocaleDateString('en-US', { weekday: 'long' });
  const fullDate = () => new Date(year, month, day).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); };

  const goStep2 = (e) => { if (e) e.preventDefault(); setStep(2); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const goStep3 = (e) => { e.preventDefault(); if (!form.name || !form.email) return; setStep(3); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const slots = allSlots ? ALL_SLOTS : ALL_SLOTS.slice(0, 8);

  return (
    <div className="w-full bg-white flex flex-col items-center">

   
      {/*  SECTION 1 — Luxury Cream Editorial Banner                            */}
     
      <section
        className="w-full bg-[#FAF9F5] flex flex-col items-center justify-center relative border-b border-[#ECE7DE]"
        style={{ paddingTop: '56px', paddingBottom: '72px', minHeight: '250px' }}
      >
        {/* Subtle decorative background aura */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center items-center opacity-40">
          <div className="w-[600px] h-[220px] rounded-full bg-gradient-to-r from-[#B87E58]/10 via-[#233B33]/5 to-[#B87E58]/10 blur-3xl" />
        </div>

        <h1
          className="text-3xl sm:text-5xl md:text-[52px] font-normal tracking-tight text-[#233B33] text-center leading-tight relative z-10"
          style={geo}
        >
          {step === 3 ? 'Appointment Confirmed' : 'Schedule Your Session'}
        </h1>

        <div className="flex items-center gap-2 mt-3 text-[12px] sm:text-[13px] text-[#71807A] text-center max-w-lg font-light relative z-10" style={geo}>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B87E58]" />
          <span>
            {step === 1 && 'Complimentary 1-on-1 discovery session with Barbaranne Hill-Irving.'}
            {step === 2 && 'Provide your contact details to finalize the private booking.'}
            {step === 3 && 'Your consultation has been successfully reserved.'}
          </span>
        </div>

        {/* Step indicator pills — shifted visibly down towards banner bottom */}
        <div
          className="flex items-center gap-2.5 relative z-10"
          style={{ ...geo, marginTop: '54px' }}
        >
          {[
            { num: '01', label: 'Date & Time' },
            { num: '02', label: 'Your Details' },
            { num: '03', label: 'Confirmation' },
          ].map((item, i) => (
            <React.Fragment key={item.label}>
              {i > 0 && (
                <div
                  className="w-6 sm:w-10 h-[2px] transition-all duration-500 rounded-full"
                  style={{ backgroundColor: step > i ? '#B87E58' : '#E2DDD2' }}
                />
              )}
              <div
                className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 text-[11px] sm:text-[12px] tracking-[0.14em] uppercase font-medium transition-all duration-300 select-none shadow-sm"
                style={{
                  backgroundColor: step === i + 1 ? '#233B33' : step > i + 1 ? '#B87E58' : '#FFFFFF',
                  color: step >= i + 1 ? '#FFFFFF' : '#8A9490',
                  borderRadius: '30px',
                  border: step === i + 1 ? '1px solid #233B33' : step > i + 1 ? '1px solid #B87E58' : '1px solid #E5E0D5',
                }}
              >
                <span className="opacity-80 font-semibold text-[10.5px] sm:text-[12px]">{item.num}</span>
                <span>{item.label}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>

     
      {/*  SECTION 2 — Direct Editorial Layout (Spacious & Clean)              */}
      <section 
        className="w-full flex justify-center bg-white z-10"
        style={{ paddingTop: '80px', paddingBottom: '140px' }}
      >
        <div className="w-full max-w-[1240px] px-6 sm:px-8 md:px-12">

          {/* ═════ STEP 1 ═════════════════════════════════════════════════════ */}
          {step === 1 && (
            <div className="w-full">
              {/* Refined Editorial Header */}
              <div 
                className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#ECE7DE]"
                style={{ paddingBottom: '16px', marginBottom: '10px' }}
              >
                <div>
                  <span className="text-[11.5px] uppercase tracking-[0.2em] text-[#B87E58] font-semibold block mb-2" style={geo}>
                    Availability Calendar
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-light text-[#233B33] tracking-tight m-0" style={geo}>
                    Select a Consultation Date & Time
                  </h2>
                </div>

                <div className="flex items-center gap-2 text-[12px] text-[#71807A]" style={geo}>
                  <Clock className="w-4 h-4 text-[#B87E58] shrink-0" />
                  <span>Eastern / Pacific Time Auto-Sync (PDT)</span>
                </div>
              </div>

              {/* 2-Column Luxury Split: Left (Calendar + Time Slots) & Right (Unified Sticky Editorial Sidebar) */}
              <div 
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-start"
                style={{ marginTop: '24px' }}
              >

                {/* ─── Left Column (7 of 12 cols): Calendar + Timeslots with Generous Breathing Room ─── */}
                <div className="lg:col-span-7 flex flex-col">

                  {/* 1. Calendar View Block */}
                  <div className="flex flex-col">
                    <div 
                      className="flex items-baseline justify-between"
                      style={{ marginBottom: '24px' }}
                    >
                      <h3 className="text-[15px] font-medium uppercase tracking-[0.14em] text-[#233B33]" style={geo}>
                        1. Choose Date
                      </h3>
                      <span className="text-[12.5px] text-[#71807A]" style={geo}>
                        Selected: <strong className="text-[#233B33] font-semibold">{dayName(day)}, {MONTHS[month].slice(0, 3)} {day}</strong>
                      </span>
                    </div>

                    {/* Integrated Calendar Component with ample inner padding */}
                    <div 
                      className="bg-[#FAF9F5] p-2 sm:p-3 rounded-2xl border border-[#ECE7DE]"
                      style={{ marginBottom: '16px' }}
                    >
                      <Calendar
                        selectedDate={day}
                        onSelectDate={setDay}
                        month={month}
                        year={year}
                        onPrevMonth={prevMonth}
                        onNextMonth={nextMonth}
                        className="border-none bg-transparent"
                      />
                    </div>
                  </div>



                  {/* 2. Timeslots Block */}
                  <div className="flex flex-col" style={{ paddingTop: '16px' }}>
                    <div className="flex items-start justify-between" style={{ marginBottom: '24px' }}>
                      <div>
                        <h3 
                          className="text-[15px] font-medium uppercase tracking-[0.14em] text-[#233B33]" 
                          style={{ ...geo, marginBottom: '10px' }}
                        >
                          2. Select Preferred Time
                        </h3>
                        <p 
                          className="text-[13px] text-[#71807A] font-light m-0" 
                          style={{ ...geo, marginTop: '8px' }}
                        >
                          Available slots for {dayName(day)}, {MONTHS[month]} {day}
                        </p>
                      </div>
                      <span className="text-[12px] text-[#B87E58] font-medium tracking-wide bg-[#B87E58]/10 px-3 py-1 rounded-full border border-[#B87E58]/20" style={geo}>
                        {slots.length} available
                      </span>
                    </div>

                    {/* Timeslots Grid: Generous Vertical Gap between rows */}
                    <div 
                      className="grid grid-cols-2 sm:grid-cols-4"
                      style={{ rowGap: '20px', columnGap: '16px', marginBottom: '28px' }}
                    >
                      {slots.map((s) => {
                        const on = time === s;
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setTime(s)}
                            className="flex items-center justify-center gap-2.5 cursor-pointer transition-all duration-200 py-4 px-3 rounded-xl border text-[13px]"
                            style={{
                              fontWeight: on ? 600 : 400,
                              background: on ? '#233B33' : '#FAF9F5',
                              color: on ? '#FFFFFF' : '#233B33',
                              borderColor: on ? '#233B33' : '#ECE7DE',
                              boxShadow: on ? '0 4px 14px rgba(35, 59, 51, 0.2)' : 'none',
                              ...geo,
                            }}
                          >
                            <Clock className="w-3.5 h-3.5" style={{ color: on ? '#D6A47E' : '#8A9490' }} />
                            <span>{s}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Slots Action Bar with more margin */}
                    <div 
                      className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#ECE7DE]/60"
                      style={{ paddingTop: '20px', marginTop: '12px' }}
                    >
                      <button
                        type="button"
                        onClick={() => setAllSlots(!allSlots)}
                        className="text-[12.5px] text-[#B87E58] hover:text-[#9E643E] font-medium tracking-wide transition-colors cursor-pointer"
                        style={geo}
                      >
                        {allSlots ? '← Show fewer timeslots' : `View all available times (+${ALL_SLOTS.length - 8} more)`}
                      </button>

                      <div className="flex items-center gap-2 text-[12px] text-[#71807A]" style={geo}>
                        <Star className="w-3.5 h-3.5 text-[#B87E58] fill-[#B87E58]" />
                        <span>Need a custom time? Request in next step.</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* ─── Right Column (5 of 12 cols): Unified Editorial Sidebar (Sticky) ─── */}
                <div className="lg:col-span-5 lg:sticky lg:top-24">
                  <div 
                    className="bg-[#FAF9F5] border border-[#ECE7DE] rounded-2xl p-7 sm:p-8 flex flex-col justify-between"
                    style={{ minHeight: '520px' }}
                  >
                    <div>
                      {/* Concierge Profile Header */}
                      <div className="flex items-center gap-4 pb-6 border-b border-[#ECE7DE]">
                        <div className="relative shrink-0">
                          <img
                            src="/berne.jpg"
                            alt="Barbaranne Hill-Irving"
                            className="w-14 h-14 rounded-full object-cover border border-[#D6A47E]"
                            style={{ objectPosition: '50% 12%' }}
                          />
                          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#34D399] border-2 border-[#FAF9F5]" />
                        </div>
                        <div>
                          <h4 className="text-[15px] font-semibold text-[#233B33] m-0" style={geo}>
                            Barbaranne Hill-Irving
                          </h4>
                          <p className="text-[12px] text-[#71807A] m-0 mt-0.5 leading-snug font-light" style={geo}>
                            Licensed REALTOR® • Certified New Home Specialist
                          </p>
                          <span className="inline-block text-[11px] text-[#B87E58] font-medium mt-1">
                            Private 1-on-1 Consultation
                          </span>
                        </div>
                      </div>

                      {/* Service Selection */}
                      <div className="pt-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[11px] uppercase tracking-[0.14em] text-[#8A9490] font-semibold" style={geo}>
                            Consultation Type
                          </span>
                          <span className="text-[11px] text-[#1F7A4C] font-medium bg-[#E8F5EE] px-2.5 py-0.5 rounded-full" style={geo}>
                            Complimentary
                          </span>
                        </div>

                        {/* Minimalist Select Dropdown */}
                        <div className="relative mb-5">
                          <select
                            value={service.id}
                            onChange={(e) => {
                              const s = SERVICE_OPTIONS.find((o) => o.id === e.target.value);
                              if (s) setService(s);
                            }}
                            className="w-full text-[13px] font-medium text-[#233B33] px-4 py-3.5 cursor-pointer appearance-none bg-white rounded-xl border border-[#ECE7DE] focus:outline-none focus:border-[#B87E58] transition-all shadow-2xs"
                            style={geo}
                          >
                            {SERVICE_OPTIONS.map((o) => (
                              <option key={o.id} value={o.id}>
                                {o.title} • {o.duration}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="w-4 h-4 text-[#8A9490] absolute right-4 top-4 pointer-events-none" />
                        </div>

                        {/* Service Description & Inclusions */}
                        <div className="bg-white/80 rounded-xl p-4 border border-[#ECE7DE]">
                          <p className="text-[12.5px] text-[#556660] font-light leading-relaxed m-0" style={geo}>
                            {service.description}
                          </p>

                          <button
                            type="button"
                            onClick={() => setDetails(!details)}
                            className="inline-flex items-center gap-1.5 text-[11.5px] text-[#B87E58] font-medium cursor-pointer mt-3 hover:text-[#9E643E] transition-colors"
                            style={geo}
                          >
                            <span>{details ? 'Hide session agenda' : 'View session agenda'}</span>
                            {details ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>

                          {details && (
                            <ul className="mt-3 pt-3 border-t border-[#ECE7DE] space-y-2 text-[11.5px] text-[#475751]" style={geo}>
                              {service.includes.map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B87E58] shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Unified Reservation Preview & CTA */}
                    <div className="pt-6 border-t border-[#ECE7DE] mt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-[10.5px] uppercase tracking-[0.14em] text-[#8A9490] block" style={geo}>
                            Selected Appointment
                          </span>
                          <span className="text-[13px] font-semibold text-[#233B33] mt-0.5 block" style={geo}>
                            {dayName(day).slice(0, 3)}, {MONTHS[month].slice(0, 3)} {day}, {year}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[#B87E58] bg-white px-3 py-1.5 rounded-lg border border-[#ECE7DE]" style={geo}>
                          <Clock className="w-3.5 h-3.5" />
                          <span>{time}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={goStep2}
                        className="w-full flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 py-3.5 px-5 rounded-xl text-[12px] font-semibold uppercase tracking-[0.14em] text-white"
                        style={{
                          background: '#B87E58',
                          ...geo,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#9F643E';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#B87E58';
                        }}
                      >
                        <span>Proceed to Contact Details</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#8A9490] mt-3" style={geo}>
                        <ShieldCheck className="w-3.5 h-3.5 text-[#1F7A4C]" />
                        <span>100% Complimentary • No credit card required</span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ═════ STEP 2 ═════════════════════════════════════════════════════ */}
          {step === 2 && (
            <div style={{ padding: '44px 32px 56px' }}>
              {/* Booking summary bar */}
              <div
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10"
                style={{ padding: '18px 22px', borderRadius: '8px', backgroundColor: '#FAF9F5', border: '1px solid #E8E4DC' }}
              >
                <div>
                  <span className="text-[10px] uppercase tracking-[0.12em] text-[#B87E58] font-semibold" style={geo}>Reserved Slot</span>
                  <h3 className="text-xl font-normal text-[#233B33] mt-0.5" style={serif}>{service.title}</h3>
                  <p className="text-[12px] text-[#6C7A75] mt-1 flex items-center gap-1.5" style={geo}>
                    <CalendarDays className="w-3.5 h-3.5 text-[#B87E58]" />
                    {fullDate()} at {time} (PDT)
                  </p>
                </div>
                <button onClick={() => setStep(1)} className="text-[11px] text-[#B87E58] hover:underline font-medium cursor-pointer" style={geo}>
                  Change
                </button>
              </div>

              <div className="max-w-[660px] mx-auto">
                <h2 className="text-[12px] font-medium uppercase tracking-[0.15em] text-[#233B33] mb-6 flex items-center gap-2" style={geo}>
                  <User className="w-4 h-4 text-[#B87E58]" />
                  Your Contact Information
                </h2>

                <form onSubmit={goStep3} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.08em] font-semibold text-[#233B33] mb-1.5" style={geo}>
                        Full Name <span className="text-[#B87E58]">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3 top-3 text-[#8A9490]" />
                        <input type="text" required placeholder="Eleanor Vance" value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })}
                          className="w-full pl-9 pr-3 py-2.5 text-sm text-[#233B33] placeholder:text-[#B5BAB8] focus:outline-none focus:ring-1 focus:ring-[#B87E58] transition-all"
                          style={{ borderRadius: '8px', border: '1px solid #E0DCD4', ...geo }}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.08em] font-semibold text-[#233B33] mb-1.5" style={geo}>
                        Email <span className="text-[#B87E58]">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3 top-3 text-[#8A9490]" />
                        <input type="email" required placeholder="eleanor@example.com" value={form.email}
                          onChange={e => setForm({ ...form, email: e.target.value })}
                          className="w-full pl-9 pr-3 py-2.5 text-sm text-[#233B33] placeholder:text-[#B5BAB8] focus:outline-none focus:ring-1 focus:ring-[#B87E58] transition-all"
                          style={{ borderRadius: '8px', border: '1px solid #E0DCD4', ...geo }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.08em] font-semibold text-[#233B33] mb-1.5" style={geo}>Phone</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 absolute left-3 top-3 text-[#8A9490]" />
                        <input type="tel" placeholder="(555) 234-5678" value={form.phone}
                          onChange={e => setForm({ ...form, phone: e.target.value })}
                          className="w-full pl-9 pr-3 py-2.5 text-sm text-[#233B33] placeholder:text-[#B5BAB8] focus:outline-none focus:ring-1 focus:ring-[#B87E58] transition-all"
                          style={{ borderRadius: '8px', border: '1px solid #E0DCD4', ...geo }}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.08em] font-semibold text-[#233B33] mb-1.5" style={geo}>Meeting Format</label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 absolute left-3 top-3 text-[#8A9490]" />
                        <select value={form.format} onChange={e => setForm({ ...form, format: e.target.value })}
                          className="w-full pl-9 pr-3 py-2.5 text-sm text-[#233B33] focus:outline-none focus:ring-1 focus:ring-[#B87E58] cursor-pointer transition-all appearance-none"
                          style={{ borderRadius: '8px', border: '1px solid #E0DCD4', ...geo }}
                        >
                          <option>Video Call (Google Meet)</option>
                          <option>Phone Call</option>
                          <option>In-Person (Office)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.08em] font-semibold text-[#233B33] mb-1.5" style={geo}>
                      Property Goals (Optional)
                    </label>
                    <div className="relative">
                      <MessageSquare className="w-4 h-4 absolute left-3 top-3 text-[#8A9490]" />
                      <textarea rows={3} placeholder="Desired location, budget, or specific properties..."
                        value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 text-sm text-[#233B33] placeholder:text-[#B5BAB8] focus:outline-none focus:ring-1 focus:ring-[#B87E58] transition-all resize-none"
                        style={{ borderRadius: '8px', border: '1px solid #E0DCD4', ...geo }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-[#8A9490]"
                    style={{ padding: '12px', borderRadius: '8px', backgroundColor: '#FAF9F5', border: '1px solid #E8E4DC', ...geo }}>
                    <ShieldCheck className="w-5 h-5 text-[#B87E58] shrink-0" />
                    <span>Your details are confidential and will never be shared.</span>
                  </div>

                  <div className="pt-3 flex items-center justify-between gap-4">
                    <button type="button" onClick={() => setStep(1)}
                      className="flex items-center gap-1.5 cursor-pointer transition-colors"
                      style={{ padding: '12px 22px', borderRadius: '8px', fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#233B33', border: '1px solid #D6D0C4', backgroundColor: 'transparent', ...geo }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#FAF9F5'; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
                      <ChevronLeft className="w-3.5 h-3.5" /><span>Back</span>
                    </button>
                    <button type="submit"
                      className="flex-1 flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
                      style={{ backgroundColor: '#B87E58', color: '#fff', padding: '13px', borderRadius: '8px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', border: 'none', boxShadow: '0 4px 16px rgba(184,126,88,0.22)', ...geo }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#A36B46'; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#B87E58'; }}>
                      <span>Confirm Appointment</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ═════ STEP 3 ═════════════════════════════════════════════════════ */}
          {step === 3 && (
            <div style={{ padding: '56px 32px 64px' }}>
              <div className="max-w-[480px] mx-auto text-center space-y-6">
                <div className="w-20 h-20 mx-auto flex items-center justify-center" style={{ borderRadius: '50%', backgroundColor: 'rgba(184,126,88,0.1)' }}>
                  <CheckCircle2 className="w-10 h-10 text-[#B87E58]" />
                </div>

                <div>
                  <h2 className="text-3xl sm:text-4xl font-normal text-[#233B33]" style={serif}>You're All Set</h2>
                  <p className="mt-2 text-sm text-[#6C7A75] font-light leading-relaxed" style={geo}>
                    Thank you, <strong className="font-semibold text-[#233B33]">{form.name}</strong>.
                    A calendar invite has been sent to <span className="text-[#B87E58] font-medium">{form.email}</span>.
                  </p>
                </div>

                <div className="text-left" style={{ padding: '22px', borderRadius: '10px', backgroundColor: '#FAF9F5', border: '1px solid #E8E4DC' }}>
                  <div className="flex items-center justify-between pb-3 mb-3" style={{ borderBottom: '1px solid #E0DCD4' }}>
                    <span className="text-[11px] uppercase tracking-[0.12em] font-semibold text-[#233B33]" style={geo}>Booking Summary</span>
                    <span className="text-[10px] uppercase tracking-wider font-semibold" style={{ backgroundColor: '#233B33', color: '#fff', padding: '2px 10px', borderRadius: '12px', ...geo }}>Confirmed</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-[12px]" style={geo}>
                    <div><span className="text-[10px] uppercase tracking-[0.08em] text-[#8A9490] block mb-0.5">Service</span><span className="font-medium text-[#233B33]">{service.title}</span></div>
                    <div><span className="text-[10px] uppercase tracking-[0.08em] text-[#8A9490] block mb-0.5">Duration</span><span className="font-medium text-[#233B33]">{service.duration}</span></div>
                    <div><span className="text-[10px] uppercase tracking-[0.08em] text-[#8A9490] block mb-0.5">Date</span><span className="font-medium text-[#233B33]">{fullDate()}</span></div>
                    <div><span className="text-[10px] uppercase tracking-[0.08em] text-[#8A9490] block mb-0.5">Time</span><span className="font-semibold text-[#B87E58]">{time} (PDT)</span></div>
                    <div className="col-span-2 pt-2" style={{ borderTop: '1px solid #E0DCD4' }}>
                      <span className="text-[10px] uppercase tracking-[0.08em] text-[#8A9490] block mb-0.5">Format</span>
                      <span className="font-medium text-[#233B33]">{form.format}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button onClick={() => navigate('/')} className="w-full sm:w-auto cursor-pointer transition-all"
                    style={{ backgroundColor: '#233B33', color: '#fff', padding: '12px 30px', borderRadius: '8px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', border: 'none', ...geo }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1A312B'; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#233B33'; }}>
                    Return to Home
                  </button>
                  <button
                    onClick={() => { setStep(1); setForm({ name: '', email: '', phone: '', format: 'Video Call (Google Meet)', notes: '' }); }}
                    className="w-full sm:w-auto cursor-pointer transition-colors"
                    style={{ padding: '12px 26px', borderRadius: '8px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#233B33', border: '1px solid #D6D0C4', backgroundColor: 'transparent', ...geo }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#FAF9F5'; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
                    Book Another
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      
      {/*  SECTION 3 — Testimonial Trust Band                                  */}

      <section
        className="w-full bg-[#FAF9F5] border-t border-[#ECE7DE] flex flex-col items-center justify-center text-center"
        style={{ padding: '70px 24px' }}
      >
        <div className="max-w-lg">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#B87E58] font-semibold mb-5" style={geo}>
            Trusted By Discerning Clients
          </p>
          <h3 className="text-[22px] sm:text-[26px] font-normal text-[#233B33] leading-snug" style={serif}>
            "Barbaranne's strategic insight transformed our property portfolio beyond what we thought possible."
          </h3>
          <p className="mt-4 text-[12px] text-[#71807A] font-light tracking-wide" style={geo}>
            — David & Karen Miller, Private Investors
          </p>
          <div className="flex items-center justify-center gap-1 mt-5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#B87E58] text-[#B87E58]" />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
