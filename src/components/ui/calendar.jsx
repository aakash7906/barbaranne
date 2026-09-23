import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

/**
 * Luxury Shadcn-styled Calendar Component
 * Matches shadcn/ui calendar aesthetics, typography and states
 * with custom warm luxury palette (#233B33, #B87E58, #FAF9F5, #ECE7DE)
 */
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
    <div className={cn("p-4 sm:p-5 w-full bg-[#FAF9F5]/70 rounded-2xl border border-[#ECE7DE]", className)}>
      {/* Month Header / Navigation (shadcn style) */}
      <div className="flex items-center justify-between pb-4">
        <h4 className="text-[15px] font-semibold text-[#233B33] tracking-wide select-none">
          {MONTHS[month]} <span className="font-normal text-[#8A9490]">{year}</span>
        </h4>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onPrevMonth}
            className="h-8 w-8 flex items-center justify-center rounded-lg border border-[#ECE7DE] bg-white text-[#233B33] hover:bg-[#F3ECE4] hover:text-[#B87E58] transition-colors cursor-pointer shadow-xs"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onNextMonth}
            className="h-8 w-8 flex items-center justify-center rounded-lg border border-[#ECE7DE] bg-white text-[#233B33] hover:bg-[#F3ECE4] hover:text-[#B87E58] transition-colors cursor-pointer shadow-xs"
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Weekday labels */}
      <div className="grid grid-cols-7 text-center text-[11px] uppercase tracking-[0.12em] font-semibold text-[#8A9490] py-2 border-b border-[#ECE7DE]/60">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <span key={d} className="py-0.5">{d}</span>
        ))}
      </div>

      {/* Calendar Grid Days */}
      <div className="space-y-1.5 pt-3">
        {weeks.map((wk, wi) => (
          <div key={wi} className="grid grid-cols-7 text-center gap-1 sm:gap-1.5">
            {wk.map((d, di) => {
              if (!d) return <div key={di} className="h-10 w-full" />;
              const isSelected = selectedDate === d;
              const available = isAvail(d);
              const today = isToday(d);

              return (
                <button
                  key={di}
                  type="button"
                  disabled={!available}
                  onClick={() => onSelectDate(d)}
                  className={cn(
                    "h-10 w-full max-w-[42px] mx-auto rounded-xl flex items-center justify-center text-[13px] transition-all relative font-medium cursor-pointer select-none",
                    isSelected
                      ? "bg-[#B87E58] text-white shadow-md font-semibold"
                      : available
                      ? "text-[#233B33] hover:bg-white hover:text-[#B87E58] hover:shadow-xs active:scale-95"
                      : "text-[#C8CECB] cursor-not-allowed opacity-40 font-light",
                    today && !isSelected && "border border-[#B87E58]/40"
                  )}
                >
                  <span>{d}</span>
                  {/* Active bookable subtle indicator */}
                  {available && !isSelected && (
                    <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#B87E58]/50" />
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer Info / Legend */}
      <div className="flex items-center justify-between pt-4 mt-3 border-t border-[#ECE7DE]/60 text-[11px] text-[#7E8C86]">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#B87E58]" />
          <span>Available Weekdays</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#C8CECB]" />
          <span>Weekends Closed</span>
        </div>
      </div>
    </div>
  );
}
