/**
 * Timezone utility helpers for 9th US-India Conference
 * Event Base Time: Santa Clara, California (US Pacific Daylight Time / PDT, UTC-7)
 * Target International Zone: Indian Standard Time (IST, UTC+5:30)
 */

export const EVENT_DETAILS = {
  title: '9th US-INDIA CONFERENCE',
  theme: 'US–India: Shaping the Next Global Turn',
  coHosts: 'Co-hosted by All India Management Association (AIMA) and UC Santa Cruz',
  venueName: 'UC Santa Cruz, Silicon Valley Campus',
  venueAddress: '3175 Bowers Ave, Santa Clara, CA 95054, USA',
  startUTC: '2026-10-08T21:30:00Z', // 2:30 PM PDT (UTC-7)
  endUTC: '2026-10-09T03:45:00Z',   // 8:45 PM PDT (UTC-7)
  description: `The 9th US-India Conference themed 'US–India: Shaping the Next Global Turn' gathers senior policymakers, industry captains, tech leaders, venture capitalists, and scholars. Co-hosted by All India Management Association (AIMA) and University of California, Santa Cruz (UCSC), and supported by the Consulate General of India, San Francisco. Coincides with AIMA's annual CEOs Delegation to Silicon Valley.`,
};

/**
 * Detect user's browser timezone
 */
export function getBrowserTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata';
  } catch {
    return 'Asia/Kolkata';
  }
}

/**
 * Check if a given timezone or country string corresponds to India
 */
export function isIndianLocation(tzOrCountry: string): boolean {
  if (!tzOrCountry) return false;
  const lower = tzOrCountry.toLowerCase();
  return (
    lower.includes('kolkata') ||
    lower.includes('calcutta') ||
    lower.includes('india') ||
    lower === 'in' ||
    lower === 'ist'
  );
}

/**
 * Format a UTC ISO date string into specific timezones
 */
export function formatTimeInZone(
  utcIso: string,
  timeZone: string,
  options: {
    includeDate?: boolean;
    includeTzName?: boolean;
    timeOnly?: boolean;
  } = {}
): string {
  try {
    const date = new Date(utcIso);
    if (isNaN(date.getTime())) return '';

    if (options.timeOnly) {
      return new Intl.DateTimeFormat('en-US', {
        timeZone,
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(date);
    }

    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      weekday: options.includeDate ? 'short' : undefined,
      month: options.includeDate ? 'short' : undefined,
      day: options.includeDate ? 'numeric' : undefined,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZoneName: options.includeTzName ? 'short' : undefined,
    });

    return formatter.format(date);
  } catch (err) {
    console.error('Error formatting timezone:', err);
    return utcIso;
  }
}

/**
 * Specific helper for US Pacific Time (PDT)
 */
export function formatInPDT(utcIso: string, includeDate: boolean = true): string {
  return formatTimeInZone(utcIso, 'America/Los_Angeles', {
    includeDate,
    includeTzName: true,
  });
}

/**
 * Specific helper for Indian Standard Time (IST)
 */
export function formatInIST(utcIso: string, includeDate: boolean = true): string {
  return formatTimeInZone(utcIso, 'Asia/Kolkata', {
    includeDate,
    includeTzName: true,
  });
}

/**
 * Helper to get a human-readable timezone label
 */
export function getTimezoneLabel(tz: string): string {
  if (tz === 'America/Los_Angeles') return 'US Pacific Time (PDT)';
  if (tz === 'Asia/Kolkata') return 'Indian Standard Time (IST)';
  if (tz === 'America/New_York') return 'US Eastern Time (EDT)';
  if (tz === 'Europe/London') return 'British Summer Time (BST)';
  return tz.replace(/_/g, ' ');
}

/**
 * Calculate countdown components to event start
 */
export function calculateTimeRemaining(targetUtc: string = EVENT_DETAILS.startUTC) {
  const target = new Date(targetUtc).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isPast: false };
}
