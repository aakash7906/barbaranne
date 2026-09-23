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

  // ─── Calendar ───────────────────────────────────────────────────────────────
  const weeks = useMemo(() => {
    const first = new Date(year, month, 1).getDay();
    const total = new Date(year, month + 1, 0).getDate();
    const w = []; let r = [];
    for (let i = 0; i < first; i++) r.push(null);
    for (let d = 1; d <= total; d++) {
      r.push(d);
      if (r.length === 7) { w.push(r); r = []; }
    }
    if (r.length) { while (r.length < 7) r.push(null); w.push(r); }
    return w;
  }, [year, month]);

  const isAvail = (d) => {
    if (!d) return false;
    const dow = new Date(year, month, d).getDay();
    return dow !== 0 && dow !== 6;
  };

  const dayName = (d) => new Date(year, month, d).toLocaleDateString('en-US', { weekday: 'long' });
  const fullDate = () => new Date(year, month, day).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); };

  const goStep2 = (e) => { if (e) e.preventDefault(); setStep(2); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const goStep3 = (e) => { e.preventDefault(); if (!form.name || !form.email) return; setStep(3); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const slots = allSlots ? ALL_SLOTS : ALL_SLOTS.slice(0, 8);

  return (
    <div className="w-full bg-white flex flex-col items-center">

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/*  SECTION 1 — Luxury Cream Editorial Banner                            */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section
        className="w-full bg-[#FAF9F5] flex flex-col items-center justify-center relative border-b border-[#ECE7DE]"
        style={{ paddingTop: '56px', paddingBottom: '72px', minHeight: '250px' }}
      >
        {/* Subtle decorative background aura */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center items-center opacity-40">
          <div className="w-[600px] h-[220px] rounded-full bg-gradient-to-r from-[#B87E58]/10 via-[#233B33]/5 to-[#B87E58]/10 blur-3xl" />
        </div>

        {/* Step indicator pills */}
        <div className="flex items-center gap-2.5 mb-5 relative z-10" style={geo}>
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
                className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] sm:text-[11px] tracking-[0.12em] uppercase font-medium transition-all duration-300 select-none shadow-sm"
                style={{
                  backgroundColor: step === i + 1 ? '#233B33' : step > i + 1 ? '#B87E58' : '#FFFFFF',
                  color: step >= i + 1 ? '#FFFFFF' : '#8A9490',
                  borderRadius: '30px',
                  border: step === i + 1 ? '1px solid #233B33' : step > i + 1 ? '1px solid #B87E58' : '1px solid #E5E0D5',
                }}
              >
                <span className="opacity-75 font-semibold text-[9.5px]">{item.num}</span>
                <span>{item.label}</span>
              </div>
            </React.Fragment>
          ))}
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
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/*  SECTION 2 — Main Content Luxury Floating Card                       */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section className="w-full max-w-[1240px] px-4 sm:px-6 md:px-8 -mt-10 z-10 mb-12">
        <div
          className="bg-white w-full rounded-3xl overflow-hidden"
          style={{
            boxShadow: '0 24px 50px -12px rgba(35, 59, 51, 0.08), 0 4px 20px -2px rgba(35, 59, 51, 0.03)',
            border: '1px solid #ECE7DE',
          }}
        >

          {/* ═════ STEP 1 ═════════════════════════════════════════════════════ */}
          {step === 1 && (
            <div className="p-6 sm:p-10 md:p-12 lg:p-14">
              {/* Top header row with luxury title and timezone badge */}
              <div
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-7 mb-10"
                style={{ borderBottom: '1px solid #ECE7DE' }}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3] flex items-center justify-center text-[#B87E58] shadow-sm">
                    <CalendarDays className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-[14.5px] font-semibold uppercase tracking-[0.16em] text-[#233B33]" style={geo}>
                      Select a Date & Time
                    </h2>
                    <p className="text-[12px] text-[#8A9490] m-0 mt-0.5" style={geo}>
                      Real-time live availability for private client consultations
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-center gap-2.5 text-[12px] text-[#63726C] px-4 py-2 rounded-full bg-[#FAF9F5] border border-[#E8E4DC] self-start sm:self-auto shadow-xs"
                  style={geo}
                >
                  <Clock className="w-4 h-4 text-[#B87E58]" />
                  <span>Eastern / Pacific Time Auto-Sync (PDT)</span>
                </div>
              </div>

              {/* 2-Column Luxury Spacious Split: Left Stack (Calendar + Time Slots) & Right (Concierge & Appointment Summary) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14">

                {/* ─── Left Section (7 of 12 cols): Vertically Stacked Calendar & Timeslots ─── */}
                <div className="lg:col-span-7 flex flex-col space-y-10 lg:pr-8 xl:pr-10 lg:border-r border-[#ECE7DE]">
                  
                  {/* Part 1: Calendar View */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10.5px] uppercase tracking-[0.16em] text-[#B87E58] font-bold block" style={geo}>
                          Step 1 • Pick a Date
                        </span>
                        <h3 className="text-[16px] font-medium text-[#233B33] mt-1" style={geo}>
                          Select Day from Calendar
                        </h3>
                      </div>
                      <div className="text-[12px] text-[#71807A] bg-[#FAF9F5] px-3 py-1.5 rounded-lg border border-[#ECE7DE]" style={geo}>
                        Selected: <strong className="text-[#233B33] font-semibold">{dayName(day)}, {MONTHS[month].slice(0, 3)} {day}</strong>
                      </div>
                    </div>

                    {/* Month header & navigation */}
                    <div className="flex items-center justify-between bg-[#FAF9F5] px-5 py-3 rounded-2xl border border-[#ECE7DE] my-2">
                      <button
                        onClick={prevMonth}
                        className="p-2 rounded-xl text-[#233B33] hover:text-[#B87E58] hover:bg-white transition-all cursor-pointer shadow-none hover:shadow-xs"
                        aria-label="Previous month"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="text-[15px] font-semibold text-[#233B33] tracking-wide select-none" style={geo}>
                        {MONTHS[month]} {year}
                      </span>
                      <button
                        onClick={nextMonth}
                        className="p-2 rounded-xl text-[#233B33] hover:text-[#B87E58] hover:bg-white transition-all cursor-pointer shadow-none hover:shadow-xs"
                        aria-label="Next month"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Day of week headers */}
                    <div className="grid grid-cols-7 text-center text-[11px] uppercase tracking-[0.1em] font-semibold text-[#8A9490] pt-2 pb-1" style={geo}>
                      {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d) => (
                        <span key={d} className="py-1">{d}</span>
                      ))}
                    </div>

                    {/* Days grid with luxury spacious cells and generous gaps */}
                    <div className="space-y-2">
                      {weeks.map((wk, wi) => (
                        <div key={wi} className="grid grid-cols-7 text-center gap-2 sm:gap-2.5">
                          {wk.map((d, di) => {
                            if (!d) return <div key={di} className="h-[44px]" />;
                            const sel = day === d;
                            const ok = isAvail(d);
                            return (
                              <button
                                key={di}
                                disabled={!ok}
                                onClick={() => setDay(d)}
                                className="h-[44px] w-full max-w-[46px] mx-auto flex items-center justify-center transition-all duration-200 cursor-pointer relative"
                                style={{
                                  borderRadius: '12px',
                                  background: sel
                                    ? 'linear-gradient(135deg, #B87E58 0%, #9E643E 100%)'
                                    : 'transparent',
                                  color: sel ? '#FFFFFF' : ok ? '#233B33' : '#D0D4D2',
                                  fontWeight: sel ? 600 : ok ? 500 : 300,
                                  fontSize: '13.5px',
                                  boxShadow: sel
                                    ? '0 6px 18px rgba(184, 126, 88, 0.35)'
                                    : 'none',
                                  border: sel
                                    ? '1px solid #B87E58'
                                    : '1px solid transparent',
                                  ...geo,
                                }}
                                onMouseEnter={(e) => {
                                  if (!sel && ok) {
                                    e.currentTarget.style.backgroundColor = '#F6F3ED';
                                    e.currentTarget.style.color = '#B87E58';
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (!sel) {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = ok ? '#233B33' : '#D0D4D2';
                                  }
                                }}
                              >
                                <span>{d}</span>
                                {/* Soft gold dot indicator for available weekday */}
                                {ok && !sel && (
                                  <span className="absolute bottom-1.5 w-1 h-1 rounded-full bg-[#B87E58]/50" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      ))}
                    </div>

                    {/* Calendar Legend */}
                    <div
                      className="flex items-center justify-between pt-4 text-[11.5px] text-[#7E8C86]"
                      style={{ borderTop: '1px solid #ECE7DE', ...geo }}
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#B87E58]" /> Available Weekdays (Bookable)
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#D0D4D2]" /> Weekend Off
                      </span>
                    </div>
                  </div>

                  {/* Horizontal Divider with subtle spacing */}
                  <div className="w-full h-px bg-[#ECE7DE] my-4" />

                  {/* Part 2: Vertically Stacked Timeslot Selection */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10.5px] uppercase tracking-[0.16em] text-[#B87E58] font-bold block" style={geo}>
                          Step 2 • Choose Time
                        </span>
                        <h3 className="text-[16px] font-medium text-[#233B33] mt-1" style={geo}>
                          Available Slots for {dayName(day)}, {MONTHS[month]} {day}
                        </h3>
                      </div>
                      <span className="text-[11.5px] text-[#B87E58] font-semibold uppercase tracking-wider bg-[#B87E58]/10 px-3 py-1 rounded-full border border-[#B87E58]/20" style={geo}>
                        {slots.length} Open Slots
                      </span>
                    </div>

                    {/* Wide 4-column spacious slot grid with ample gaps */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                      {slots.map((s) => {
                        const on = time === s;
                        return (
                          <button
                            key={s}
                            onClick={() => setTime(s)}
                            className="flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 group py-3 px-2"
                            style={{
                              borderRadius: '12px',
                              fontSize: '12.5px',
                              fontWeight: on ? 600 : 500,
                              background: on
                                ? 'linear-gradient(135deg, #B87E58 0%, #A26842 100%)'
                                : '#FAF9F5',
                              color: on ? '#FFFFFF' : '#233B33',
                              border: on ? '1px solid #B87E58' : '1px solid #E5E0D5',
                              boxShadow: on
                                ? '0 6px 16px rgba(184, 126, 88, 0.28)'
                                : '0 1px 3px rgba(0,0,0,0.02)',
                              ...geo,
                            }}
                            onMouseEnter={(e) => {
                              if (!on) {
                                e.currentTarget.style.borderColor = '#B87E58';
                                e.currentTarget.style.color = '#B87E58';
                                e.currentTarget.style.backgroundColor = '#FFFFFF';
                                e.currentTarget.style.transform = 'translateY(-1px)';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!on) {
                                e.currentTarget.style.borderColor = '#E5E0D5';
                                e.currentTarget.style.color = '#233B33';
                                e.currentTarget.style.backgroundColor = '#FAF9F5';
                                e.currentTarget.style.transform = 'translateY(0)';
                              }
                            }}
                          >
                            <Clock className="w-3.5 h-3.5" style={{ color: on ? '#FFFFFF' : '#B87E58' }} />
                            <span>{s}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Toggle Show All Slots and Note */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3">
                      <button
                        onClick={() => setAllSlots(!allSlots)}
                        className="py-2.5 px-4 text-center text-[12px] font-medium text-[#B87E58] hover:text-[#9E643E] bg-[#FAF9F5] hover:bg-[#F5F2EB] rounded-xl border border-[#EAE5DB] transition-all cursor-pointer w-full sm:w-auto shadow-2xs"
                        style={geo}
                      >
                        {allSlots ? 'Show fewer timeslots' : `Show all available times (+${ALL_SLOTS.length - 8} more)`}
                      </button>

                      <div
                        className="flex items-center gap-2.5 text-[11.5px] text-[#697A73] py-2 px-3.5 rounded-xl bg-[#FAF9F5] border border-[#ECE7DE]"
                        style={geo}
                      >
                        <Star className="w-3.5 h-3.5 fill-[#B87E58] text-[#B87E58] shrink-0" />
                        <span>Need a custom time? Request in next step.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ─── Right Section (5 of 12 cols): Concierge Profile & Consultation Summary ─── */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
                  <div className="space-y-6">
                    {/* Concierge Intro Card */}
                    <div
                      className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#ECE7DE] flex items-center gap-4"
                      style={{ boxShadow: '0 2px 10px rgba(35, 59, 51, 0.03)' }}
                    >
                      <div className="relative shrink-0">
                        <img
                          src="/berne.jpg"
                          alt="Barbaranne Hill-Irving"
                          className="w-14 h-14 rounded-full object-cover border-2 border-[#D6A47E] shadow-sm"
                          style={{ objectPosition: '50% 12%' }}
                        />
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#34D399] border-2 border-white" />
                      </div>
                      <div>
                        <h4 className="text-[14.5px] font-semibold text-[#233B33] m-0" style={geo}>
                          Barbaranne Hill-Irving
                        </h4>
                        <p className="text-[11.5px] text-[#71807A] m-0 mt-0.5 leading-snug" style={geo}>
                          Licensed REALTOR® • Certified New Home Specialist
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-[10.5px] text-[#B87E58] font-medium mt-1.5 bg-[#B87E58]/10 px-2 py-0.5 rounded-md">
                          Private Discovery Call (1-on-1)
                        </span>
                      </div>
                    </div>

                    {/* Service Selection Section */}
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <p className="text-[11px] uppercase tracking-[0.16em] text-[#8A9490] font-bold" style={geo}>
                          Select Consultation Service
                        </p>
                        <span className="text-[10.5px] text-[#1F7A4C] font-semibold uppercase tracking-wider bg-[#E8F5EE] px-2.5 py-0.5 rounded-full" style={geo}>
                          Complimentary
                        </span>
                      </div>

                      {/* Luxury Custom Service Select */}
                      <div className="relative mb-4">
                        <select
                          value={service.id}
                          onChange={(e) => {
                            const s = SERVICE_OPTIONS.find((o) => o.id === e.target.value);
                            if (s) setService(s);
                          }}
                          className="w-full text-[13px] font-semibold text-[#233B33] px-4 py-3.5 cursor-pointer appearance-none bg-[#FAF9F5] hover:bg-white rounded-xl border border-[#E5E0D5] focus:outline-none focus:border-[#B87E58] focus:ring-2 focus:ring-[#B87E58]/15 transition-all shadow-xs"
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

                      {/* Service Description Box with clean inner padding */}
                      <div
                        className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#ECE7DE]"
                        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-[14px] font-semibold text-[#233B33]" style={geo}>
                            {service.title}
                          </h4>
                          <span className="text-[11.5px] font-semibold text-[#B87E58] px-2.5 py-0.5 rounded-md bg-[#B87E58]/10" style={geo}>
                            {service.duration}
                          </span>
                        </div>
                        <p className="text-[12px] text-[#697A73] font-light leading-relaxed mb-3.5" style={geo}>
                          {service.description}
                        </p>

                        <button
                          onClick={() => setDetails(!details)}
                          className="flex items-center gap-1.5 text-[11.5px] text-[#B87E58] font-medium cursor-pointer hover:text-[#9E643E] transition-colors"
                          style={geo}
                        >
                          <span>{details ? 'Hide details' : "What's included in this session?"}</span>
                          {details ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>

                        {details && (
                          <ul className="mt-3.5 pt-3.5 space-y-2 text-[11.5px] text-[#475751]" style={{ borderTop: '1px solid #E8E3DA', ...geo }}>
                            {service.includes.map((item, i) => (
                              <li key={i} className="flex items-start gap-2.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#B87E58] shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Confirmed Slot Preview Card & Action CTA */}
                  <div className="pt-2 space-y-4">
                    <div
                      className="p-4 sm:p-5 rounded-2xl flex items-center justify-between text-white"
                      style={{
                        background: 'linear-gradient(135deg, #233B33 0%, #1A2D27 100%)',
                        boxShadow: '0 6px 20px rgba(35, 59, 51, 0.18)',
                      }}
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-[0.16em] text-[#B87E58] font-bold block" style={geo}>
                          Confirmed Slot Preview
                        </span>
                        <p className="text-[13.5px] font-medium text-white m-0" style={geo}>
                          {dayName(day)}, {MONTHS[month]} {day}, {year}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#F3ECE4] bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10 shadow-xs" style={geo}>
                          <Clock className="w-3.5 h-3.5 text-[#B87E58]" />
                          {time}
                        </span>
                      </div>
                    </div>

                    {/* Proceed CTA Button */}
                    <button
                      onClick={goStep2}
                      className="w-full flex items-center justify-center gap-2.5 cursor-pointer transition-all duration-300 group py-4 px-5 rounded-2xl text-[12.5px] font-semibold uppercase tracking-[0.15em] text-white shadow-lg"
                      style={{
                        background: 'linear-gradient(135deg, #B87E58 0%, #9F643E 100%)',
                        boxShadow: '0 8px 24px rgba(184, 126, 88, 0.35)',
                        ...geo,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(184, 126, 88, 0.48)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(184, 126, 88, 0.35)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <span>Proceed to Contact Details</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>

                    <div className="flex items-center justify-center gap-2 text-[11px] text-[#8A9490] pt-1" style={geo}>
                      <ShieldCheck className="w-4 h-4 text-[#1F7A4C]" />
                      <span>100% Free Consultation • No credit card required</span>
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

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/*  SECTION 3 — Testimonial Trust Band                                  */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section
        className="w-full bg-[#233B33] flex flex-col items-center justify-center text-center"
        style={{ padding: '70px 24px' }}
      >
        <div className="max-w-lg">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#B87E58] font-semibold mb-5" style={geo}>
            Trusted By Discerning Clients
          </p>
          <h3 className="text-[22px] sm:text-[26px] font-normal text-white leading-snug" style={serif}>
            "Barbaranne's strategic insight transformed our property portfolio beyond what we thought possible."
          </h3>
          <p className="mt-4 text-[12px] text-white/40 font-light tracking-wide" style={geo}>
            — David & Karen Miller, Private Investors
          </p>
          <div className="flex items-center justify-center gap-1 mt-5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#B87E58] text-[#B87E58]" />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/*  SECTION 4 — Bottom CTA Bar                                          */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section
        className="w-full bg-[#F7F6F0] flex flex-col items-center justify-center text-center"
        style={{ padding: '48px 24px' }}
      >
        <p className="text-[12px] text-[#6C7A75] font-light mb-5 max-w-sm" style={geo}>
          Have questions before booking? Explore our services or reach out directly.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => navigate('/services')}
            className="cursor-pointer transition-colors duration-300 hover:bg-[#B87E58] hover:text-white"
            style={{ border: '1px solid #B87E58', backgroundColor: 'transparent', color: '#233B33', padding: '11px 26px', fontSize: '11px', fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase', ...geo }}
          >
            View Services
          </button>
          <button
            onClick={() => navigate('/contact')}
            className="cursor-pointer transition-colors duration-300 hover:bg-[#A36B46]"
            style={{ backgroundColor: '#B87E58', color: '#fff', padding: '11px 26px', fontSize: '11px', fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase', border: 'none', ...geo }}
          >
            Contact Barbaranne
          </button>
        </div>
      </section>
    </div>
  );
}
