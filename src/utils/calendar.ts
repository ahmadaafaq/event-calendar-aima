/**
 * Calendar integration utilities for 9th US-India Conference
 * Supports Google Calendar, Outlook Web, Office 365, Yahoo, and Apple Calendar (.ics download)
 */

import { EVENT_DETAILS } from './timezone';

export interface CalendarEventPayload {
  title: string;
  description: string;
  location: string;
  startUTC: string; // ISO string e.g. "2026-10-08T21:30:00Z"
  endUTC: string;   // ISO string e.g. "2026-10-09T03:45:00Z"
  uid?: string;
}

/**
 * Format ISO string to compact UTC format: YYYYMMDDTHHMMSSZ
 */
function toCompactUTC(isoString: string): string {
  const d = new Date(isoString);
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

/**
 * Build Google Calendar URL
 */
export function getGoogleCalendarUrl(payload: CalendarEventPayload = {
  title: EVENT_DETAILS.title + ' — ' + EVENT_DETAILS.theme,
  description: `${EVENT_DETAILS.theme}\n\n${EVENT_DETAILS.coHosts}\n\n${EVENT_DETAILS.description}\n\nConference Info: https://www.aima.in/events/9th-us-india-conference\n\nSanta Clara Time: 2:30 PM PDT (Oct 8)\nIndia Time: 3:00 AM IST (Oct 9)`,
  location: `${EVENT_DETAILS.venueName}, ${EVENT_DETAILS.venueAddress}`,
  startUTC: EVENT_DETAILS.startUTC,
  endUTC: EVENT_DETAILS.endUTC,
}): string {
  const start = toCompactUTC(payload.startUTC);
  const end = toCompactUTC(payload.endUTC);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: payload.title,
    dates: `${start}/${end}`,
    details: payload.description,
    location: payload.location,
    sprop: 'website:www.aima.in',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Build Outlook.com / Live Calendar URL
 */
export function getOutlookLiveUrl(payload: CalendarEventPayload = {
  title: EVENT_DETAILS.title + ' — ' + EVENT_DETAILS.theme,
  description: `${EVENT_DETAILS.theme}\n\n${EVENT_DETAILS.coHosts}\n\n${EVENT_DETAILS.description}`,
  location: `${EVENT_DETAILS.venueName}, ${EVENT_DETAILS.venueAddress}`,
  startUTC: EVENT_DETAILS.startUTC,
  endUTC: EVENT_DETAILS.endUTC,
}): string {
  const params = new URLSearchParams({
    rru: 'addevent',
    subject: payload.title,
    startdt: new Date(payload.startUTC).toISOString(),
    enddt: new Date(payload.endUTC).toISOString(),
    body: payload.description,
    location: payload.location,
  });

  return `https://outlook.live.com/calendar/0/action/compose?${params.toString()}`;
}

/**
 * Build Office 365 Calendar URL
 */
export function getOffice365Url(payload: CalendarEventPayload = {
  title: EVENT_DETAILS.title + ' — ' + EVENT_DETAILS.theme,
  description: `${EVENT_DETAILS.theme}\n\n${EVENT_DETAILS.coHosts}\n\n${EVENT_DETAILS.description}`,
  location: `${EVENT_DETAILS.venueName}, ${EVENT_DETAILS.venueAddress}`,
  startUTC: EVENT_DETAILS.startUTC,
  endUTC: EVENT_DETAILS.endUTC,
}): string {
  const params = new URLSearchParams({
    rru: 'addevent',
    subject: payload.title,
    startdt: new Date(payload.startUTC).toISOString(),
    enddt: new Date(payload.endUTC).toISOString(),
    body: payload.description,
    location: payload.location,
  });

  return `https://outlook.office.com/calendar/0/action/compose?${params.toString()}`;
}

/**
 * Build Yahoo Calendar URL
 */
export function getYahooCalendarUrl(payload: CalendarEventPayload = {
  title: EVENT_DETAILS.title,
  description: EVENT_DETAILS.description,
  location: `${EVENT_DETAILS.venueName}, ${EVENT_DETAILS.venueAddress}`,
  startUTC: EVENT_DETAILS.startUTC,
  endUTC: EVENT_DETAILS.endUTC,
}): string {
  const start = toCompactUTC(payload.startUTC);
  const end = toCompactUTC(payload.endUTC);

  const params = new URLSearchParams({
    v: '60',
    title: payload.title,
    st: start,
    et: end,
    desc: payload.description,
    in_loc: payload.location,
  });

  return `https://calendar.yahoo.com/?${params.toString()}`;
}

/**
 * Generate RFC 5545 iCalendar (.ics) content for Apple Calendar & Outlook Desktop
 */
export function generateIcsFile(payload: CalendarEventPayload = {
  title: `${EVENT_DETAILS.title} | ${EVENT_DETAILS.theme}`,
  description: `${EVENT_DETAILS.theme}\\n\\n${EVENT_DETAILS.coHosts}\\n\\nVenue: ${EVENT_DETAILS.venueName}, ${EVENT_DETAILS.venueAddress}\\n\\nNote: Timings are converted automatically by your calendar client.\\nSilicon Valley (PDT): Thu Oct 8, 2:30 PM\\nIndia Standard Time (IST): Fri Oct 9, 3:00 AM\\n\\nMore information: https://www.aima.in/events/9th-us-india-conference`,
  location: `${EVENT_DETAILS.venueName}, ${EVENT_DETAILS.venueAddress}`,
  startUTC: EVENT_DETAILS.startUTC,
  endUTC: EVENT_DETAILS.endUTC,
  uid: '9th-us-india-conf-2026@aima.in',
}): string {
  const start = toCompactUTC(payload.startUTC);
  const end = toCompactUTC(payload.endUTC);
  const stamp = toCompactUTC(new Date().toISOString());
  const uid = payload.uid || `event-${Date.now()}@aima.in`;

  // Escape special chars for ICS format
  const sanitizedTitle = payload.title.replace(/\n/g, ' ');
  const sanitizedLocation = payload.location.replace(/\n/g, ', ');
  const sanitizedDesc = payload.description.replace(/\r\n|\r|\n/g, '\\n');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//All India Management Association//9th US-India Conference//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:9th US-India Conference (AIMA & UCSC)',
    'X-WR-TIMEZONE:UTC',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${sanitizedTitle}`,
    `DESCRIPTION:${sanitizedDesc}`,
    `LOCATION:${sanitizedLocation}`,
    'ORGANIZER;CN="AIMA Secretariat":MAILTO:usindiaconference@aima.in',
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    // 24 Hour Reminder
    'BEGIN:VALARM',
    'TRIGGER:-PT24H',
    'ACTION:DISPLAY',
    'DESCRIPTION:9th US-India Conference starts in 24 hours',
    'END:VALARM',
    // 2 Hour Reminder
    'BEGIN:VALARM',
    'TRIGGER:-PT2H',
    'ACTION:DISPLAY',
    'DESCRIPTION:9th US-India Conference begins soon',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

/**
 * Trigger immediate download of .ics file for Apple Calendar or Outlook
 */
export function downloadIcsFile(payload?: CalendarEventPayload, fileName: string = '9th-US-India-Conference-AIMA.ics'): void {
  const icsData = generateIcsFile(payload);
  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
