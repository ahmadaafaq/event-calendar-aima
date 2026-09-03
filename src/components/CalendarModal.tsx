import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Check, Download, ExternalLink, Globe, AlertCircle, Sparkles } from 'lucide-react';
import {
  getGoogleCalendarUrl,
  getOutlookLiveUrl,
  getOffice365Url,
  getYahooCalendarUrl,
  downloadIcsFile,
  CalendarEventPayload,
} from '../utils/calendar';
import { EVENT_DETAILS, formatInPDT, formatInIST, formatTimeInZone } from '../utils/timezone';
import { AGENDA_SESSIONS } from '../data/conferenceData';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSessionId?: string | null;
  userTimezone: string;
}

export const CalendarModal: React.FC<CalendarModalProps> = ({
  isOpen,
  onClose,
  selectedSessionId = null,
  userTimezone,
}) => {
  const [selectedItem, setSelectedItem] = useState<'full' | string>(selectedSessionId || 'full');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Determine what event payload to add
  let eventPayload: CalendarEventPayload;
  let eventHeading = EVENT_DETAILS.title;
  let eventSubheading = EVENT_DETAILS.theme;
  let startUtc = EVENT_DETAILS.startUTC;
  let endUtc = EVENT_DETAILS.endUTC;

  if (selectedItem !== 'full') {
    const session = AGENDA_SESSIONS.find((s) => s.id === selectedItem);
    if (session) {
      eventHeading = session.title;
      eventSubheading = `9th US-India Conference • ${session.category} • ${session.room}`;
      startUtc = session.startUTC;
      endUtc = session.endUTC;
      eventPayload = {
        title: `${session.title} | 9th US-India Conference`,
        description: `${session.description}\n\nVenue: ${session.room}, ${EVENT_DETAILS.venueName}\nPart of 9th US-India Conference (AIMA & UC Santa Cruz)\nInfo: https://www.aima.in/events/9th-us-india-conference`,
        location: `${session.room}, ${EVENT_DETAILS.venueName}, ${EVENT_DETAILS.venueAddress}`,
        startUTC: session.startUTC,
        endUTC: session.endUTC,
        uid: `session-${session.id}@aima.in`,
      };
    } else {
      eventPayload = {
        title: `${EVENT_DETAILS.title}: ${EVENT_DETAILS.theme}`,
        description: `${EVENT_DETAILS.theme}\n\n${EVENT_DETAILS.coHosts}\n\n${EVENT_DETAILS.description}\n\nInfo: https://www.aima.in/events/9th-us-india-conference`,
        location: `${EVENT_DETAILS.venueName}, ${EVENT_DETAILS.venueAddress}`,
        startUTC: EVENT_DETAILS.startUTC,
        endUTC: EVENT_DETAILS.endUTC,
      };
    }
  } else {
    eventPayload = {
      title: `${EVENT_DETAILS.title}: ${EVENT_DETAILS.theme}`,
      description: `${EVENT_DETAILS.theme}\n\n${EVENT_DETAILS.coHosts}\n\nVenue: ${EVENT_DETAILS.venueName}, ${EVENT_DETAILS.venueAddress}\n\nSilicon Valley (PDT): Thu Oct 8, 2026, 2:30 PM onwards\nIndia Standard Time (IST): Fri Oct 9, 2026, 3:00 AM onwards\n\nOfficial Page: https://www.aima.in/events/9th-us-india-conference`,
      location: `${EVENT_DETAILS.venueName}, ${EVENT_DETAILS.venueAddress}`,
      startUTC: EVENT_DETAILS.startUTC,
      endUTC: EVENT_DETAILS.endUTC,
    };
  }

  // Time representations in PDT, IST, and User's Local Timezone
  const pdtStartFormatted = formatInPDT(startUtc, true);
  const istStartFormatted = formatInIST(startUtc, true);
  const userLocalFormatted = formatTimeInZone(startUtc, userTimezone, {
    includeDate: true,
    includeTzName: true,
  });

  const handleAppleDownload = () => {
    downloadIcsFile(eventPayload, `${eventHeading.replace(/[^a-zA-Z0-9]/g, '-').slice(0, 30)}.ics`);
  };

  const handleCopyDetails = () => {
    const text = `${eventHeading}\nTheme: ${eventSubheading}\nUS Pacific Time (PDT): ${pdtStartFormatted}\nIndia Standard Time (IST): ${istStartFormatted}\nVenue: ${EVENT_DETAILS.venueName}, ${EVENT_DETAILS.venueAddress}\nLink: https://www.aima.in/events/9th-us-india-conference`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#002A5C] via-[#003c7a] to-[#002A5C] px-6 py-5 text-white flex justify-between items-start">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#FFD100] text-[#002A5C] flex items-center justify-center shadow-md shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider font-bold bg-white/15 text-[#FFD100] px-2.5 py-0.5 rounded-full border border-white/20">
                  Universal Calendar Sync
                </span>
                <span className="text-[11px] text-slate-200 font-mono">UTC-7 / IST / Local</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mt-1 leading-snug">
                Add 9th US-India Conference to Calendar
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5 space-y-5 text-slate-800">
          {/* Scope Selector: Entire Conference vs Specific Session */}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Select What to Add:
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedItem('full')}
                className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                  selectedItem === 'full'
                    ? 'bg-[#004A8F] text-white border-[#004A8F] shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                ★ Full Conference (2:30 PM PDT Onwards)
              </button>
              {AGENDA_SESSIONS.filter((s) => s.category === 'Keynote' || s.category === 'Plenary').map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedItem(s.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all truncate max-w-xs cursor-pointer ${
                    selectedItem === s.id
                      ? 'bg-[#FFD100] text-[#002A5C] font-bold border-yellow-400 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                  title={s.title}
                >
                  {s.title.split(':')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Dual Timezone Preview Card */}
          <div className="bg-[#F9FBFF] border border-slate-200 rounded-2xl p-5">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <span className="text-[11px] font-bold text-[#004A8F] uppercase tracking-wide">
                  Event Selected
                </span>
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {eventHeading}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">{eventSubheading}</p>
              </div>
              <button
                onClick={handleCopyDetails}
                className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs shrink-0 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : null}
                <span>{copied ? 'Copied' : 'Copy details'}</span>
              </button>
            </div>

            {/* Time Comparison Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-slate-200">
              {/* US Pacific Time Badge */}
              <div className="bg-white p-3.5 rounded-xl border border-blue-100">
                <div className="flex items-center gap-1.5 text-xs text-[#004A8F] font-bold mb-1">
                  <span>🇺🇸</span>
                  <span>Santa Clara, CA (Venue - PDT)</span>
                </div>
                <div className="text-sm font-bold text-slate-900 font-mono">
                  {pdtStartFormatted}
                </div>
                <div className="text-[11px] text-slate-500">Pacific Daylight Time (UTC-7)</div>
              </div>

              {/* India Standard Time Badge */}
              <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200">
                <div className="flex items-center gap-1.5 text-xs text-amber-900 font-bold mb-1">
                  <span>🇮🇳</span>
                  <span>New Delhi, India (IST)</span>
                </div>
                <div className="text-sm font-bold text-amber-950 font-mono">
                  {istStartFormatted}
                </div>
                <div className="text-[11px] text-amber-800">
                  Indian Standard Time (UTC+5:30) • Next Day
                </div>
              </div>
            </div>

            {/* Local Time Announcement if different */}
            {userTimezone !== 'America/Los_Angeles' && userTimezone !== 'Asia/Kolkata' && (
              <div className="mt-2.5 px-3 py-2 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#004A8F]" />
                  <span>
                    Your Local Time: <strong>{userLocalFormatted}</strong> ({userTimezone})
                  </span>
                </div>
              </div>
            )}

            <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-[#004A8F] shrink-0" />
              <span>
                {EVENT_DETAILS.venueName}, 3175 Bowers Ave, Santa Clara, CA 95054
              </span>
            </div>
          </div>

          {/* Timezone conversion notice */}
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-blue-50/80 border border-blue-100 text-xs text-blue-950">
            <Sparkles className="w-4 h-4 text-[#004A8F] shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold text-[#004A8F]">Automatic Timezone Sync:</strong> When you click any provider below, the event is saved using universal UTC (<code>21:30 UTC</code>). Your calendar app will <em>automatically convert</em> and place the event in your device's exact local time (whether California, India, Europe, or anywhere worldwide).
            </div>
          </div>

          {/* Calendar Service Buttons */}
          <div>
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
              Choose Your Calendar Service:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Google Calendar */}
              <a
                id="add-google-calendar-btn"
                href={getGoogleCalendarUrl(eventPayload)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-[#004A8F] hover:bg-blue-50/30 transition-all group bg-white shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold text-sm border border-red-200">
                    G
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 group-hover:text-[#004A8F]">
                      Google Calendar
                    </div>
                    <div className="text-[11px] text-slate-500">Add to Google Web / Android / iOS</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#004A8F]" />
              </a>

              {/* Microsoft Outlook 365 / Live */}
              <a
                id="add-outlook-calendar-btn"
                href={getOutlookLiveUrl(eventPayload)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-sky-500 hover:bg-sky-50/40 transition-all group bg-white shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-sm border border-sky-200">
                    O
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 group-hover:text-sky-600">
                      Microsoft Outlook
                    </div>
                    <div className="text-[11px] text-slate-500">Outlook.com &amp; Office 365</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-sky-600" />
              </a>

              {/* Apple Calendar / iCal Download */}
              <button
                id="add-apple-calendar-btn"
                type="button"
                onClick={handleAppleDownload}
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-slate-800 hover:bg-slate-50 transition-all group bg-white shadow-2xs text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-sm border border-slate-200">
                    🍎
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 group-hover:text-slate-950 flex items-center gap-1.5">
                      <span>Apple Calendar (iCal)</span>
                      <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded font-mono">.ics</span>
                    </div>
                    <div className="text-[11px] text-slate-500">Mac, iPhone, iPad, Thunderbird</div>
                  </div>
                </div>
                <Download className="w-4 h-4 text-slate-400 group-hover:text-slate-900" />
              </button>

              {/* Microsoft Office 365 Enterprise */}
              <a
                id="add-office365-calendar-btn"
                href={getOffice365Url(eventPayload)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-[#004A8F] hover:bg-blue-50/40 transition-all group bg-white shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm border border-indigo-200">
                    M
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 group-hover:text-[#004A8F]">
                      Work / School 365
                    </div>
                    <div className="text-[11px] text-slate-500">Corporate &amp; University accounts</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#004A8F]" />
              </a>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap justify-between items-center gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Pre-configured with 24h &amp; 2h notification alarms</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 transition-colors cursor-pointer shadow-2xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
