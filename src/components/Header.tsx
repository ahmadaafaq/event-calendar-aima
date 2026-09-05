import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Globe, MapPin, Menu, X, ExternalLink, ChevronDown, Check, Download } from 'lucide-react';
import { TimezoneMode } from '../types/conference';
import { formatTimeInZone } from '../utils/timezone';

interface HeaderProps {
  onOpenCalendarModal: () => void;
  activeTimezone: TimezoneMode;
  onChangeTimezone: (mode: TimezoneMode) => void;
  userTimezone: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCalendarModal,
  activeTimezone,
  onChangeTimezone,
  userTimezone,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tzDropdownOpen, setTzDropdownOpen] = useState(false);
  const [now, setNow] = useState(new Date());

  // Live clocks for Santa Clara (PDT) and New Delhi (IST)
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const pdtTime = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(now);

  const istTime = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(now);

  const timezoneLabels: Record<TimezoneMode, string> = {
    US_PDT: 'US Pacific (PDT)',
    INDIA_IST: 'India (IST)',
    USER_LOCAL: `My Time (${userTimezone.split('/')[1]?.replace(/_/g, ' ') || 'Local'})`,
    DUAL: 'Dual (PDT & IST)',
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-xs bg-white border-b border-slate-200" id="top-header">
      {/* Top Official Bar: UC Santa Cruz & AIMA Deep Navy Bar with Live World Clocks */}
      <div className="bg-[#002A5C] text-white text-xs border-b border-[#001f44]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap justify-between items-center gap-2">
          {/* Left: Event Flagship Info */}
          <div className="flex items-center gap-3 text-slate-300">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#004A8F] text-white tracking-wide border border-blue-400/30">
              FLAGSHIP BILATERAL SUMMIT
            </span>
            <span className="hidden sm:inline font-medium">
              9th US-India Conference • Silicon Valley, CA
            </span>
            <span className="inline-flex items-center text-[#FFD100] font-semibold">
              <MapPin className="w-3.5 h-3.5 mr-1" />
              UC Santa Cruz Silicon Valley Campus
            </span>
          </div>

          {/* Right: Live Clocks for California & India + Quick Contacts */}
          <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-slate-200 bg-white/10 px-2.5 py-0.5 rounded border border-white/15">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-300">CA:</span>
              <span className="font-bold text-white">{pdtTime} PDT</span>
            </div>

            <div className="flex items-center gap-1.5 text-slate-200 bg-white/10 px-2.5 py-0.5 rounded border border-white/15">
              <span className="w-2 h-2 rounded-full bg-[#FFD100] animate-pulse"></span>
              <span className="text-slate-300">IN:</span>
              <span className="font-bold text-white">{istTime} IST</span>
            </div>

            <a
              href="mailto:usindiaconference@aima.in"
              className="hidden lg:inline-flex items-center text-slate-300 hover:text-white transition-colors"
            >
              usindiaconference@aima.in
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logos: AIMA & UC Santa Cruz in the exact Professional Polish style */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a href="#" className="flex items-center space-x-3 sm:space-x-4 group">
              {/* AIMA Box */}
              <div className="h-10 px-3 bg-[#004A8F] flex items-center justify-center text-white text-[11px] font-extrabold tracking-wider text-center rounded-sm shadow-xs group-hover:bg-[#003669] transition-colors">
                <span>AIMA</span>
              </div>

              {/* Vertical divider */}
              <div className="h-8 w-px bg-slate-300"></div>

              {/* UC Santa Cruz Box */}
              <div className="h-10 px-3 bg-[#FFD100] flex items-center justify-center text-[#002A5C] text-[11px] font-extrabold tracking-wider text-center rounded-sm shadow-xs">
                <span>UC SANTA CRUZ</span>
              </div>

              <div className="hidden sm:flex flex-col border-l border-slate-200 pl-3">
                <span className="text-xs font-bold text-[#004A8F] uppercase leading-tight">
                  9th US–India Conference
                </span>
                <span className="text-[10px] text-slate-500">
                  Silicon Valley • Oct 8, 2026
                </span>
              </div>
            </a>
          </div>

          {/* Right Action Controls: Timezone Switcher & Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Timezone Selector Dropdown */}
            <div className="relative">
              <button
                id="timezone-select-button"
                onClick={() => setTzDropdownOpen(!tzDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors bg-white shadow-xs cursor-pointer"
                title="Change displayed timezone for agenda & events"
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
                  <div className="px-3 py-1.5 bg-slate-50 border-t border-slate-100 text-[10px] text-slate-500">
                    Auto-converts between Santa Clara &amp; India Standard Time
                  </div>
                </div>
              )}
            </div>

            {/* Add to Calendar Direct .ICS Button */}
            <a
              id="header-calendar-button"
              href="https://event-calendar-aima.vercel.app/9th-US-India-Conference-2026.ics"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#004A8F] hover:bg-[#003669] text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#FFD100]" />
              <span>Add to Calendar</span>
            </a>

            {/* Other Calendar Options (Google/Outlook/Apple) */}
            <button
              id="header-options-button"
              onClick={onOpenCalendarModal}
              className="inline-flex items-center gap-1 px-2.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#002A5C] font-semibold text-xs transition-all border border-slate-200 shadow-2xs cursor-pointer"
              title="View all calendar options (Google, Outlook, Apple)"
            >
              <span>More</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="https://event-calendar-aima.vercel.app/9th-US-India-Conference-2026.ics"
              className="p-2 rounded-md bg-[#004A8F] text-white text-xs font-semibold flex items-center gap-1"
              title="Add to Calendar (.ICS)"
            >
              <Calendar className="w-4 h-4 text-[#FFD100]" />
            </a>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-500 uppercase px-1">Select Timezone Display</div>
            <div className="grid grid-cols-2 gap-2">
              {(['US_PDT', 'INDIA_IST', 'USER_LOCAL', 'DUAL'] as TimezoneMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => {
                    onChangeTimezone(mode);
                  }}
                  className={`px-2.5 py-1.5 text-xs rounded border text-left ${
                    activeTimezone === mode
                      ? 'bg-[#004A8F] text-white font-bold border-[#004A8F]'
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  {timezoneLabels[mode]}
                </button>
              ))}
            </div>

            <div className="pt-2 space-y-2">
              <a
                href="https://event-calendar-aima.vercel.app/9th-US-India-Conference-2026.ics"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 rounded-lg bg-[#004A8F] hover:bg-[#003669] text-white font-bold text-sm text-center flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#FFD100]" />
                Add to Calendar
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCalendarModal();
                }}
                className="w-full py-2.5 px-4 rounded-lg bg-slate-100 border border-slate-300 text-slate-800 font-semibold text-sm text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                All Calendar Options (Google / Outlook)
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
