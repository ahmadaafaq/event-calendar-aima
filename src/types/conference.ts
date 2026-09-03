export type TimezoneMode = 'US_PDT' | 'INDIA_IST' | 'USER_LOCAL' | 'DUAL';

export interface Speaker {
  id: string;
  name: string;
  role: string;
  organization: string;
  image: string;
  bio: string;
  topic?: string;
  country: 'India' | 'US' | 'Global';
}

export interface AgendaSession {
  id: string;
  title: string;
  description: string;
  // Pacific Daylight Time (UTC-7) on October 8, 2026
  startPDT: string; // e.g. "14:30"
  endPDT: string;   // e.g. "15:30"
  // UTC ISO string for calendar syncing
  startUTC: string; // e.g. "2026-10-08T21:30:00Z"
  endUTC: string;   // e.g. "2026-10-08T22:30:00Z"
  speakers: string[]; // speaker ids or names
  category: 'Keynote' | 'Plenary' | 'Networking' | 'Inaugural' | 'Valedictory';
  room: string;
}

export interface AttendeeRegistration {
  id: string;
  fullName: string;
  email: string;
  organization: string;
  designation: string;
  phone: string;
  country: string;
  timezone: string;
  attendanceType: 'in-person' | 'virtual';
  registeredAt: string;
}
