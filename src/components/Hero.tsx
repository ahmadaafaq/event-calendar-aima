import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Globe, Shield, Sparkles, Share2, Check, ExternalLink } from 'lucide-react';
import { EVENT_DETAILS, formatInPDT, formatInIST, formatTimeInZone, calculateTimeRemaining } from '../utils/timezone';
import { TimezoneMode } from '../types/conference';
import { getGoogleCalendarUrl, getOutlookLiveUrl, downloadIcsFile } from '../utils/calendar';

interface HeroProps {
  onOpenCalendarModal: () => void;
  activeTimezone: TimezoneMode;
  userTimezone: string;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenCalendarModal,
  activeTimezone,
  userTimezone,
}) => {
  const [countdown, setCountdown] = useState(calculateTimeRemaining(EVENT_DETAILS.startUTC));
  const [shareCopied, setShareCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(calculateTimeRemaining(EVENT_DETAILS.startUTC));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  const userLocalFormatted = formatTimeInZone(EVENT_DETAILS.startUTC, userTimezone, {
    includeDate: true,
    includeTzName: true,
  });

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${EVENT_DETAILS.venueName}, ${EVENT_DETAILS.venueAddress}`
  )}`;

  return (
    <section className="relative overflow-hidden bg-[#F9FBFF] text-[#1E293B] pt-10 pb-16 lg:pt-14 lg:pb-20 border-b border-slate-200">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#004A8F_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Centered Header Block in Professional Polish theme */}
        <div className="flex flex-col items-center justify-center text-center space-y-4 mb-10">
          {/* Institutional Co-Host Pill Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs font-semibold text-slate-600 mb-1">
            <div className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-2xs">
              <span className="text-[#004A8F] font-bold">AIMA</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-700">All India Management Association</span>
            </div>

            <span className="text-slate-400 font-bold">&amp;</span>

            <div className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-2xs">
              <span className="text-[#002A5C] font-bold">UC Santa Cruz</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-700">Silicon Valley Campus</span>
            </div>

            <div className="hidden md:flex items-center gap-1.5 text-slate-500 text-xs pl-1">
              <Shield className="w-3.5 h-3.5 text-[#004A8F]" />
              <span>Supported by Consulate General of India, San Francisco</span>
            </div>
          </div>

          {/* Theme Pill Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#004A8F] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border border-blue-100 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#004A8F]" />
            <span>Silicon Valley Global Summit 2026</span>
          </div>

          {/* Large Clean Display Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight font-display">
            9th US–INDIA CONFERENCE
          </h1>

          {/* Italic Theme Subtitle */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-slate-600 max-w-3xl leading-relaxed italic">
            “US–India: Shaping the Next Global Turn”
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Convening senior corporate leadership, university chancellors, venture capital partners, and senior dignitaries to advance strategic bilateral collaboration across Artificial Intelligence, semiconductors, clean tech, and resilient global supply chains.
          </p>

          {/* Primary Action Button Row */}
          <div className="flex flex-wrap gap-3 pt-3 justify-center items-center">
            <button
              id="hero-calendar-btn"
              onClick={onOpenCalendarModal}
              className="px-6 py-3 rounded-xl bg-[#004A8F] hover:bg-[#003669] text-white font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#FFD100]" />
              <span>Add to Calendar</span>
            </button>

            <button
              onClick={handleShare}
              className="px-4 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm border border-slate-200 transition-all shadow-xs cursor-pointer flex items-center gap-2"
              title="Copy conference link"
            >
              {shareCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-slate-500" />}
              <span>{shareCopied ? 'Link Copied' : 'Share Conference'}</span>
            </button>
          </div>
        </div>

        {/* Dual Cards Grid in Exact Professional Polish Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl mx-auto pt-2">
          {/* Card 1: Date & Venue */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xl flex flex-col items-start text-left justify-between">
            <div className="w-full">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2.5 bg-blue-100 rounded-xl text-[#004A8F]">
                  <Calendar className="w-6 h-6" />
                </div>
                <span className="text-xl font-bold text-slate-900">Date &amp; Venue</span>
              </div>

              <p className="text-lg font-bold text-slate-900">Thursday, 8th October 2026</p>
              <p className="text-sm font-semibold text-[#004A8F] mt-0.5">
                2:30 PM PDT onwards • Reception &amp; Check-in from 2:00 PM
              </p>

              <p className="text-slate-600 mt-3 text-sm leading-relaxed">
                <strong className="text-slate-900 block">UC Santa Cruz, Silicon Valley Campus</strong>
                3175 Bowers Ave, Santa Clara, CA 95054
              </p>

              {/* In conjunction notice */}
              <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                <span className="font-bold text-[#002A5C] block mb-0.5">AIMA CEOs Delegation (Oct 5–9, 2026):</span>
                Organized alongside the annual 5-day executive mission to Silicon Valley technology leaders and venture firms.
              </div>
            </div>

            {/* Interactive Campus Map Preview Box */}
            <div className="mt-6 w-full p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 text-xs text-slate-600">
                <MapPin className="w-4 h-4 text-[#004A8F] shrink-0" />
                <span>Santa Clara Heart of Silicon Valley (Near SJC Airport)</span>
              </div>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#004A8F] hover:text-[#003669] shrink-0"
              >
                <span>Open in Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Card 2: Global Schedule & Auto-Conversion Active */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-orange-100 rounded-xl text-orange-600">
                    <Clock className="w-6 h-6" />
                  </div>
                  <span className="text-xl font-bold text-slate-900">Global Schedule</span>
                </div>
                <div className="text-[10px] bg-slate-900 text-white px-2.5 py-1 rounded-md font-bold tracking-wider uppercase">
                  AUTO-CONVERSION ACTIVE
                </div>
              </div>

              <div className="space-y-4">
                {/* Silicon Valley vs New Delhi Bar */}
                <div className="flex justify-between items-center p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                      Silicon Valley (PDT)
                    </span>
                    <span className="text-xl font-black text-slate-900 font-mono">
                      02:30 PM
                    </span>
                    <span className="text-[10px] text-slate-400">Thu, Oct 8, 2026</span>
                  </div>

                  <div className="h-10 w-px bg-slate-200"></div>

                  <div className="flex flex-col items-end">
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                      New Delhi (IST)
                    </span>
                    <span className="text-xl font-black text-[#004A8F] font-mono">
                      03:00 AM <span className="text-xs font-normal text-slate-400">(+1 Day)</span>
                    </span>
                    <span className="text-[10px] text-slate-400">Fri, Oct 9, 2026</span>
                  </div>
                </div>

                {userTimezone !== 'America/Los_Angeles' && userTimezone !== 'Asia/Kolkata' && (
                  <div className="bg-blue-50/80 p-2.5 rounded-lg border border-blue-100 text-xs flex items-center justify-between text-blue-900">
                    <div className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-[#004A8F]" />
                      <span>Your Local Time: <strong>{userLocalFormatted}</strong></span>
                    </div>
                  </div>
                )}

                <p className="text-[11px] text-center text-slate-500 font-medium">
                  Add to your calendar for automated alerts in your local timezone:
                </p>

                {/* 3 Quick Calendar Buttons in Professional Polish Design */}
                <div className="grid grid-cols-3 gap-2">
                  <a
                    href={getGoogleCalendarUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs group cursor-pointer"
                  >
                    <div className="w-6 h-6 bg-red-500 rounded-sm mb-1.5 flex items-center justify-center text-white text-[10px] font-bold shadow-2xs group-hover:scale-105 transition-transform">
                      G
                    </div>
                    <span className="text-[11px] font-bold text-slate-700">Google</span>
                  </a>

                  <a
                    href={getOutlookLiveUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs group cursor-pointer"
                  >
                    <div className="w-6 h-6 bg-blue-600 rounded-sm mb-1.5 flex items-center justify-center text-white text-[10px] font-bold shadow-2xs group-hover:scale-105 transition-transform">
                      O
                    </div>
                    <span className="text-[11px] font-bold text-slate-700">Outlook</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => downloadIcsFile()}
                    className="flex flex-col items-center justify-center p-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs group cursor-pointer"
                  >
                    <div className="w-6 h-6 bg-slate-800 rounded-sm mb-1.5 flex items-center justify-center text-white text-[10px] font-bold shadow-2xs group-hover:scale-105 transition-transform">
                      
                    </div>
                    <span className="text-[11px] font-bold text-slate-700">Apple</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Countdown to Conference Inaugural */}
            <div className="mt-5 pt-3 border-t border-slate-100">
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-2 text-center">
                Countdown to Conference Inaugural:
              </div>
              <div className="grid grid-cols-4 gap-2 text-center font-mono">
                <div className="bg-slate-50 py-1.5 px-1 rounded-lg border border-slate-200">
                  <div className="text-base sm:text-lg font-black text-[#004A8F]">{countdown.days}</div>
                  <div className="text-[9px] text-slate-400 uppercase font-sans">Days</div>
                </div>
                <div className="bg-slate-50 py-1.5 px-1 rounded-lg border border-slate-200">
                  <div className="text-base sm:text-lg font-black text-slate-800">{countdown.hours}</div>
                  <div className="text-[9px] text-slate-400 uppercase font-sans">Hours</div>
                </div>
                <div className="bg-slate-50 py-1.5 px-1 rounded-lg border border-slate-200">
                  <div className="text-base sm:text-lg font-black text-slate-800">{countdown.minutes}</div>
                  <div className="text-[9px] text-slate-400 uppercase font-sans">Mins</div>
                </div>
                <div className="bg-slate-50 py-1.5 px-1 rounded-lg border border-slate-200">
                  <div className="text-base sm:text-lg font-black text-amber-600">{countdown.seconds}</div>
                  <div className="text-[9px] text-slate-400 uppercase font-sans">Secs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
