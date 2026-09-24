import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";


export function Calendar({
  selectedDate,
  onSelectDate,
  month,
  year,
  onPrevMonth,
  onNextMonth,
  className,
}) {
  const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const weeks = React.useMemo(() => {
    const first = new Date(year, month, 1).getDay();
    const total = new Date(year, month + 1, 0).getDate();
    const w = [];
    let r = [];
    for (let i = 0; i < first; i++) r.push(null);
    for (let d = 1; d <= total; d++) {
      r.push(d);
      if (r.length === 7) {
        w.push(r);
        r = [];
      }
    }
    if (r.length) {
      while (r.length < 7) r.push(null);
      w.push(r);
    }
    return w;
  }, [year, month]);

  const isAvail = (d) => {
    if (!d) return false;
    const dow = new Date(year, month, d).getDay();
    return dow !== 0 && dow !== 6; // Mon - Fri
  };

  const isToday = (d) => {
    if (!d) return false;
    const today = new Date();
    return (
      d === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  return (
    <div className={cn("w-full bg-[#FAF9F5]/70 rounded-2xl border border-[#ECE7DE] p-5 sm:p-7", className)}>
  
      <div 
        className="flex items-center justify-between px-2"
        style={{ paddingTop: '10px', paddingBottom: '24px' }}
      >
        <h4 
          className="text-[15.5px] font-semibold text-[#233B33] tracking-wide select-none"
          style={{ paddingLeft: '16px' }}
        >
          {MONTHS[month]} <span className="font-normal text-[#8A9490]">{year}</span>
        </h4>
        <div className="flex items-center gap-1.5" style={{ paddingRight: '16px' }}>
          <button
            type="button"
            onClick={onPrevMonth}
            className="h-7 w-7 flex items-center justify-center rounded-md border border-[#ECE7DE] bg-white text-[#233B33] hover:bg-[#F3ECE4] hover:text-[#B87E58] transition-colors cursor-pointer shadow-2xs"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={onNextMonth}
            className="h-7 w-7 flex items-center justify-center rounded-md border border-[#ECE7DE] bg-white text-[#233B33] hover:bg-[#F3ECE4] hover:text-[#B87E58] transition-colors cursor-pointer shadow-2xs"
            aria-label="Next month"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 py-3.5 px-2 border-b border-[#ECE7DE]">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d, index) => {
          const isWeekend = index === 0 || index === 6;
          return (
            <div key={d} className="w-full flex items-center justify-center">
              <span 
                className={cn(
                  "text-[11px] uppercase tracking-[0.14em] font-semibold text-center select-none",
                  isWeekend ? "text-[#D9534F] font-bold" : "text-[#8A9490]"
                )}
              >
                {d}
              </span>
            </div>
          );
        })}
      </div>


      <div className="space-y-3 pt-5 pb-3 px-2">
        {weeks.map((wk, wi) => (
          <div key={wi} className="grid grid-cols-7 items-center">
            {wk.map((d, di) => {
              if (!d) return <div key={di} className="h-11 w-full" />;
              const isSelected = selectedDate === d;
              const available = isAvail(d);
              const today = isToday(d);
              const isWeekend = di === 0 || di === 6;

              return (
                <div key={di} className="w-full flex items-center justify-center">
                  <button
                    type="button"
                    disabled={!available}
                    onClick={() => onSelectDate(d)}
                    className={cn(
                      "h-11 w-11 rounded-xl flex items-center justify-center text-[13.5px] transition-all relative font-medium cursor-pointer select-none",
                      isSelected
                        ? "bg-[#B87E58] text-white shadow-md font-semibold"
                        : available
                        ? "text-[#233B33] hover:bg-white hover:text-[#B87E58] hover:shadow-xs active:scale-95"
                        : isWeekend
                        ? "text-[#D9534F]/60 cursor-not-allowed opacity-80 font-medium"
                        : "text-[#C8CECB] cursor-not-allowed opacity-40 font-light",
                      today && !isSelected && "border border-[#B87E58]/40"
                    )}
                  >
                    <span>{d}</span>
                    {/* Active bookable subtle indicator */}
                    {available && !isSelected && (
                      <span className="absolute bottom-1.5 w-1 h-1 rounded-full bg-[#B87E58]/50" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>

     
      <div 
        className="flex items-center justify-between px-2 border-t border-[#ECE7DE] text-[12px] text-[#7E8C86]"
        style={{ paddingTop: '24px', paddingBottom: '16px', marginTop: '20px' }}
      >
        <div className="flex items-center gap-2" style={{ paddingLeft: '16px' }}>
          <span className="w-2.5 h-2.5 rounded-full bg-[#B87E58]" />
          <span>Available Weekdays</span>
        </div>
        <div className="flex items-center gap-2" style={{ paddingRight: '16px' }}>
          <span className="w-2.5 h-2.5 rounded-full bg-[#D9534F]" />
          <span className="text-[#D9534F]">Weekends Closed</span>
        </div>
      </div>
    </div>
  );
}
