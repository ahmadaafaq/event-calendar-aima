import React, { useState } from 'react';
import { Calendar, Globe, Menu, X, ChevronDown, Check } from 'lucide-react';
import { TimezoneMode } from '../types/conference';

interface HeaderProps {
  activeTimezone: TimezoneMode;
  onChangeTimezone: (mode: TimezoneMode) => void;
  userTimezone: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTimezone,
  onChangeTimezone,
  userTimezone,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tzDropdownOpen, setTzDropdownOpen] = useState(false);

  const timezoneLabels: Record<TimezoneMode, string> = {
    US_PDT: 'US Pacific (PDT)',
    INDIA_IST: 'India (IST)',
    USER_LOCAL: `My Time (${userTimezone.split('/')[1]?.replace(/_/g, ' ') || 'Local'})`,
    DUAL: 'Dual (PDT & IST)',
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-xs" id="top-header">
      {/* Single Clean Navigation Bar */}
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

          {/* Right Action Controls: Timezone Switcher & Direct 1-Click Calendar Link */}
          <div className="hidden md:flex items-center gap-3">
            {/* Timezone Selector Dropdown */}
            <div className="relative">
              <button
                id="timezone-select-button"
                onClick={() => setTzDropdownOpen(!tzDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors bg-white shadow-2xs cursor-pointer"
                title="Change displayed timezone for event timing"
              >
                <Globe className="w-3.5 h-3.5 text-[#004A8F]" />
                <span>{timezoneLabels[activeTimezone]}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {tzDropdownOpen && (
                <div className="absolute right-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs">
                  <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Select Event Timezone
                  </div>
                  {(['US_PDT', 'INDIA_IST', 'USER_LOCAL', 'DUAL'] as TimezoneMode[]).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => {
                        onChangeTimezone(mode);
                        setTzDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-blue-50/50 cursor-pointer ${
                        activeTimezone === mode ? 'bg-blue-50 text-[#004A8F] font-bold' : 'text-slate-700'
                      }`}
                    >
                      <span>{timezoneLabels[mode]}</span>
                      {activeTimezone === mode && <Check className="w-3.5 h-3.5 text-[#004A8F]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Direct 1-Click Add to Calendar Button */}
            <a
              id="header-add-to-calendar-btn"
              href="https://event-calendar-aima.vercel.app/9th-US-India-Conference-2026.ics"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#004A8F] hover:bg-[#003669] text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
              title="Single-click download of calendar event (.ICS)"
            >
              <Calendar className="w-3.5 h-3.5 text-[#FFD100]" />
              <span>Add to Calendar</span>
            </a>
          </div>

          {/* Mobile Direct Add to Calendar & Menu */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="https://event-calendar-aima.vercel.app/9th-US-India-Conference-2026.ics"
              className="px-3 py-1.5 rounded-lg bg-[#004A8F] text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs"
              title="Single-click download .ICS"
            >
              <Calendar className="w-3.5 h-3.5 text-[#FFD100]" />
              <span>Add to Calendar</span>
            </a>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Timezone Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2 shadow-lg">
          <div className="text-xs font-semibold text-slate-500 uppercase px-1">Display Timezone</div>
          <div className="grid grid-cols-2 gap-2">
            {(['US_PDT', 'INDIA_IST', 'USER_LOCAL', 'DUAL'] as TimezoneMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  onChangeTimezone(mode);
                  setMobileMenuOpen(false);
                }}
                className={`px-2.5 py-1.5 text-xs rounded border text-left cursor-pointer ${
                  activeTimezone === mode
                    ? 'bg-[#004A8F] text-white font-bold border-[#004A8F]'
                    : 'bg-white text-slate-700 border-slate-300'
                }`}
              >
                {timezoneLabels[mode]}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
