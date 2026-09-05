import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Copy,
  Check,
  Code,
  Download,
  Sparkles
} from 'lucide-react';
import { EVENT_DETAILS, calculateTimeRemaining } from '../utils/timezone';
import {
  getGoogleCalendarUrl,
  getOutlookLiveUrl,
  getOffice365Url
} from '../utils/calendar';

export const EventWidget: React.FC = () => {
  const [icsCopied, setIcsCopied] = useState(false);
  const [embedCopied, setEmbedCopied] = useState(false);
  const [showEmbedCode, setShowEmbedCode] = useState(false);
  const [countdown, setCountdown] = useState(calculateTimeRemaining(EVENT_DETAILS.startUTC));

  const icsDownloadUrl = 'https://event-calendar-aima.vercel.app/9th-US-India-Conference-2026.ics';
  const currentUrl = typeof window !== 'undefined' ? window.location.href.split('?')[0] : 'https://event-calendar-aima.vercel.app';
  const embedCodeSnippet = `<iframe src="${currentUrl}?embed=true" width="100%" height="280" style="border:none;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,0.08);" title="9th US-India Conference Calendar Widget"></iframe>`;

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(calculateTimeRemaining(EVENT_DETAILS.startUTC));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyIcs = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(icsDownloadUrl);
      setIcsCopied(true);
      setTimeout(() => setIcsCopied(false), 2200);
    }
  };

  const handleCopyEmbed = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(embedCodeSnippet);
      setEmbedCopied(true);
      setTimeout(() => setEmbedCopied(false), 2200);
    }
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${EVENT_DETAILS.venueName}, ${EVENT_DETAILS.venueAddress}`
  )}`;

  return (
    <div className="w-full max-w-4xl mx-auto" id="calendar-widget-container">
      {/* Horizontal Widget Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-lg overflow-hidden">
        {/* Top Header Strip */}
        <div className="bg-[#002A5C] text-white px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between border-b border-[#001f44]">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="h-5 sm:h-6 px-2 bg-[#004A8F] text-[10px] sm:text-[11px] font-extrabold rounded flex items-center tracking-wider text-white">
              AIMA
            </span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="h-5 sm:h-6 px-2 bg-[#FFD100] text-[#002A5C] text-[10px] sm:text-[11px] font-extrabold rounded flex items-center tracking-wider">
              UC SANTA CRUZ
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] text-blue-200 font-mono">
            <span className="hidden sm:inline text-slate-300">Countdown:</span>
            <span className="font-bold text-white bg-white/10 px-2 py-0.5 rounded">
              {countdown.days}d {countdown.hours}h {countdown.minutes}m
            </span>
          </div>
        </div>

        {/* Horizontal Body Layout */}
        <div className="p-4 sm:p-6 lg:p-7 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 sm:gap-6">
          {/* Left Column: Event Details */}
          <div className="flex-1 min-w-0 flex items-start gap-3.5 sm:gap-4">
            {/* Calendar Sheet Date Badge */}
            <div className="shrink-0 flex flex-col items-center justify-center w-14 h-16 sm:w-16 sm:h-18 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
              <div className="w-full bg-[#004A8F] text-white text-[9px] sm:text-[10px] font-bold text-center py-0.5 tracking-wider uppercase">
                OCT
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 leading-none pt-1">
                08
              </div>
              <div className="text-[9px] font-semibold text-slate-500 uppercase pb-0.5">
                2026
              </div>
            </div>

            {/* Event Name & Logistics */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[10px] font-bold tracking-wider uppercase text-[#004A8F] bg-blue-50 px-2 py-0.5 rounded">
                  Silicon Valley Summit
                </span>
              </div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-slate-900 leading-tight">
                9th US–India Conference
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-[#004A8F] mt-0.5">
                US–India: Shaping the Next Global Turn
              </p>

              {/* Date, Time & Venue */}
              <div className="mt-2.5 space-y-1 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#004A8F] shrink-0" />
                  <span className="font-semibold text-slate-800">
                    Thu, Oct 8, 2026 • 2:30 PM – 8:45 PM PDT
                  </span>
                  <span className="text-[11px] text-slate-500 hidden sm:inline">
                    (Fri, Oct 9 IST)
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#004A8F] shrink-0" />
                  <span className="truncate">
                    UC Santa Cruz Silicon Valley, Santa Clara, CA
                  </span>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#004A8F] font-bold hover:underline shrink-0 inline-flex items-center gap-0.5 text-[11px] ml-1"
                  >
                    <span>Map</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Exactly the 4 Direct Calendar Buttons */}
          <div className="shrink-0 w-full md:w-auto md:min-w-[280px] lg:min-w-[320px] flex flex-col justify-center">
            {/* Small 'Add to Calendar' label above buttons */}
            <div className="flex items-center gap-1.5 mb-2 text-xs font-bold text-slate-700">
              <Calendar className="w-3.5 h-3.5 text-[#004A8F]" />
              <span>Add to calendar</span>
            </div>

            {/* 4 Calendar Buttons Grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              {/* 1. Apple Calendar / .ICS */}
              <a
                id="cal-btn-apple"
                href={icsDownloadUrl}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#004A8F] hover:bg-[#003669] text-white font-bold text-xs shadow-xs hover:shadow transition-all cursor-pointer"
                title="Download .ICS file for Apple Calendar (Mac/iPhone), Outlook & iCal"
              >
                <Download className="w-3.5 h-3.5 text-[#FFD100] shrink-0" />
                <span className="truncate">Apple / .ICS</span>
              </a>

              {/* 2. Google Calendar */}
              <a
                id="cal-btn-google"
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-200 shadow-2xs hover:border-slate-300 transition-all cursor-pointer"
                title="Add event directly to Google Calendar"
              >
                <div className="w-3.5 h-3.5 bg-red-500 text-white rounded-xs flex items-center justify-center text-[9px] font-black shrink-0">
                  G
                </div>
                <span className="truncate">Google</span>
              </a>

              {/* 3. Outlook Web */}
              <a
                id="cal-btn-outlook"
                href={getOutlookLiveUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-200 shadow-2xs hover:border-slate-300 transition-all cursor-pointer"
                title="Add event directly to Outlook.com / Live Calendar"
              >
                <div className="w-3.5 h-3.5 bg-blue-600 text-white rounded-xs flex items-center justify-center text-[9px] font-black shrink-0">
                  O
                </div>
                <span className="truncate">Outlook</span>
              </a>

              {/* 4. Office 365 */}
              <a
                id="cal-btn-office365"
                href={getOffice365Url()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-200 shadow-2xs hover:border-slate-300 transition-all cursor-pointer"
                title="Add event directly to Microsoft 365 Calendar"
              >
                <div className="w-3.5 h-3.5 bg-orange-600 text-white rounded-xs flex items-center justify-center text-[9px] font-black shrink-0">
                  M
                </div>
                <span className="truncate">Office 365</span>
              </a>
            </div>

            {/* Quick Footer Links Under the 4 Buttons */}
            <div className="flex items-center justify-between gap-2 mt-2.5 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
              <button
                type="button"
                onClick={handleCopyIcs}
                className="hover:text-[#004A8F] font-semibold inline-flex items-center gap-1 cursor-pointer transition-colors"
                title="Copy direct .ICS URL"
              >
                {icsCopied ? (
                  <Check className="w-3 h-3 text-emerald-600" />
                ) : (
                  <Copy className="w-3 h-3 text-slate-400" />
                )}
                <span>{icsCopied ? 'Link Copied!' : 'Copy .ICS Link'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowEmbedCode(!showEmbedCode)}
                className="hover:text-[#004A8F] font-semibold inline-flex items-center gap-1 cursor-pointer transition-colors"
                title="Get embed code"
              >
                <Code className="w-3 h-3 text-slate-400" />
                <span>Embed</span>
              </button>

              <a
                href="https://www.aima.in/events/9th-us-india-conference"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#004A8F] font-semibold inline-flex items-center gap-0.5"
              >
                <span>AIMA</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Collapsible Embed Code Drawer (only opens if clicked) */}
        {showEmbedCode && (
          <div className="px-4 pb-4 sm:px-6 sm:pb-5">
            <div className="p-3 bg-slate-900 text-slate-100 rounded-xl space-y-2 text-xs">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-mono text-slate-300">
                  Embed code (compact horizontal iframe):
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmbed}
                  className="px-2 py-1 bg-white/20 hover:bg-white/30 text-white rounded font-bold text-[10px] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {embedCopied ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  <span>{embedCopied ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>
              <pre className="p-2 bg-slate-950 rounded text-[10px] font-mono overflow-x-auto text-blue-300 select-all whitespace-pre-wrap break-all">
                {embedCodeSnippet}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
