import React from 'react';
import { Check, Clock, MapPin } from 'lucide-react';
import {
  getGoogleCalendarUrl,
  getOutlookLiveUrl,
  getOffice365Url,
  downloadIcsFile,
} from '../utils/calendar';

export const EventWidget: React.FC = () => {
  const handleAppleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If browser supports direct .ics download via script fallback
    try {
      downloadIcsFile();
    } catch {
      // Anchor href takes over if script fails
    }
  };

  return (
    <div className="w-full max-w-lg sm:max-w-xl mx-auto py-4 sm:py-8 px-4" id="registration-confirmation-container">
      {/* Top Teal Checkmark Badge */}
      <div className="flex justify-center">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1b736b] flex items-center justify-center shadow-xs">
          <Check className="w-6 h-6 sm:w-7 sm:h-7 text-white stroke-[2.8]" />
        </div>
      </div>

      {/* Primary Headings */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0c2340] text-center mt-3 sm:mt-4 tracking-tight">
        You&apos;re registered!
      </h1>
      <p className="text-slate-600 text-xs sm:text-sm sm:text-base text-center mt-2 leading-relaxed">
        Thanks for signing up for the 9th US-India Conference.<br />
        We&apos;ve saved your spot — details are below.
      </p>

      {/* Main Confirmation Card */}
      <div className="mt-6 sm:mt-7 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6 lg:p-7">
        {/* Card Header: OCT 08 Badge + Conference Titles */}
        <div className="flex items-start gap-3.5 sm:gap-4">
          {/* Navy Date Badge */}
          <div className="shrink-0 w-14 h-16 sm:w-16 sm:h-18 bg-[#0c2340] text-white rounded-xl flex flex-col items-center justify-center shadow-2xs">
            <div className="text-[10px] sm:text-[11px] font-bold text-slate-300 uppercase tracking-wider">
              OCT
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white leading-none mt-0.5">
              08
            </div>
          </div>

          {/* Titles & Tag */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-[10px] sm:text-[11px] font-extrabold tracking-wider uppercase text-[#004A8F]">
                SILICON VALLEY SUMMIT
              </span>
              <span className="bg-[#FFD100] text-[#0c2340] text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider shrink-0">
                WITH UC SANTA CRUZ
              </span>
            </div>

            <h2 className="text-base sm:text-lg lg:text-xl font-black text-[#0c2340] leading-snug mt-1">
              9th US-India Conference
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              US–India: Shaping the Next Global Turn
            </p>
          </div>
        </div>

        {/* Subtle Horizontal Divider */}
        <div className="border-b border-slate-100 my-4" />

        {/* Date, Time & Venue */}
        <div className="space-y-2 text-xs sm:text-sm text-slate-700">
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-slate-600 shrink-0" />
            <span className="font-medium text-slate-800">
              Thu, Oct 8, 2026 · 2:30 – 8:45 PM PDT
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-slate-600 shrink-0" />
            <span className="font-medium text-slate-800">
              UC Santa Cruz Silicon Valley Campus
            </span>
          </div>
        </div>

        {/* Add to Calendar Section */}
        <div className="mt-5 sm:mt-6">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
            ADD TO CALENDAR
          </div>

          {/* 4 Clean Outline Action Buttons */}
          <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
            {/* Apple */}
            <a
              id="cal-btn-apple"
              href="/9th-US-India-Conference-2026.ics"
              download="9th-US-India-Conference-2026.ics"
              onClick={handleAppleClick}
              className="flex items-center justify-center py-2 sm:py-2.5 px-1.5 sm:px-2 rounded-xl bg-white hover:bg-slate-50 text-[#0c2340] font-bold text-xs sm:text-sm border-[1.5px] border-[#0c2340] transition-colors text-center cursor-pointer shadow-2xs"
              title="Download calendar file for Apple Calendar (iPhone/Mac), iCal & Outlook"
            >
              Apple
            </a>

            {/* Google */}
            <a
              id="cal-btn-google"
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center py-2 sm:py-2.5 px-1.5 sm:px-2 rounded-xl bg-white hover:bg-slate-50 text-[#0c2340] font-bold text-xs sm:text-sm border-[1.5px] border-[#0c2340] transition-colors text-center cursor-pointer shadow-2xs"
              title="Add directly to Google Calendar (2:30 PM – 8:45 PM PDT)"
            >
              Google
            </a>

            {/* Outlook */}
            <a
              id="cal-btn-outlook"
              href={getOutlookLiveUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center py-2 sm:py-2.5 px-1.5 sm:px-2 rounded-xl bg-white hover:bg-slate-50 text-[#0c2340] font-bold text-xs sm:text-sm border-[1.5px] border-[#0c2340] transition-colors text-center cursor-pointer shadow-2xs"
              title="Add directly to Outlook.com / Live Calendar (2:30 PM – 8:45 PM)"
            >
              Outlook
            </a>

            {/* Office 365 */}
            <a
              id="cal-btn-office365"
              href={getOffice365Url()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center py-2 sm:py-2.5 px-1.5 sm:px-2 rounded-xl bg-white hover:bg-slate-50 text-[#0c2340] font-bold text-xs sm:text-sm border-[1.5px] border-[#0c2340] transition-colors text-center cursor-pointer shadow-2xs"
              title="Add directly to Microsoft 365 Work/School Calendar (2:30 PM – 8:45 PM)"
            >
              Office 365
            </a>
          </div>

          {/* Subtext under buttons */}
          <p className="text-[11px] text-slate-400 text-center mt-3">
            Downloads a calendar file, or adds it directly for Google/Outlook/Office 365
          </p>
        </div>
      </div>

      {/* Footer Details Below the Card */}
      <div className="mt-5 sm:mt-6 text-center space-y-3.5">
        <p className="text-xs sm:text-sm text-slate-500">
          A calendar invite has also been emailed to you.
        </p>

        <div className="w-64 sm:w-80 border-b border-slate-200 mx-auto" />

        <p className="text-xs sm:text-sm text-slate-600">
          Questions about the event? Contact{' '}
          <a
            href="mailto:suchetag@aima.in"
            className="text-[#004A8F] font-bold hover:underline"
          >
            suchetag@aima.in
          </a>
        </p>

        <div>
          <a
            href="https://www.aima.in/events/9th-us-india-conference"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#004A8F] font-semibold text-xs sm:text-sm hover:underline"
          >
            Back to AIMA events
          </a>
        </div>
      </div>
    </div>
  );
};
