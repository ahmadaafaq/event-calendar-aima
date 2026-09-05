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
  Share2,
  Sparkles
} from 'lucide-react';
import { EVENT_DETAILS, calculateTimeRemaining } from '../utils/timezone';
import {
  getGoogleCalendarUrl,
  getOutlookLiveUrl,
  getOffice365Url,
  getYahooCalendarUrl
} from '../utils/calendar';

export const EventWidget: React.FC = () => {
  const [icsCopied, setIcsCopied] = useState(false);
  const [embedCopied, setEmbedCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showEmbedCode, setShowEmbedCode] = useState(false);
  const [countdown, setCountdown] = useState(calculateTimeRemaining(EVENT_DETAILS.startUTC));

  const icsDownloadUrl = 'https://event-calendar-aima.vercel.app/9th-US-India-Conference-2026.ics';
  const currentUrl = typeof window !== 'undefined' ? window.location.href.split('?')[0] : 'https://event-calendar-aima.vercel.app';
  const embedCodeSnippet = `<iframe src="${currentUrl}?embed=true" width="100%" height="600" style="border:none;max-width:540px;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,0.08);" title="9th US-India Conference Calendar Widget"></iframe>`;

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

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2200);
    }
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${EVENT_DETAILS.venueName}, ${EVENT_DETAILS.venueAddress}`
  )}`;

  return (
    <div className="w-full max-w-lg mx-auto" id="calendar-widget-container">
      {/* Widget Main Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden transition-all">
        {/* Widget Top Header Banner */}
        <div className="bg-[#002A5C] text-white px-5 py-3 sm:px-6 sm:py-3.5 flex items-center justify-between border-b border-[#001f44]">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="h-6 px-2 bg-[#004A8F] text-[10px] font-extrabold rounded flex items-center tracking-wider text-white">
              AIMA
            </span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="h-6 px-2 bg-[#FFD100] text-[#002A5C] text-[10px] font-extrabold rounded flex items-center tracking-wider">
              UC SANTA CRUZ
            </span>
          </div>
          <span className="text-[10px] sm:text-[11px] font-semibold text-blue-200 bg-white/10 px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#FFD100]" />
            Official Event
          </span>
        </div>

        {/* Widget Body */}
        <div className="p-5 sm:p-7 space-y-5">
          {/* Event Header Block: Date Chip + Titles */}
          <div className="flex items-start gap-4">
            {/* Calendar Sheet Icon */}
            <div className="shrink-0 flex flex-col items-center justify-center w-14 h-16 sm:w-16 sm:h-18 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
              <div className="w-full bg-[#004A8F] text-white text-[10px] font-bold text-center py-0.5 tracking-wider uppercase">
                OCT
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 leading-none pt-1">
                08
              </div>
              <div className="text-[9px] font-semibold text-slate-500 uppercase pb-1">
                THU
              </div>
            </div>

            {/* Event Name & Subtitle */}
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                9th US–India Conference
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-[#004A8F] mt-0.5 leading-snug">
                US–India: Shaping the Next Global Turn
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Co-hosted by AIMA &amp; UC Santa Cruz Silicon Valley
              </p>
            </div>
          </div>

          {/* Time & Venue Information Box */}
          <div className="space-y-2.5 bg-slate-50/80 rounded-xl p-3.5 border border-slate-200/70 text-xs">
            {/* Time */}
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#004A8F] shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="font-bold text-slate-900">
                  Thursday, Oct 8, 2026 • 2:30 PM – 8:45 PM PDT
                </div>
                <div className="text-slate-500 text-[11px] mt-0.5">
                  India Time: Friday, Oct 9 • 3:00 AM – 9:15 AM IST
                </div>
              </div>
            </div>

            {/* Venue */}
            <div className="flex items-start gap-2.5 pt-2 border-t border-slate-200/60">
              <MapPin className="w-4 h-4 text-[#004A8F] shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="font-bold text-slate-900">
                  UC Santa Cruz Silicon Valley Campus
                </div>
                <div className="text-slate-500 text-[11px] flex items-center justify-between gap-2 mt-0.5">
                  <span>3175 Bowers Ave, Santa Clara, CA 95054</span>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#004A8F] font-semibold hover:underline inline-flex items-center gap-0.5 shrink-0"
                  >
                    <span>Map</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* PRIMARY CALL TO ACTION: Direct 1-Click .ICS Download Button */}
          <div className="space-y-2">
            <a
              id="widget-add-to-calendar-primary"
              href={icsDownloadUrl}
              className="w-full py-3.5 px-4 rounded-xl bg-[#004A8F] hover:bg-[#003669] text-white font-bold text-sm sm:text-base transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 cursor-pointer text-center"
              title="Single-click download .ICS (Apple Calendar, Outlook Desktop & Mobile)"
            >
              <Calendar className="w-5 h-5 text-[#FFD100]" />
              <span>Add to Calendar (.ICS)</span>
            </a>
            <p className="text-[11px] text-center text-slate-500">
              1-click download for Apple Calendar (iPhone/Mac), Outlook &amp; iCal
            </p>
          </div>

          {/* SECONDARY 1-CLICK WEB CALENDARS GRID */}
          <div className="space-y-2 pt-1">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">
              Or Add Directly to Your Web Calendar
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {/* Google Calendar */}
              <a
                id="widget-google-calendar-btn"
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-200 shadow-2xs hover:border-slate-300 transition-all cursor-pointer"
                title="Add to Google Calendar in 1 click"
              >
                <div className="w-3.5 h-3.5 bg-red-500 text-white rounded-xs flex items-center justify-center text-[9px] font-black shrink-0">
                  G
                </div>
                <span>Google</span>
              </a>

              {/* Outlook Web */}
              <a
                id="widget-outlook-btn"
                href={getOutlookLiveUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-200 shadow-2xs hover:border-slate-300 transition-all cursor-pointer"
                title="Add to Outlook.com in 1 click"
              >
                <div className="w-3.5 h-3.5 bg-blue-600 text-white rounded-xs flex items-center justify-center text-[9px] font-black shrink-0">
                  O
                </div>
                <span>Outlook</span>
              </a>

              {/* Office 365 */}
              <a
                id="widget-office365-btn"
                href={getOffice365Url()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-200 shadow-2xs hover:border-slate-300 transition-all cursor-pointer"
                title="Add to Microsoft 365 in 1 click"
              >
                <div className="w-3.5 h-3.5 bg-orange-600 text-white rounded-xs flex items-center justify-center text-[9px] font-black shrink-0">
                  M
                </div>
                <span>Office 365</span>
              </a>

              {/* Yahoo Calendar */}
              <a
                id="widget-yahoo-btn"
                href={getYahooCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-200 shadow-2xs hover:border-slate-300 transition-all cursor-pointer"
                title="Add to Yahoo Calendar in 1 click"
              >
                <div className="w-3.5 h-3.5 bg-purple-600 text-white rounded-xs flex items-center justify-center text-[9px] font-black shrink-0">
                  Y
                </div>
                <span>Yahoo</span>
              </a>
            </div>
          </div>

          {/* Direct File Link & Quick Tools */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
            {/* Copy .ICS Link */}
            <button
              type="button"
              onClick={handleCopyIcs}
              className="hover:text-[#004A8F] font-semibold inline-flex items-center gap-1 cursor-pointer transition-colors"
              title="Copy .ICS calendar link"
            >
              {icsCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-400" />}
              <span>{icsCopied ? 'Link Copied!' : 'Copy .ICS Link'}</span>
            </button>

            {/* Embed Widget Toggle */}
            <button
              type="button"
              onClick={() => setShowEmbedCode(!showEmbedCode)}
              className="hover:text-[#004A8F] font-semibold inline-flex items-center gap-1 cursor-pointer transition-colors"
              title="Embed this widget on your website"
            >
              <Code className="w-3 h-3 text-slate-400" />
              <span>Embed Widget</span>
            </button>

            {/* Official Website */}
            <a
              href="https://www.aima.in/events/9th-us-india-conference"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#004A8F] font-semibold inline-flex items-center gap-1"
            >
              <span>AIMA Page</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>

          {/* Embed Code Snippet Drawer */}
          {showEmbedCode && (
            <div className="p-3 bg-slate-900 text-slate-100 rounded-xl space-y-2 text-xs">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-mono text-slate-300">Embed this widget on any website:</span>
                <button
                  type="button"
                  onClick={handleCopyEmbed}
                  className="px-2 py-1 bg-white/20 hover:bg-white/30 text-white rounded font-bold text-[10px] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {embedCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{embedCopied ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>
              <pre className="p-2 bg-slate-950 rounded text-[10px] font-mono overflow-x-auto text-blue-300 select-all whitespace-pre-wrap break-all">
                {embedCodeSnippet}
              </pre>
            </div>
          )}

          {/* Countdown Footer Strip */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span className="text-slate-400 uppercase tracking-wider text-[10px]">Countdown:</span>
            <div className="font-bold text-slate-700">
              {countdown.days}d {countdown.hours}h {countdown.minutes}m {countdown.seconds}s
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
