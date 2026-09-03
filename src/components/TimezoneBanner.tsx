import React from 'react';
import { Globe, Clock, ArrowRightLeft, Calendar, Sparkles, Check, Info } from 'lucide-react';
import { TimezoneMode } from '../types/conference';
import { isIndianLocation, formatTimeInZone } from '../utils/timezone';

interface TimezoneBannerProps {
  activeTimezone: TimezoneMode;
  onChangeTimezone: (mode: TimezoneMode) => void;
  userTimezone: string;
  onOpenCalendarModal: () => void;
}

export const TimezoneBanner: React.FC<TimezoneBannerProps> = ({
  activeTimezone,
  onChangeTimezone,
  userTimezone,
  onOpenCalendarModal,
}) => {
  const isIndia = isIndianLocation(userTimezone);

  const scheduleMilestones = [
    { label: 'Check-in & Coffee', pdt: '2:00 PM PDT', ist: '2:30 AM IST' },
    { label: 'Conference Inaugural', pdt: '2:30 PM PDT', ist: '3:00 AM IST', isKey: true },
    { label: 'Keynote Address', pdt: '3:00 PM PDT', ist: '3:30 AM IST' },
    { label: 'AI & Semiconductors', pdt: '3:45 PM PDT', ist: '4:15 AM IST' },
    { label: 'Clean Tech & Supply Chains', pdt: '5:15 PM PDT', ist: '5:45 AM IST' },
    { label: 'Venture & Startups', pdt: '6:15 PM PDT', ist: '6:45 AM IST' },
    { label: 'Valedictory & Reception', pdt: '7:00 PM PDT', ist: '7:30 AM IST' },
  ];

  return (
    <section className="bg-[#F9FBFF] border-b border-slate-200 py-6" id="timezone-converter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm">
          {/* Header & Mode Switcher */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-5 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#004A8F] uppercase tracking-wider mb-1">
                <ArrowRightLeft className="w-4 h-4 text-[#004A8F]" />
                <span>International Dual Timezone Converter</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Simultaneous California (PDT) &amp; India (IST) Timings
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Automatically aligned across Silicon Valley (UTC-7) and New Delhi (UTC+5:30)
              </p>
            </div>

            {/* Timezone Switcher Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 mr-1 hidden sm:inline">
                View Schedule As:
              </span>
              <button
                type="button"
                onClick={() => onChangeTimezone('US_PDT')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                  activeTimezone === 'US_PDT'
                    ? 'bg-[#004A8F] text-white border-[#004A8F] shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                🇺🇸 Venue Time (PDT)
              </button>

              <button
                type="button"
                onClick={() => onChangeTimezone('INDIA_IST')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                  activeTimezone === 'INDIA_IST'
                    ? 'bg-[#FFD100] text-[#002A5C] border-yellow-400 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                🇮🇳 India Time (IST)
              </button>

              <button
                type="button"
                onClick={() => onChangeTimezone('DUAL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                  activeTimezone === 'DUAL'
                    ? 'bg-[#002A5C] text-white border-[#002A5C] shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                🔄 Dual Side-by-Side
              </button>

              <button
                type="button"
                onClick={() => onChangeTimezone('USER_LOCAL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                  activeTimezone === 'USER_LOCAL'
                    ? 'bg-slate-800 text-white border-slate-900 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                🌐 Auto-Detected ({userTimezone.split('/')[1]?.replace(/_/g, ' ') || 'Local'})
              </button>
            </div>
          </div>

          {/* Attendee Location Notification Card */}
          <div className="my-4">
            {isIndia ? (
              <div className="p-3.5 bg-amber-50/90 border border-amber-200 rounded-xl text-xs text-amber-950 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-base">🇮🇳</span>
                  <span>
                    <strong>Attendee Location Detected: India</strong> — The conference starts in India on{' '}
                    <strong>Friday, 9th October 2026 at 3:00 AM IST</strong> (equivalent to 2:30 PM PDT on Oct 8 in Santa Clara).
                  </span>
                </div>
                <button
                  onClick={onOpenCalendarModal}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#004A8F] hover:bg-[#003669] text-white font-bold text-xs cursor-pointer shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#FFD100]" />
                  <span>Sync 3:00 AM IST to Calendar</span>
                </button>
              </div>
            ) : (
              <div className="p-3.5 bg-blue-50/80 border border-blue-100 rounded-xl text-xs text-blue-950 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#004A8F]" />
                  <span>
                    <strong>International Coordination:</strong> Venue starts at <strong>2:30 PM PDT (Thursday, Oct 8)</strong> and is co-streamed for Indian delegations at <strong>3:00 AM IST (Friday, Oct 9)</strong>.
                  </span>
                </div>
                <button
                  onClick={onOpenCalendarModal}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#004A8F] hover:bg-[#003669] text-white font-bold text-xs cursor-pointer shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#FFD100]" />
                  <span>Add with Auto Timezone</span>
                </button>
              </div>
            )}
          </div>

          {/* Quick Side-by-Side Milestone Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-xs">
            {scheduleMilestones.map((item, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  item.isKey
                    ? 'bg-blue-50/70 border-[#004A8F]/30 ring-1 ring-[#004A8F]/30'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="font-bold text-slate-800 text-[11px] truncate mb-1" title={item.label}>
                  {item.label}
                </div>
                <div className="font-mono text-slate-900 font-bold text-[11px]">
                  {item.pdt}
                </div>
                <div className="font-mono text-[#004A8F] font-semibold text-[10px] mt-0.5">
                  {item.ist}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
