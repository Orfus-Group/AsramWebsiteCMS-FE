import { useEffect, useRef, useState } from "react";

const hours = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
const minutes = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0")
);

export default function TimePicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [hour, setHour] = useState("07");
  const [minute, setMinute] = useState("38");
  const [ampm, setAmpm] = useState("AM");
  const ref = useRef(null);

  // Sync internal state with external value prop
  useEffect(() => {
    if (value) {
      const parts = value.split(" ");
      if (parts.length === 2 && parts[0].includes(":")) {
        const [time, meridian] = parts;
        const [h, m] = time.split(":");
        setHour(h);
        setMinute(m);
        setAmpm(meridian);
      }
    }
  }, [value]);

  // Click outside to close
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const select = (h = hour, m = minute, a = ampm) => {
    setHour(h);
    setMinute(m);
    setAmpm(a);
    onChange(`${h}:${m} ${a}`);
  };

  // Styles from Figma
  const containerStyle = {
    height: '48px',
    padding: '12px 20px',
    borderRadius: '9px',
    border: open ? '1px solid #333' : '1px solid rgba(7, 7, 7, 0.2)',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    position: 'relative',
    transition: 'border-color 0.2s ease'
  };

  const textStyle = {
    fontFamily: 'Montserrat',
    fontSize: '18px',
    fontWeight: '400',
    lineHeight: '1.11',
    letterSpacing: 'normal',
    textAlign: 'left',
    color: value ? '#333' : 'rgba(25, 25, 25, 0.75)',
    flexGrow: 1
  };

  return (
    <div className="relative flex-1" ref={ref} style={{ fontFamily: 'Montserrat' }}>
      {/* INPUT TRIGGER */}
      <div
        onClick={() => setOpen(!open)}
        style={containerStyle}
      >
        <span style={textStyle}>
          {value || "Time"}
        </span>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Clock Icon */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#6b7280' }}>
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>
      </div>

      {/* PICKER DROPDOWN */}
      {open && (
        <div className="absolute z-[100] top-[56px] left-0 w-full min-w-[240px] bg-white border border-gray-100 rounded-[12px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] overflow-hidden animate-in fade-in zoom-in-95 duration-100">

          {/* Columns Container */}
          <div className="flex h-[240px]">
            {/* HOURS */}
            <Column
              data={hours}
              value={hour}
              onSelect={(h) => select(h, minute, ampm)}
              label="Hour"
            />

            {/* MINUTES */}
            <Column
              data={minutes}
              value={minute}
              onSelect={(m) => select(hour, m, ampm)}
              label="Min"
            />

            {/* AM PM - AUTO CLOSE ON SELECT */}
            <Column
              data={["AM", "PM"]}
              value={ampm}
              onSelect={(a) => {
                select(hour, minute, a);
                setOpen(false); // Close on AM/PM selection
              }}
              label="Period"
              isAmPm
            />
          </div>
        </div>
      )}
    </div>
  );
}

function Column({ data, value, onSelect, label, isAmPm = false }) {
  const selectedRef = useRef(null);

  // Auto-scroll to selected item when opened
  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({ block: "center" });
    }
  }, []);

  return (
    <div className={`flex-1 flex flex-col border-r border-gray-50 last:border-r-0 ${isAmPm ? 'bg-gray-50/50' : ''}`}>
      {/* Header */}
      <div className="text-[10px] items-center justify-center flex font-bold text-gray-400 bg-white py-2 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-50 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
        {label}
      </div>

      {/* Scrollable list - Scrollbar visible now */}
      <div className="overflow-y-auto py-2 h-full scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        {/* Top Spacer to prevent cutoff behind sticky header if scrolled up */}
        <div className="h-[20px] w-full"></div>

        {data.map((item) => {
          const isSelected = value === item;
          return (
            <div
              key={item}
              ref={isSelected ? selectedRef : null}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(item);
              }}
              className={`py-2.5 flex items-center justify-center cursor-pointer text-[15px] transition-all duration-200
                        ${isSelected
                  ? "bg-[#E0F2F1] text-[#004D40] font-bold scale-100"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
            >
              {item}
            </div>
          );
        })}
        {/* Bottom Spacer for comfortable scrolling */}
        <div className={`w-full pointer-events-none ${isAmPm ? 'h-[100px]' : 'h-[100px]'}`}></div>
      </div>
    </div>
  );
}
