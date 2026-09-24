import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Check,
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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../../components/ui/dropdown-menu';

// ─── Service Options ─────────────────────────────────────────────────────────────
const SERVICE_OPTIONS = [
  {
    id: 'consultation',
    title: 'Free Consultation',
    duration: '30 min',
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
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);

  // ─── Dynamic Initial Date (Default to today or nearest weekday) ───────────────
  const getInitialDate = () => {
    const d = new Date();
    // If weekend, advance to next Monday
    const dayOfWeek = d.getDay();
    if (dayOfWeek === 6) d.setDate(d.getDate() + 2);
    else if (dayOfWeek === 0) d.setDate(d.getDate() + 1);
    return {
      year: d.getFullYear(),
      month: d.getMonth(),
      day: d.getDate(),
    };
  };

  const initialDate = useMemo(() => getInitialDate(), []);

  // ─── State ──────────────────────────────────────────────────────────────────
  const [year, setYear] = useState(initialDate.year);
  const [month, setMonth] = useState(initialDate.month);
  const [day, setDay] = useState(initialDate.day);
  const [time, setTime] = useState('10:00 am');
  const [allSlots, setAllSlots] = useState(false);
  const [details, setDetails] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmationId, setBookingConfirmationId] = useState('');

  // Sync service from query param dynamically
  const initId = searchParams.get('service') || 'consultation';
  const [service, setService] = useState(
    SERVICE_OPTIONS.find((s) => s.id === initId) || SERVICE_OPTIONS[0]
  );

  // When query params change, update service if matched
  useEffect(() => {
    const qService = searchParams.get('service');
    if (qService) {
      const match = SERVICE_OPTIONS.find((s) => s.id === qService);
      if (match) setService(match);
    }
  }, [searchParams]);

  // When user changes service, keep URL in sync
  const handleServiceSelect = (newService) => {
    setService(newService);
    setSearchParams({ service: newService.id });
  };

  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    format: 'Video Call (Google Meet)', notes: '',
  });

  const dayName = (d) => new Date(year, month, d).toLocaleDateString('en-US', { weekday: 'long' });
  const fullDate = () => new Date(year, month, day).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  };

  const goStep2 = (e) => {
    if (e) e.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goStep3 = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;

    setIsSubmitting(true);

    // Simulate reliable API/Network booking submission
    setTimeout(() => {
      const confId = 'BHI-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      setBookingConfirmationId(confId);

      const bookingRecord = {
        confirmationId: confId,
        service: service.title,
        serviceId: service.id,
        duration: service.duration,
        date: fullDate(),
        time,
        client: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          format: form.format,
          notes: form.notes,
        },
        createdAt: new Date().toISOString(),
      };

      try {
        const existing = JSON.parse(localStorage.getItem('barbaranne_bookings') || '[]');
        existing.push(bookingRecord);
        localStorage.setItem('barbaranne_bookings', JSON.stringify(existing));
      } catch (err) {
        console.error('Failed to store booking locally:', err);
      }

      setIsSubmitting(false);
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  // Generate dynamic .ics calendar invite for the booked consultation
  const downloadCalendarInvite = () => {
    const dateObj = new Date(year, month, day);
    // Approximate start time from time string (e.g. '10:00 am')
    let [timeStr, modifier] = time.split(' ');
    let [hours, minutes] = timeStr.split(':').map(Number);
    if (modifier?.toLowerCase() === 'pm' && hours < 12) hours += 12;
    if (modifier?.toLowerCase() === 'am' && hours === 12) hours = 0;

    dateObj.setHours(hours, minutes, 0, 0);
    const endObj = new Date(dateObj.getTime() + (service.id === 'investment' ? 60 : service.id === 'valuation' ? 45 : 30) * 60000);

    const pad = (n) => String(n).padStart(2, '0');
    const toICSDate = (d) =>
      `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00Z`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Barbaranne Hill-Irving Real Estate//Booking//EN',
      'BEGIN:VEVENT',
      `UID:${bookingConfirmationId || 'BHI-CONSULT'}@barbaranne.com`,
      `DTSTAMP:${toICSDate(new Date())}`,
      `DTSTART:${toICSDate(dateObj)}`,
      `DTEND:${toICSDate(endObj)}`,
      `SUMMARY:${service.title} with Barbaranne Hill-Irving`,
      `DESCRIPTION:Real Estate Consultation (${service.title})\\nClient: ${form.name}\\nFormat: ${form.format}\\nNotes: ${form.notes || 'None'}`,
      `LOCATION:${form.format.includes('Office') ? '125 Indian Rocks Road N, Suite 200, Belleair Bluffs, FL 33770' : form.format}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Consultation-Barbaranne-Hill-Irving.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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
                className="flex items-center gap-2.5 text-[13px] sm:text-[14px] tracking-[0.12em] uppercase font-medium transition-all duration-300 select-none shadow-sm"
                style={{
                  padding: '10px 22px',
                  backgroundColor: step === i + 1 ? '#233B33' : step > i + 1 ? '#B87E58' : '#FFFFFF',
                  color: step >= i + 1 ? '#FFFFFF' : '#8A9490',
                  borderRadius: '30px',
                  border: step === i + 1 ? '1px solid #233B33' : step > i + 1 ? '1px solid #B87E58' : '1px solid #E5E0D5',
                }}
              >
                <span className="opacity-80 font-semibold text-[12px] sm:text-[13px]">{item.num}</span>
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
                  {/* Top section header matching left side baseline */}
                  <div
                    className="flex items-baseline justify-between"
                    style={{ marginBottom: '24px' }}
                  >
                    <h3 className="text-[15px] font-medium uppercase tracking-[0.14em] text-[#233B33]" style={geo}>
                      Consultation Overview
                    </h3>
                    <span className="text-[11.5px] text-[#1F7A4C] font-medium bg-[#E8F5EE] px-3 py-1 rounded-full" style={geo}>
                      Complimentary
                    </span>
                  </div>

                  {/* Main Editorial Card Container matching Left Calendar's background & border */}
                  <div
                    className="bg-[#FAF9F5] border border-[#ECE7DE] rounded-2xl px-6 sm:px-7 flex flex-col justify-between"
                    style={{ minHeight: '600px', boxSizing: 'border-box', paddingTop: '16px', paddingBottom: '28px' }}
                  >
                    {/* Inner content wrapper keeping 20px margin away from card borders */}
                    <div
                      className="flex flex-col justify-between h-full flex-1"
                      style={{ marginLeft: '20px', marginRight: '20px' }}
                    >
                      <div className="flex flex-col space-y-6">
                        {/* 1. Concierge Profile Header - Expanded luxury height */}
                        <div
                          className="flex items-center gap-5 border-b border-[#ECE7DE]"
                          style={{ paddingTop: '8px', paddingBottom: '28px' }}
                        >
                          <div className="relative shrink-0">
                            <img
                              src="/berne.jpg"
                              alt="Barbaranne Hill-Irving"
                              className="w-16 h-16 rounded-full object-cover border-2 border-[#D6A47E] shadow-xs"
                              style={{ objectPosition: '50% 12%' }}
                            />
                            <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-[#34D399] border-2 border-[#FAF9F5]" />
                          </div>
                          <div>
                            <h4 className="text-[17px] font-semibold text-[#233B33] m-0" style={geo}>
                              Barbaranne Hill-Irving
                            </h4>
                            <p className="text-[12.5px] text-[#71807A] m-0 mt-1 leading-snug font-light" style={geo}>
                              Licensed REALTOR® • Certified New Home Specialist
                            </p>
                          </div>
                        </div>

                        {/* 2. Service Selection Dropdown */}
                        <div style={{ paddingTop: '16px' }}>
                          <label
                            className="text-[11px] uppercase tracking-[0.14em] text-[#8A9490] font-semibold block"
                            style={{ ...geo, marginBottom: '14px' }}
                          >
                            Select Service
                          </label>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button
                                type="button"
                                className="w-full flex items-center justify-between text-[13.5px] font-medium text-[#233B33] py-3.5 cursor-pointer bg-white rounded-xl border border-[#ECE7DE] hover:border-[#B87E58] focus:outline-none focus:border-[#B87E58] transition-all shadow-2xs"
                                style={{ ...geo, minHeight: '30px', paddingLeft: '20px', paddingRight: '20px' }}
                              >
                                <span>{service.title} • {service.duration}</span>
                                <ChevronDown className="w-4 h-4 text-[#8A9490] transition-transform duration-200" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              className="w-[var(--radix-dropdown-menu-trigger-width)] bg-white border border-[#ECE7DE] rounded-xl p-2 shadow-xl z-50"
                              align="start"
                              sideOffset={6}
                            >
                              {SERVICE_OPTIONS.map((o) => (
                                <DropdownMenuItem
                                  key={o.id}
                                  onClick={() => handleServiceSelect(o)}
                                  className={`flex items-center justify-between rounded-lg text-[13.5px] font-medium cursor-pointer transition-colors ${service.id === o.id
                                      ? 'bg-[#FAF9F5] text-[#B87E58] font-semibold'
                                      : 'text-[#233B33] hover:bg-[#FAF9F5] hover:text-[#B87E58]'
                                    }`}
                                  style={{ ...geo, paddingLeft: '20px', paddingRight: '16px', paddingTop: '11px', paddingBottom: '11px' }}
                                >
                                  <span>{o.title} • {o.duration}</span>
                                  {service.id === o.id && (
                                    <Check className="w-4 h-4 text-[#B87E58] shrink-0" />
                                  )}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {/* 3. Service Description & Key Session Inclusions */}
                        <div style={{ paddingTop: '16px' }}>
                          <p className="text-[13px] text-[#556660] font-light leading-relaxed m-0" style={geo}>
                            {service.description}
                          </p>

                          {/* Always-visible Key Inclusions for rich content & balanced height */}
                          <div className="border-t border-[#ECE7DE]" style={{ marginTop: '16px', paddingTop: '16px' }}>
                            <span className="text-[11px] uppercase tracking-[0.12em] text-[#8A9490] font-semibold block" style={{ ...geo, marginBottom: '16px' }}>
                              Session Inclusions
                            </span>
                            <ul className="text-[12px] text-[#475751] m-0 p-0 list-none flex flex-col" style={{ ...geo, gap: '16px' }}>
                              {service.includes.map((item, i) => (
                                <li key={i} className="flex items-start gap-2.5">
                                  <CheckCircle2 className="w-4 h-4 text-[#B87E58] shrink-0 mt-0.5" />
                                  <span className="leading-snug">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* 4. Bottom Unified Reservation Preview & CTA (Taller & more prominent, absorbing middle space) */}
                      <div
                        style={{ paddingTop: '20px', marginTop: '16px' }}
                      >
                        {/* Appointment summary tile with enhanced inner padding */}
                        <div
                          className="flex items-center justify-between rounded-xl border border-[#ECE7DE] bg-white/70 shadow-2xs"
                          style={{ padding: '18px 20px', marginBottom: '36px' }}
                        >
                          <div>
                            <span className="text-[11px] uppercase tracking-[0.14em] text-[#8A9490] font-semibold block" style={geo}>
                              Confirmed Appointment
                            </span>
                            <span className="text-[14.5px] font-semibold text-[#233B33] mt-1.5 block leading-snug" style={geo}>
                              {dayName(day).slice(0, 3)}, {MONTHS[month].slice(0, 3)} {day}, {year}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[13.5px] font-semibold text-[#B87E58] bg-[#FAF9F5] px-4 py-2.5 rounded-lg border border-[#ECE7DE]" style={geo}>
                            <Clock className="w-4 h-4" />
                            <span>{time}</span>
                          </div>
                        </div>

                        {/* Taller Luxury CTA Button */}
                        <button
                          type="button"
                          onClick={goStep2}
                          className="w-full flex items-center justify-center gap-2.5 cursor-pointer transition-all duration-300 py-[18px] px-6 rounded-xl text-[12.5px] font-semibold uppercase tracking-[0.14em] text-white shadow-sm"
                          style={{
                            background: '#B87E58',
                            marginBottom: '28px',
                            minHeight: '42px',
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

                        {/* Disclaimer footer */}
                        <div
                          className="flex items-center justify-center gap-1.5 text-[11.5px] text-[#8A9490]"
                          style={{ ...geo }}
                        >
                          <ShieldCheck className="w-4 h-4 text-[#1F7A4C]" />
                          <span>100% Complimentary • No credit card required</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ═════ STEP 2 ═════════════════════════════════════════════════════ */}
          {step === 2 && (
            <div className="w-full flex flex-col items-center">
              {/* Booking summary bar with generous breathing room */}
              <div
                className="w-full max-w-[820px] flex flex-col sm:flex-row sm:items-center justify-between gap-6"
                style={{
                  padding: '24px 30px',
                  borderRadius: '16px',
                  backgroundColor: '#FAF9F5',
                  border: '1px solid #ECE7DE',
                  marginBottom: '40px',
                }}
              >
                <div>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#B87E58] font-semibold block mb-1.5" style={geo}>
                    Reserved Slot
                  </span>
                  <h3 className="text-2xl font-light text-[#233B33] m-0" style={serif}>
                    {service.title}
                  </h3>
                  <p className="text-[13px] text-[#71807A] font-light flex items-center gap-2 mt-2" style={geo}>
                    <CalendarDays className="w-4 h-4 text-[#B87E58]" />
                    <span>{fullDate()} at <strong className="text-[#233B33] font-semibold">{time} (PDT)</strong></span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-[12.5px] text-[#B87E58] hover:text-[#9E643E] font-medium tracking-wide transition-colors cursor-pointer self-start sm:self-auto"
                  style={geo}
                >
                  Modify Date & Time →
                </button>
              </div>

              {/* Form Card Container matching Step 1 Calendar Card */}
              <div className="w-full max-w-[820px] mx-auto bg-[#FAF9F5] border border-[#ECE7DE] rounded-2xl"
                style={{ padding: '40px 36px 48px' }}
              >
                <div
                  className="flex items-baseline justify-between border-b border-[#ECE7DE]"
                  style={{ paddingBottom: '20px', marginBottom: '36px' }}
                >
                  <h2 className="text-[15px] font-medium uppercase tracking-[0.14em] text-[#233B33] flex items-center gap-2.5 m-0" style={geo}>
                    <User className="w-4 h-4 text-[#B87E58]" />
                    <span>Your Contact Information</span>
                  </h2>
                  <span className="text-[12px] text-[#71807A]" style={geo}>
                    Fields marked with <span className="text-[#B87E58]">*</span> are required
                  </span>
                </div>

                <form onSubmit={goStep3} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.12em] font-semibold text-[#8A9490] mb-2.5" style={geo}>
                        Full Name <span className="text-[#B87E58]">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <div className="absolute left-4 pointer-events-none flex items-center justify-center text-[#8A9490] z-10">
                          <User className="w-[18px] h-[18px]" />
                        </div>
                        <input
                          type="text"
                          required
                          placeholder="Eleanor Vance"
                          value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })}
                          className="w-full text-[#233B33] bg-white rounded-xl border border-[#ECE7DE] focus:outline-none focus:border-[#B87E58] transition-all shadow-2xs"
                          style={{
                            ...geo,
                            height: '52px',
                            paddingLeft: '48px',
                            paddingRight: '16px',
                            fontSize: '14px',
                            lineHeight: 'normal',
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.12em] font-semibold text-[#8A9490] mb-2.5" style={geo}>
                        Email Address <span className="text-[#B87E58]">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <div className="absolute left-4 pointer-events-none flex items-center justify-center text-[#8A9490] z-10">
                          <Mail className="w-[18px] h-[18px]" />
                        </div>
                        <input
                          type="email"
                          required
                          placeholder="eleanor@example.com"
                          value={form.email}
                          onChange={e => setForm({ ...form, email: e.target.value })}
                          className="w-full text-[#233B33] bg-white rounded-xl border border-[#ECE7DE] focus:outline-none focus:border-[#B87E58] transition-all shadow-2xs"
                          style={{
                            ...geo,
                            height: '52px',
                            paddingLeft: '48px',
                            paddingRight: '16px',
                            fontSize: '14px',
                            lineHeight: 'normal',
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Phone & Format */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.12em] font-semibold text-[#8A9490] mb-2.5" style={geo}>
                        Phone Number
                      </label>
                      <div className="relative flex items-center">
                        <div className="absolute left-4 pointer-events-none flex items-center justify-center text-[#8A9490] z-10">
                          <Phone className="w-[18px] h-[18px]" />
                        </div>
                        <input
                          type="tel"
                          placeholder="(555) 234-5678"
                          value={form.phone}
                          onChange={e => setForm({ ...form, phone: e.target.value })}
                          className="w-full text-[#233B33] bg-white rounded-xl border border-[#ECE7DE] focus:outline-none focus:border-[#B87E58] transition-all shadow-2xs"
                          style={{
                            ...geo,
                            height: '52px',
                            paddingLeft: '48px',
                            paddingRight: '16px',
                            fontSize: '14px',
                            lineHeight: 'normal',
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.12em] font-semibold text-[#8A9490] mb-2.5" style={geo}>
                        Meeting Format
                      </label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            className="w-full relative flex items-center justify-between text-[#233B33] bg-white rounded-xl border border-[#ECE7DE] hover:border-[#B87E58] focus:outline-none focus:border-[#B87E58] transition-all shadow-2xs cursor-pointer text-left"
                            style={{
                              ...geo,
                              height: '52px',
                              paddingLeft: '48px',
                              paddingRight: '16px',
                              fontSize: '14px',
                            }}
                          >
                            <div className="absolute left-4 pointer-events-none flex items-center justify-center text-[#8A9490]">
                              <MapPin className="w-[18px] h-[18px]" />
                            </div>
                            <span className="truncate">{form.format}</span>
                            <ChevronDown className="w-4 h-4 text-[#8A9490] shrink-0" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          className="w-[var(--radix-dropdown-menu-trigger-width)] bg-white border border-[#ECE7DE] rounded-xl p-2 shadow-xl z-50"
                          align="start"
                          sideOffset={6}
                        >
                          {['Video Call (Google Meet)', 'Phone Call', 'In-Person (Office)'].map((option) => (
                            <DropdownMenuItem
                              key={option}
                              onClick={() => setForm({ ...form, format: option })}
                              className={`flex items-center justify-between rounded-lg text-[13.5px] font-medium cursor-pointer transition-colors ${
                                form.format === option
                                  ? 'bg-[#FAF9F5] text-[#B87E58] font-semibold'
                                  : 'text-[#233B33] hover:bg-[#FAF9F5] hover:text-[#B87E58]'
                              }`}
                              style={{ ...geo, paddingLeft: '16px', paddingRight: '14px', paddingTop: '10px', paddingBottom: '10px' }}
                            >
                              <span>{option}</span>
                              {form.format === option && (
                                <Check className="w-4 h-4 text-[#B87E58] shrink-0" />
                              )}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Row 3: Property Goals */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.12em] font-semibold text-[#8A9490] mb-2.5" style={geo}>
                      Property Goals (Optional)
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-4.5 pointer-events-none flex items-center justify-center text-[#8A9490] z-10">
                        <MessageSquare className="w-[18px] h-[18px]" />
                      </div>
                      <textarea
                        rows={4}
                        placeholder="Desired location, budget, or specific properties..."
                        value={form.notes}
                        onChange={e => setForm({ ...form, notes: e.target.value })}
                        className="w-full text-[#233B33] bg-white rounded-xl border border-[#ECE7DE] focus:outline-none focus:border-[#B87E58] transition-all resize-none shadow-2xs"
                        style={{
                          ...geo,
                          minHeight: '124px',
                          paddingLeft: '48px',
                          paddingRight: '16px',
                          paddingTop: '16px',
                          paddingBottom: '16px',
                          fontSize: '14px',
                          lineHeight: '1.6',
                        }}
                      />
                    </div>
                  </div>

                  {/* Row 4: Confidentiality Note */}
                  <div
                    className="flex items-center gap-3 text-[12px] text-[#71807A] bg-white/70 p-4 rounded-xl border border-[#ECE7DE]"
                    style={geo}
                  >
                    <ShieldCheck className="w-4 h-4 text-[#1F7A4C] shrink-0" />
                    <span>Your contact details are strictly confidential and will never be shared.</span>
                  </div>

                  {/* Row 5: Action Buttons */}
                  <div
                    className="flex items-center justify-between gap-6 border-t border-[#ECE7DE]"
                    style={{ paddingTop: '28px', marginTop: '4px' }}
                  >
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="min-w-[140px] sm:min-w-[160px] flex items-center justify-center gap-2 cursor-pointer transition-colors px-6 rounded-xl border border-[#ECE7DE] bg-white text-[#233B33] hover:bg-[#FAF9F5] text-[12.5px] font-semibold uppercase tracking-[0.14em] shadow-2xs"
                      style={{
                        ...geo,
                        height: '52px',
                      }}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="max-w-[420px] w-full flex items-center justify-center gap-2.5 cursor-pointer transition-all duration-300 px-8 rounded-xl text-[12.5px] font-semibold uppercase tracking-[0.14em] text-white shadow-sm disabled:opacity-75 disabled:cursor-not-allowed"
                      style={{
                        background: '#B87E58',
                        height: '52px',
                        ...geo,
                      }}
                      onMouseEnter={e => { if (!isSubmitting) e.currentTarget.style.backgroundColor = '#9F643E'; }}
                      onMouseLeave={e => { if (!isSubmitting) e.currentTarget.style.backgroundColor = '#B87E58'; }}
                    >
                      <span>{isSubmitting ? 'Reserving Session...' : 'Confirm Appointment'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ═════ STEP 3 ═════════════════════════════════════════════════════ */}
          {step === 3 && (
            <div className="w-full flex flex-col items-center">
              <div
                className="w-full max-w-[820px] bg-[#FAF9F5] border border-[#ECE7DE] rounded-2xl text-center"
                style={{ padding: '48px 36px 52px' }}
              >
                {/* Success Icon */}
                <div
                  className="w-20 h-20 mx-auto flex items-center justify-center rounded-full"
                  style={{ backgroundColor: 'rgba(184, 126, 88, 0.12)', marginBottom: '28px' }}
                >
                  <CheckCircle2 className="w-10 h-10 text-[#B87E58]" />
                </div>

                {/* Heading & Subtitle */}
                <div style={{ marginBottom: '36px' }}>
                  <h2 className="text-3xl sm:text-4xl font-normal text-[#233B33] m-0" style={serif}>
                    You're All Set
                  </h2>
                  <p className="mt-3 text-[14px] text-[#6C7A75] font-light leading-relaxed max-w-md mx-auto" style={geo}>
                    Thank you, <strong className="font-semibold text-[#233B33]">{form.name}</strong>. A calendar invite has been prepared for <span className="text-[#B87E58] font-medium">{form.email}</span>.
                  </p>
                </div>

                {/* Booking Summary Box with Step 2 matching paddings and borders */}
                <div
                  className="text-left bg-white rounded-xl border border-[#ECE7DE] shadow-2xs mx-auto"
                  style={{ padding: '28px 32px', marginBottom: '36px' }}
                >
                  <div
                    className="flex items-center justify-between border-b border-[#ECE7DE]"
                    style={{ paddingBottom: '18px', marginBottom: '22px' }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[12px] uppercase tracking-[0.14em] font-semibold text-[#233B33]" style={geo}>
                        Booking Summary
                      </span>
                      {bookingConfirmationId && (
                        <span className="text-[11px] text-[#8A9490] font-mono tracking-wider">
                          #{bookingConfirmationId}
                        </span>
                      )}
                    </div>
                    <span
                      className="text-[11px] uppercase tracking-[0.14em] font-semibold text-[#1F7A4C] bg-[#E8F5EE] px-3.5 py-1 rounded-full"
                      style={geo}
                    >
                      Confirmed
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8 text-[13.5px]" style={geo}>
                    <div>
                      <span className="text-[11px] uppercase tracking-[0.12em] font-semibold text-[#8A9490] block mb-1">
                        Service
                      </span>
                      <span className="font-medium text-[#233B33]">{service.title}</span>
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-[0.12em] font-semibold text-[#8A9490] block mb-1">
                        Duration
                      </span>
                      <span className="font-medium text-[#233B33]">{service.duration}</span>
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-[0.12em] font-semibold text-[#8A9490] block mb-1">
                        Date
                      </span>
                      <span className="font-medium text-[#233B33]">{fullDate()}</span>
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-[0.12em] font-semibold text-[#8A9490] block mb-1">
                        Time
                      </span>
                      <span className="font-semibold text-[#B87E58]">{time} (PDT)</span>
                    </div>
                    <div className="sm:col-span-2 pt-4 border-t border-[#ECE7DE]">
                      <span className="text-[11px] uppercase tracking-[0.12em] font-semibold text-[#8A9490] block mb-1">
                        Format
                      </span>
                      <span className="font-medium text-[#233B33]">{form.format}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons matching Step 2 height & styling */}
                <div
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-[#ECE7DE]"
                  style={{ paddingTop: '32px' }}
                >
                  <button
                    type="button"
                    onClick={downloadCalendarInvite}
                    className="w-full sm:flex-1 max-w-[240px] flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 px-6 rounded-xl text-[12px] font-semibold uppercase tracking-[0.14em] text-white shadow-sm"
                    style={{
                      backgroundColor: '#B87E58',
                      height: '52px',
                      ...geo,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#9F643E'; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#B87E58'; }}
                  >
                    <CalendarDays className="w-4 h-4" />
                    <span>Add to Calendar</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="w-full sm:flex-1 max-w-[240px] flex items-center justify-center cursor-pointer transition-all duration-300 px-6 rounded-xl text-[12px] font-semibold uppercase tracking-[0.14em] text-white shadow-sm"
                    style={{
                      backgroundColor: '#233B33',
                      height: '52px',
                      ...geo,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1A312B'; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#233B33'; }}
                  >
                    Return to Home
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setForm({ name: '', email: '', phone: '', format: 'Video Call (Google Meet)', notes: '' });
                    }}
                    className="w-full sm:flex-1 max-w-[240px] flex items-center justify-center cursor-pointer transition-colors px-6 rounded-xl border border-[#ECE7DE] bg-white text-[#233B33] hover:bg-[#FAF9F5] text-[12px] font-semibold uppercase tracking-[0.14em] shadow-2xs"
                    style={{
                      height: '52px',
                      ...geo,
                    }}
                  >
                    Book Another
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
