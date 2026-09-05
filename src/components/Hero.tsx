import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Globe, Shield, Sparkles, Check, ExternalLink, Download, Copy, FileText } from 'lucide-react';
import { EVENT_DETAILS, formatTimeInZone, calculateTimeRemaining } from '../utils/timezone';
import { TimezoneMode } from '../types/conference';
import { getGoogleCalendarUrl, getOutlookLiveUrl, getOffice365Url, getYahooCalendarUrl } from '../utils/calendar';

interface HeroProps {
  activeTimezone: TimezoneMode;
  userTimezone: string;
}

export const Hero: React.FC<HeroProps> = ({
  activeTimezone,
  userTimezone,
}) => {
  const [countdown, setCountdown] = useState(calculateTimeRemaining(EVENT_DETAILS.startUTC));
  const [icsCopied, setIcsCopied] = useState(false);
  const icsDownloadUrl = 'https://event-calendar-aima.vercel.app/9th-US-India-Conference-2026.ics';

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(calculateTimeRemaining(EVENT_DETAILS.startUTC));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyIcsUrl = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(icsDownloadUrl);
      setIcsCopied(true);
      setTimeout(() => setIcsCopied(false), 2500);
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
    <section className="relative overflow-hidden bg-[#F9FBFF] text-[#1E293B] pt-8 pb-14 lg:pt-12 lg:pb-16">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#004A8F_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Centered Header Block */}
        <div className="flex flex-col items-center justify-center text-center space-y-4 mb-8">
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
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight font-display">
            9th US–INDIA CONFERENCE
          </h1>

          {/* Italic Theme Subtitle */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-slate-600 max-w-3xl leading-relaxed italic">
            “US–India: Shaping the Next Global Turn”
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Convening senior corporate leadership, university chancellors, venture capital partners, and senior dignitaries to advance strategic bilateral collaboration across Artificial Intelligence, semiconductors, clean tech, and resilient global supply chains.
          </p>

          {/* Single-Click Instant Calendar Options Bar */}
          <div className="w-full max-w-3xl pt-2">
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#004A8F]" />
                Single-Click: Add Event to Your Calendar
              </span>

              {/* Direct 1-Click Action Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full">
                {/* 1. Primary Direct .ICS / Apple Calendar */}
                <a
                  id="direct-add-ics-btn"
                  href={icsDownloadUrl}
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-[#004A8F] hover:bg-[#003669] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
                  title="Single-click download .ICS for Apple Calendar, Outlook Desktop, and mobile"
                >
                  <Download className="w-4 h-4 text-[#FFD100]" />
                  <span>.ICS / Apple</span>
                </a>

                {/* 2. Direct Google Calendar */}
                <a
                  id="direct-google-cal-btn"
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors cursor-pointer"
                  title="Single-click: open and save in Google Calendar"
                >
                  <div className="w-4 h-4 bg-red-500 text-white rounded-xs flex items-center justify-center text-[10px] font-bold">G</div>
                  <span>Google</span>
                </a>

                {/* 3. Direct Outlook Web */}
                <a
                  id="direct-outlook-btn"
                  href={getOutlookLiveUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors cursor-pointer"
                  title="Single-click: open and save in Outlook.com / Live"
                >
                  <div className="w-4 h-4 bg-blue-600 text-white rounded-xs flex items-center justify-center text-[10px] font-bold">O</div>
                  <span>Outlook</span>
                </a>

                {/* 4. Direct Office 365 */}
                <a
                  id="direct-office365-btn"
                  href={getOffice365Url()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors cursor-pointer"
                  title="Single-click: open and save in Microsoft Office 365"
                >
                  <div className="w-4 h-4 bg-orange-600 text-white rounded-xs flex items-center justify-center text-[10px] font-bold">M</div>
                  <span>Office 365</span>
                </a>
              </div>

              {/* Quick Link Tools */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-3 pt-3 border-t border-slate-100 w-full text-xs text-slate-500">
                <button
                  type="button"
                  onClick={handleCopyIcsUrl}
                  className="hover:text-[#004A8F] font-medium flex items-center gap-1.5 cursor-pointer"
                  title="Copy .ICS calendar file URL"
                >
                  {icsCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{icsCopied ? 'URL Copied!' : 'Copy .ICS Link'}</span>
                </button>

                <span className="text-slate-300">•</span>

                <a
                  href={getYahooCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#004A8F] font-medium"
                >
                  Yahoo Calendar
                </a>

                <span className="text-slate-300">•</span>

                <a
                  href="https://www.aima.in/events/9th-us-india-conference"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#004A8F] font-medium flex items-center gap-1"
                >
                  <span>Official AIMA Site</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Dual Cards Grid: Event Details & Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-5xl mx-auto pt-2">
          {/* Card 1: Date & Venue */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="w-full">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2.5 bg-blue-100 rounded-xl text-[#004A8F]">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="text-lg font-bold text-slate-900">Date &amp; Venue</span>
              </div>

              <p className="text-lg font-bold text-slate-900">Thursday, 8th October 2026</p>
              <p className="text-sm font-semibold text-[#004A8F] mt-0.5">
                2:30 PM PDT onwards • Registration from 2:00 PM
              </p>

              <div className="text-slate-600 mt-3.5 text-sm leading-relaxed">
                <strong className="text-slate-900 block font-bold">UC Santa Cruz, Silicon Valley Campus</strong>
                <span>3175 Bowers Ave, Santa Clara, CA 95054</span>
              </div>

              {/* In conjunction notice */}
              <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                <span className="font-bold text-[#002A5C] block mb-0.5">AIMA CEOs Delegation (Oct 5–9, 2026):</span>
                Held in conjunction with the annual 5-day senior executive delegation to Silicon Valley technology companies and research centers.
              </div>
            </div>

            {/* Interactive Campus Map Link */}
            <div className="mt-5 w-full p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <MapPin className="w-4 h-4 text-[#004A8F] shrink-0" />
                <span>Santa Clara, CA (Silicon Valley)</span>
              </div>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#004A8F] hover:text-[#003669] shrink-0"
              >
                <span>Directions &amp; Map</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Card 2: Global Schedule & Auto-Conversion */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-amber-100 rounded-xl text-amber-700">
                    <Clock className="w-5 h-5" />
                  </div>
                  <span className="text-lg font-bold text-slate-900">Event Timings</span>
                </div>
                <div className="text-[10px] bg-slate-900 text-white px-2 py-0.5 rounded font-bold tracking-wider uppercase">
                  DUAL TIMEZONES
                </div>
              </div>

              <div className="space-y-3.5">
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

                {/* Direct Hosted URL Box */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-slate-800 text-[11px]">
                      <FileText className="w-3.5 h-3.5 text-[#004A8F]" />
                      <span>Direct .ICS Link</span>
                    </div>
                    <a
                      href={icsDownloadUrl}
                      className="text-[10px] font-bold text-[#004A8F] hover:underline flex items-center gap-0.5"
                    >
                      <Download className="w-3 h-3" />
                      <span>Direct Download</span>
                    </a>
                  </div>

                  <div className="flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 font-mono text-[10px] text-slate-600">
                    <span className="truncate flex-1">{icsDownloadUrl}</span>
                    <button
                      type="button"
                      onClick={handleCopyIcsUrl}
                      className="text-[#004A8F] hover:text-[#002A5C] font-semibold flex items-center gap-1 shrink-0 cursor-pointer text-[11px]"
                      title="Copy URL"
                    >
                      {icsCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{icsCopied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Countdown to Conference Inaugural */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-2 text-center">
                Countdown to Event Start:
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
