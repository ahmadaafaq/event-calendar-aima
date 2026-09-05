import React from 'react';
import { Calendar } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-xs" id="top-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logos: AIMA & UC Santa Cruz */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a href="/" className="flex items-center space-x-2.5 sm:space-x-3 group">
              {/* AIMA Box */}
              <div className="h-9 px-2.5 bg-[#004A8F] flex items-center justify-center text-white text-[11px] font-extrabold tracking-wider rounded shadow-xs group-hover:bg-[#003669] transition-colors">
                <span>AIMA</span>
              </div>

              {/* Vertical divider */}
              <div className="h-6 w-px bg-slate-300"></div>

              {/* UC Santa Cruz Box */}
              <div className="h-9 px-2.5 bg-[#FFD100] flex items-center justify-center text-[#002A5C] text-[11px] font-extrabold tracking-wider rounded shadow-xs">
                <span>UC SANTA CRUZ</span>
              </div>

              <div className="hidden sm:flex flex-col border-l border-slate-200 pl-3">
                <span className="text-xs font-bold text-[#004A8F] uppercase leading-tight">
                  9th US–India Conference
                </span>
                <span className="text-[10px] text-slate-500">
                  Oct 8, 2026 • Silicon Valley Campus
                </span>
              </div>
            </a>
          </div>

          {/* Right Action: Direct 1-Click Add to Calendar Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              id="header-add-to-calendar-btn"
              href="https://event-calendar-aima.vercel.app/9th-US-India-Conference-2026.ics"
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg bg-[#004A8F] hover:bg-[#003669] text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
              title="Single-click download of calendar event (.ICS)"
            >
              <Calendar className="w-3.5 h-3.5 text-[#FFD100]" />
              <span>Add to Calendar</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

