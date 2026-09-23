import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export default function BookingPage() {
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // ─── Booking State ───────────────────────────────────────────────────────────
  const [selectedDay, setSelectedDay] = useState(22);
  const [selectedMonth, setSelectedMonth] = useState('September 2026');
  const [selectedTime, setSelectedTime] = useState('10:00 am');
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [step, setStep] = useState(1); // 1: Schedule, 2: Client Info, 3: Confirmed

  // Client Details
  const [clientInfo, setClientInfo] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  // Time Slots
  const timeSlots = [
    '10:00 am',
    '10:30 am',
    '11:00 am',
    '11:30 am',
    '12:00 pm',
    '12:30 pm',
    '1:00 pm',
    '1:30 pm',
    '2:00 pm',
    '2:30 pm',
  ];

  // Calendar Days for September 2026 (Sept 1 is Tuesday)
  // Weeks array: [ [Sun, Mon, Tue, Wed, Thu, Fri, Sat], ... ]
  const calendarWeeks = [
    [null, null, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26],
    [27, 28, 29, 30, null, null, null],
  ];

  // Days with dot indicators
  const availableDays = [22, 23, 24, 25, 29, 30];

  const getDayName = (day) => {
    const date = new Date(2026, 8, day);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const handleNext = (e) => {
    if (e) e.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!clientInfo.name || !clientInfo.email) return;
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-[#F5F4F0] min-h-[calc(100vh-72px)] py-10 sm:py-16 px-4 sm:px-8 md:px-12 flex justify-center">
      <div className="w-full max-w-[1180px] bg-white p-6 sm:p-12 md:p-16 shadow-xs">
        {/* ── Top Back Button ─────────────────────────────────────────────────── */}
        <button
          onClick={() => (step > 1 ? setStep(step - 1) : navigate(-1))}
          className="flex items-center gap-1 text-xs text-[#2B3B32] hover:text-[#B87E58] transition-colors mb-6 group cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Back</span>
        </button>

        {/* ── Page Header ─────────────────────────────────────────────────────── */}
        <div className="mb-10 sm:mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#2B3B32] tracking-tight">
            Schedule your service
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#6C7A75] font-light">
            Check out our availability and book the date and time that works for you
          </p>
        </div>

        {/* ── STEP 1: Interactive Date & Time Selection (Screenshot Match) ─────── */}
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pt-2">
            {/* Left Section: Date and Time (approx 8.5 cols) */}
            <div className="lg:col-span-8 xl:col-span-8 flex flex-col">
              {/* Header: Title + Timezone */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-[#2B3B32]/10 gap-2">
                <h2 className="text-sm font-normal text-[#2B3B32] tracking-wide">
                  Select a Date and Time
                </h2>
                <div className="text-[11px] text-[#6C7A75] flex items-center gap-1 cursor-default font-light">
                  <span>Time zone: Pacific Daylight Time (PDT)</span>
                  <ChevronDown className="h-3 w-3" />
                </div>
              </div>

              {/* Two-part layout: Calendar (Left) & Time Slots (Right) */}
              <div className="flex flex-col md:flex-row gap-8 lg:gap-12 pt-6 items-start">
                {/* ── Calendar Column ────────────────────────────────────────── */}
                <div className="w-full md:w-[260px] shrink-0">
                  {/* Month Switcher Centered */}
                  <div className="flex items-center justify-center gap-6 mb-6">
                    <button
                      onClick={() => {}}
                      className="p-1 text-[#2B3B32] hover:text-[#B87E58] transition-colors cursor-pointer"
                      aria-label="Previous month"
                    >
                      <ChevronLeft className="h-4 w-4 stroke-[1.5]" />
                    </button>
                    <span className="text-xs sm:text-[13px] font-normal text-[#2B3B32] tracking-wide select-none">
                      {selectedMonth}
                    </span>
                    <button
                      onClick={() => {}}
                      className="p-1 text-[#2B3B32] hover:text-[#B87E58] transition-colors cursor-pointer"
                      aria-label="Next month"
                    >
                      <ChevronRight className="h-4 w-4 stroke-[1.5]" />
                    </button>
                  </div>

                  {/* Days of Week Header */}
                  <div className="grid grid-cols-7 text-center text-[10.5px] font-light text-[#6C7A75] mb-2">
                    <span>Sun</span>
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                  </div>

                  {/* Calendar Days Grid */}
                  <div className="space-y-1">
                    {calendarWeeks.map((week, wIdx) => (
                      <div key={wIdx} className="grid grid-cols-7 text-center">
                        {week.map((day, dIdx) => {
                          if (!day) {
                            return <div key={dIdx} className="h-8 w-8" />;
                          }
                          const isSelected = selectedDay === day;
                          const hasDot = availableDays.includes(day);

                          return (
                            <div
                              key={dIdx}
                              onClick={() => setSelectedDay(day)}
                              className="h-8 flex flex-col items-center justify-center cursor-pointer relative"
                            >
                              <div
                                className={`h-7 w-7 flex items-center justify-center text-xs transition-all ${
                                  isSelected
                                    ? 'bg-[#B87E58] text-white font-medium'
                                    : 'text-[#2B3B32] hover:bg-[#F5F4F0] font-light'
                                }`}
                              >
                                {day}
                              </div>
                              {/* Availability indicator dot */}
                              {hasDot && !isSelected && (
                                <span className="absolute bottom-0.5 h-1 w-1 rounded-full bg-[#B87E58]/80" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Time Slots Column ──────────────────────────────────────── */}
                <div className="flex-1 w-full flex flex-col">
                  {/* Dynamic Availability Date Label */}
                  <p className="text-xs sm:text-[13px] text-[#4A5652] font-light mb-5">
                    Availability for {getDayName(selectedDay)}, September {selectedDay}
                  </p>

                  {/* 4-column Grid of time slots matching screenshot */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                    {timeSlots.map((slot) => {
                      const isSlotSelected = selectedTime === slot;
                      return (
                        <button
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          className={`py-2 px-1 text-[11px] sm:text-xs font-light border transition-all cursor-pointer text-center ${
                            isSlotSelected
                              ? 'bg-[#B87E58] text-white border-[#B87E58] font-normal shadow-xs'
                              : 'bg-white text-[#2B3B32] border-[#2B3B32]/25 hover:border-[#B87E58] hover:text-[#B87E58]'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>

                  {/* Show all sessions link */}
                  <div className="mt-6 text-center">
                    <button
                      className="text-[11px] text-[#4A5652] hover:text-[#B87E58] transition-colors underline underline-offset-4 cursor-pointer"
                      onClick={() => {}}
                    >
                      Show all sessions
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section: Service Details & Next Button (approx 4 cols) */}
            <div className="lg:col-span-4 xl:col-span-4 flex flex-col justify-start">
              {/* Header: Service Details aligned with Select a Date and Time */}
              <div className="pb-3.5 border-b border-[#2B3B32]/10">
                <h3 className="text-sm font-normal text-[#2B3B32] tracking-wide">
                  Service Details
                </h3>
              </div>

              <div className="pt-6 pb-6">
                <h4 className="font-serif text-lg font-normal text-[#2B3B32]">
                  Free Consultation
                </h4>

                {/* Collapsible More details */}
                <button
                  onClick={() => setShowMoreDetails(!showMoreDetails)}
                  className="flex items-center gap-1 text-xs text-[#6C7A75] hover:text-[#B87E58] transition-colors mt-2 cursor-pointer"
                >
                  <span className="font-light">More details</span>
                  {showMoreDetails ? (
                    <ChevronUp className="h-3.5 w-3.5" />
                  ) : (
                    <ChevronDown className="h-3.5 w-3.5" />
                  )}
                </button>

                {showMoreDetails && (
                  <div className="mt-3 p-3.5 bg-[#F5F4F0] text-xs font-light text-[#4A5652] space-y-1.5 leading-relaxed">
                    <p className="flex items-center gap-1.5 font-normal text-[#2B3B32]">
                      <Clock className="h-3.5 w-3.5 text-[#B87E58]" /> 1 hour session &bull; Free
                    </p>
                    <p>Confidential video call / in-person advisory with Barbaranne Hill-Irving.</p>
                    <p>Covers investment goals, property valuation, or buyer guidance.</p>
                  </div>
                )}

                {/* Selected Slot Summary */}
                <div className="mt-8 pt-4 border-t border-[#2B3B32]/10 text-xs text-[#4A5652] space-y-1">
                  <p className="font-medium text-[#2B3B32]">Selected Date & Time:</p>
                  <p className="text-[#B87E58]">
                    Tuesday, Sept {selectedDay}, 2026 at {selectedTime}
                  </p>
                </div>
              </div>

              {/* Next Button */}
              <div className="pt-4">
                <button
                  onClick={handleNext}
                  className="w-full bg-[#B87E58] text-white py-2.5 text-xs font-normal tracking-[0.14em] uppercase transition-colors hover:bg-[#A36B46] cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 2: Client Contact Details Form ─────────────────────────────── */}
        {step === 2 && (
          <form
            onSubmit={handleConfirm}
            className="max-w-xl mx-auto py-6 space-y-6 animate-in fade-in"
          >
            <div className="bg-[#F5F4F0] p-4 text-xs text-[#2B3B32] space-y-1 border-l-2 border-[#B87E58]">
              <p className="font-medium">Free Consultation with Barbaranne Hill-Irving</p>
              <p className="text-[#6C7A75]">
                {getDayName(selectedDay)}, September {selectedDay}, 2026 at {selectedTime} (PDT)
              </p>
            </div>

            <div>
              <label className="block text-xs font-normal tracking-[0.04em] text-[#2B3B32] mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="Your full name"
                value={clientInfo.name}
                onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                className="w-full border border-[#2B3B32]/20 bg-white p-2.5 text-sm text-[#2B3B32] focus:border-[#B87E58] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-normal tracking-[0.04em] text-[#2B3B32] mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="your.email@example.com"
                value={clientInfo.email}
                onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                className="w-full border border-[#2B3B32]/20 bg-white p-2.5 text-sm text-[#2B3B32] focus:border-[#B87E58] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-normal tracking-[0.04em] text-[#2B3B32] mb-1.5">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                placeholder="(123) 456-7890"
                value={clientInfo.phone}
                onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                className="w-full border border-[#2B3B32]/20 bg-white p-2.5 text-sm text-[#2B3B32] focus:border-[#B87E58] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-normal tracking-[0.04em] text-[#2B3B32] mb-1.5">
                Add Your Message / Property Goals (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Tell Barbaranne briefly what you would like to discuss..."
                value={clientInfo.notes}
                onChange={(e) => setClientInfo({ ...clientInfo, notes: e.target.value })}
                className="w-full border border-[#2B3B32]/20 bg-white p-2.5 text-sm text-[#2B3B32] focus:border-[#B87E58] focus:outline-none"
              />
            </div>

            <div className="pt-4 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-6 py-2.5 text-xs text-[#2B3B32] border border-[#2B3B32]/30 hover:border-[#2B3B32] transition-colors cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 bg-[#B87E58] text-white py-3 text-xs font-normal tracking-[0.14em] uppercase transition-colors hover:bg-[#A36B46] cursor-pointer"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        )}

        {/* ── STEP 3: Booking Success Confirmation ───────────────────────────── */}
        {step === 3 && (
          <div className="max-w-md mx-auto py-12 text-center space-y-5 animate-in fade-in">
            <CheckCircle2 className="mx-auto h-16 w-16 text-[#B87E58]" />
            <h2 className="font-serif text-3xl font-medium text-[#2B3B32]">
              You're Booked!
            </h2>
            <p className="text-sm font-light text-[#4A5652] leading-relaxed">
              Thank you, <strong className="font-medium text-[#2B3B32]">{clientInfo.name}</strong>. A confirmation email and calendar invitation have been sent to{' '}
              <span className="text-[#B87E58] font-medium">{clientInfo.email}</span>.
            </p>

            <div className="bg-[#F5F4F0] p-5 text-xs text-[#2B3B32] text-left space-y-2 mt-6">
              <p className="font-medium text-[#2B3B32] border-b border-[#2B3B32]/10 pb-2">
                Booking Summary:
              </p>
              <p>
                <strong>Service:</strong> Free Consultation (1 hr)
              </p>
              <p>
                <strong>Date & Time:</strong> {getDayName(selectedDay)}, September {selectedDay}, 2026 at {selectedTime} (PDT)
              </p>
              <p>
                <strong>Consultant:</strong> Barbaranne Hill-Irving
              </p>
            </div>

            <div className="pt-6">
              <button
                onClick={() => navigate('/')}
                className="border border-[#2B3B32] bg-transparent px-10 py-2.5 text-xs tracking-[0.16em] uppercase text-[#2B3B32] transition-colors hover:bg-[#2B3B32] hover:text-white cursor-pointer"
              >
                Return to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
