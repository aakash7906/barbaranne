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
      {/*  SECTION 1 — Cream Header Banner                                     */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section
        className="w-full bg-[#F7F6F0] flex flex-col items-center justify-center relative"
        style={{ paddingTop: '56px', paddingBottom: '76px', minHeight: '240px' }}
      >
        {/* Step pills */}
        <div className="flex items-center gap-2 mb-5" style={geo}>
          {['Date & Time', 'Your Details', 'Confirmed'].map((label, i) => (
            <React.Fragment key={label}>
              {i > 0 && <div className="w-6 sm:w-8 h-px" style={{ backgroundColor: step > i ? '#B87E58' : '#D6D0C4' }} />}
              <span
                className="text-[10px] sm:text-[11px] tracking-[0.12em] uppercase font-medium px-3 py-1.5 transition-all duration-300 select-none"
                style={{
                  backgroundColor: step === i + 1 ? '#233B33' : step > i + 1 ? '#B87E58' : 'transparent',
                  color: step >= i + 1 ? '#fff' : '#8A9490',
                  borderRadius: '20px',
                  border: step < i + 1 ? '1px solid #C8C2B6' : '1px solid transparent',
                }}
              >
                {label}
              </span>
            </React.Fragment>
          ))}
        </div>

        <h1
          className="text-3xl sm:text-5xl md:text-[54px] font-normal tracking-tight text-[#233B33] text-center leading-none"
          style={geo}
        >
          {step === 3 ? 'Appointment Confirmed' : 'Schedule Your Session'}
        </h1>
        <p className="mt-3 text-[12px] sm:text-[13px] text-[#8A9490] text-center max-w-md font-light" style={geo}>
          {step === 1 && 'Select your preferred date, time, and service below.'}
          {step === 2 && 'Provide your contact details to finalize the booking.'}
          {step === 3 && 'Your private consultation has been successfully reserved.'}
        </p>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/*  SECTION 2 — Main Content Card (overlapping the banner)              */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section className="w-full max-w-[1100px] px-4 sm:px-6 -mt-8 z-10 mb-0">
        <div className="bg-white w-full" style={{ boxShadow: '0 2px 30px rgba(0,0,0,0.04)' }}>

          {/* ═════ STEP 1 ═════════════════════════════════════════════════════ */}
          {step === 1 && (
            <div style={{ padding: '40px 32px 48px' }}>
              {/* Top label row */}
              <div
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-8"
                style={{ borderBottom: '1px solid #E8E4DC' }}
              >
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-[#B87E58]" />
                  <h2 className="text-[12px] font-medium uppercase tracking-[0.15em] text-[#233B33]" style={geo}>
                    Select a Date and Time
                  </h2>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#8A9490]" style={geo}>
                  <Clock className="w-3.5 h-3.5 text-[#B87E58]" />
                  <span>Pacific Daylight Time (PDT)</span>
                </div>
              </div>

              {/* Three-column grid — stretch all columns to same height */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">

                {/* ─── Column 1: Calendar ─────────────────────────────── */}
                <div className="lg:pr-8 lg:border-r pb-8 lg:pb-0" style={{ borderColor: '#E8E4DC' }}>
                  {/* Month nav */}
                  <div className="flex items-center justify-between mb-4">
                    <button onClick={prevMonth} className="p-1 text-[#233B33] hover:text-[#B87E58] transition-colors cursor-pointer"><ChevronLeft className="w-4 h-4" /></button>
                    <span className="text-[13px] font-medium text-[#233B33] tracking-wide select-none" style={geo}>{MONTHS[month]} {year}</span>
                    <button onClick={nextMonth} className="p-1 text-[#233B33] hover:text-[#B87E58] transition-colors cursor-pointer"><ChevronRight className="w-4 h-4" /></button>
                  </div>

                  {/* Day headers */}
                  <div className="grid grid-cols-7 text-center text-[10px] uppercase tracking-[0.08em] font-semibold text-[#8A9490] mb-1.5" style={geo}>
                    {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <span key={d}>{d}</span>)}
                  </div>

                  {/* Days grid */}
                  <div className="space-y-0.5">
                    {weeks.map((wk, wi) => (
                      <div key={wi} className="grid grid-cols-7 text-center">
                        {wk.map((d, di) => {
                          if (!d) return <div key={di} className="h-[38px]" />;
                          const sel = day === d;
                          const ok = isAvail(d);
                          return (
                            <button
                              key={di}
                              disabled={!ok}
                              onClick={() => setDay(d)}
                              className="h-[38px] mx-auto w-[38px] flex items-center justify-center transition-all duration-200 cursor-pointer"
                              style={{
                                borderRadius: '8px',
                                backgroundColor: sel ? '#B87E58' : 'transparent',
                                color: sel ? '#fff' : ok ? '#233B33' : '#C8CBC9',
                                fontWeight: sel ? 600 : 400,
                                fontSize: '12px',
                                boxShadow: sel ? '0 3px 12px rgba(184,126,88,0.28)' : 'none',
                                ...geo,
                              }}
                              onMouseEnter={e => { if (!sel && ok) e.currentTarget.style.backgroundColor = '#F5F4F0'; }}
                              onMouseLeave={e => { if (!sel) e.currentTarget.style.backgroundColor = 'transparent'; }}
                            >
                              {d}
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>

                  {/* Legend */}
                  <div className="flex items-center justify-between mt-4 pt-3 text-[10px] text-[#8A9490]" style={{ borderTop: '1px solid #E8E4DC', ...geo }}>
                    <span className="flex items-center gap-1.5">
                      <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#B87E58' }} /> Available
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#C8CBC9' }} /> Weekend
                    </span>
                  </div>
                </div>

                {/* ─── Column 2: Time Slots ───────────────────────────── */}
                <div className="lg:px-8 lg:border-r pb-8 lg:pb-0" style={{ borderColor: '#E8E4DC' }}>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-[#8A9490] font-semibold mb-0.5" style={geo}>
                    Available Times
                  </p>
                  <p className="text-[14px] font-medium text-[#233B33] mb-5" style={geo}>
                    {dayName(day)}, {MONTHS[month]} {day}
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    {slots.map(s => {
                      const on = time === s;
                      return (
                        <button
                          key={s}
                          onClick={() => setTime(s)}
                          className="flex items-center justify-center gap-1.5 cursor-pointer transition-all duration-200"
                          style={{
                            padding: '10px 4px',
                            borderRadius: '8px',
                            fontSize: '12px',
                            fontWeight: on ? 600 : 400,
                            backgroundColor: on ? '#B87E58' : '#FAF9F5',
                            color: on ? '#fff' : '#233B33',
                            border: on ? '1px solid #B87E58' : '1px solid #E0DCD4',
                            boxShadow: on ? '0 3px 12px rgba(184,126,88,0.22)' : 'none',
                            ...geo,
                          }}
                          onMouseEnter={e => { if (!on) { e.currentTarget.style.borderColor = '#B87E58'; e.currentTarget.style.color = '#B87E58'; }}}
                          onMouseLeave={e => { if (!on) { e.currentTarget.style.borderColor = '#E0DCD4'; e.currentTarget.style.color = '#233B33'; }}}
                        >
                          <Clock className="w-3.5 h-3.5" style={{ color: on ? '#fff' : '#B87E58' }} />
                          <span>{s}</span>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setAllSlots(!allSlots)}
                    className="mt-3.5 w-full text-center text-[11px] font-medium text-[#B87E58] hover:text-[#A36B46] cursor-pointer transition-colors"
                    style={geo}
                  >
                    {allSlots ? 'Show fewer' : `Show all sessions (+${ALL_SLOTS.length - 8} more)`}
                  </button>

                  {/* Helpful note */}
                  <div
                    className="mt-5 flex items-start gap-2.5 text-[11px] text-[#8A9490] leading-relaxed"
                    style={{ padding: '12px', borderRadius: '8px', backgroundColor: '#FAF9F5', border: '1px solid #E8E4DC', ...geo }}
                  >
                    <Star className="w-4 h-4 text-[#B87E58] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#233B33]">Need a different time?</strong> Mention it in the next step.
                    </span>
                  </div>
                </div>

                {/* ─── Column 3: Service Summary ──────────────────────── */}
                <div className="lg:pl-8 flex flex-col">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-[#8A9490] font-semibold mb-2.5" style={geo}>
                    Your Appointment
                  </p>

                  {/* Service dropdown */}
                  <select
                    value={service.id}
                    onChange={e => { const s = SERVICE_OPTIONS.find(o => o.id === e.target.value); if (s) setService(s); }}
                    className="w-full text-[12px] font-medium text-[#233B33] px-3 py-2.5 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#B87E58]"
                    style={{ borderRadius: '8px', border: '1px solid #E0DCD4', backgroundColor: '#FAF9F5', ...geo }}
                  >
                    {SERVICE_OPTIONS.map(o => <option key={o.id} value={o.id}>{o.title} ({o.duration})</option>)}
                  </select>

                  {/* Detail card */}
                  <div className="mt-3" style={{ padding: '16px', borderRadius: '8px', backgroundColor: '#FAF9F5', border: '1px solid #E8E4DC' }}>
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="text-[13px] font-medium text-[#233B33]" style={geo}>{service.title}</h4>
                      <span className="text-[11px] font-semibold text-[#B87E58]" style={geo}>{service.duration}</span>
                    </div>
                    <p className="text-[11px] text-[#6C7A75] font-light leading-relaxed mb-2.5" style={geo}>
                      {service.description}
                    </p>

                    <button
                      onClick={() => setDetails(!details)}
                      className="flex items-center gap-1 text-[11px] text-[#B87E58] font-medium cursor-pointer hover:underline"
                      style={geo}
                    >
                      <span>{details ? 'Hide details' : "What's included?"}</span>
                      {details ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>

                    {details && (
                      <ul className="mt-2.5 pt-2.5 space-y-1.5 text-[11px] text-[#4A5652]" style={{ borderTop: '1px solid #E0DCD4', ...geo }}>
                        {service.includes.map((item, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#B87E58] shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Spacer pushes summary + CTA to bottom of column */}
                  <div className="flex-1 min-h-4" />

                  {/* Selected summary */}
                  <div className="mt-4" style={{ padding: '14px 16px', borderRadius: '8px', backgroundColor: '#233B33' }}>
                    <p className="text-[10px] uppercase tracking-[0.1em] text-[#B87E58] font-semibold mb-1.5" style={geo}>
                      Selected Date & Time
                    </p>
                    <p className="text-[13px] font-medium text-white" style={geo}>
                      {dayName(day)}, {MONTHS[month]} {day}, {year}
                    </p>
                    <p className="text-[12px] text-white/60 flex items-center gap-1.5 mt-0.5" style={geo}>
                      <Clock className="w-3.5 h-3.5 text-[#B87E58]" />
                      {time} (PDT)
                    </p>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={goStep2}
                    className="w-full mt-4 flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:shadow-lg"
                    style={{
                      backgroundColor: '#B87E58', color: '#fff', padding: '13px',
                      borderRadius: '8px', fontSize: '11px', fontWeight: 600,
                      letterSpacing: '0.15em', textTransform: 'uppercase', border: 'none',
                      boxShadow: '0 4px 16px rgba(184,126,88,0.22)', ...geo,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#A36B46'; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#B87E58'; }}
                  >
                    <span>Proceed to Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] text-center text-[#8A9490] mt-1.5" style={geo}>
                    No credit card required
                  </p>
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
