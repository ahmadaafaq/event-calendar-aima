import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Calendar, MapPin, Globe, Sparkles, Download, Mail, ArrowRight, UserCheck } from 'lucide-react';
import { EVENT_DETAILS, formatInPDT, formatInIST, formatTimeInZone, isIndianLocation } from '../utils/timezone';
import { getGoogleCalendarUrl, getOutlookLiveUrl, downloadIcsFile } from '../utils/calendar';
import { AttendeeRegistration } from '../types/conference';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  userTimezone: string;
  onRegistered?: (attendee: AttendeeRegistration) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  userTimezone,
  onRegistered,
}) => {
  const initialCountry = isIndianLocation(userTimezone) ? 'India' : 'United States';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [designation, setDesignation] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState(initialCountry);
  const [selectedTimezone, setSelectedTimezone] = useState(userTimezone);
  const [attendanceType, setAttendanceType] = useState<'in-person' | 'virtual'>('in-person');
  const [submittedAttendee, setSubmittedAttendee] = useState<AttendeeRegistration | null>(null);

  // Check if current selection represents an Indian participant
  const isIndia = isIndianLocation(country) || isIndianLocation(selectedTimezone);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    const newAttendee: AttendeeRegistration = {
      id: `AIMA-US-${Math.floor(100000 + Math.random() * 900000)}`,
      fullName,
      email,
      organization: organization || 'Independent Delegate',
      designation: designation || 'Executive Delegate',
      phone: phone || '+1 (555) 000-0000',
      country,
      timezone: selectedTimezone,
      attendanceType,
      registeredAt: new Date().toISOString(),
    };

    setSubmittedAttendee(newAttendee);
    if (onRegistered) onRegistered(newAttendee);
  };

  const handleReset = () => {
    setSubmittedAttendee(null);
    setFullName('');
    setEmail('');
    setOrganization('');
    setDesignation('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-[#002A5C] px-6 py-5 text-white flex justify-between items-center border-b border-blue-900/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider bg-[#FFD100] text-[#002A5C] px-2.5 py-0.5 rounded-full">
                Pre-Registration / RSVP
              </span>
              <span className="text-xs text-slate-200">By Invitation / Limited Seating</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">
              9th US-India Conference Delegate Registration
            </h2>
            <p className="text-xs text-slate-200">
              Co-hosted by AIMA &amp; UC Santa Cruz • October 8, 2026
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto px-6 py-6 text-slate-800">
          {!submittedAttendee ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Context Notice */}
              <div className="p-3.5 bg-blue-50/60 border border-blue-100 rounded-xl text-xs text-slate-700 flex items-start gap-3">
                <Globe className="w-4 h-4 text-[#004A8F] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900">Automatic International Timezone Conversion:</span>{' '}
                  Select your country and timezone below. If you are registering from India, all schedule timings and calendar invitations will automatically be converted to Indian Standard Time (IST).
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Dr. Rajesh Sharma / Sarah Jenkins"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004A8F] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. r.sharma@enterprise.com"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004A8F] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Organization / Company
                  </label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Tata Steel / Stanford / Tech Corp"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004A8F] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Designation / Role
                  </label>
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="e.g. Vice President, Managing Director, Partner"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004A8F] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Location & Timezone Conversion Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Country / Residence *
                  </label>
                  <select
                    value={country}
                    onChange={(e) => {
                      const c = e.target.value;
                      setCountry(c);
                      if (c === 'India') {
                        setSelectedTimezone('Asia/Kolkata');
                      } else if (c === 'United States') {
                        setSelectedTimezone('America/Los_Angeles');
                      }
                    }}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004A8F]"
                  >
                    <option value="India">India (IST Timezone)</option>
                    <option value="United States">United States (US Timezones)</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Singapore">Singapore</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Other">Other Country</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Timezone for Schedule
                  </label>
                  <select
                    value={selectedTimezone}
                    onChange={(e) => setSelectedTimezone(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004A8F]"
                  >
                    <option value="Asia/Kolkata">Asia/Kolkata - India Standard Time (IST, UTC+5:30)</option>
                    <option value="America/Los_Angeles">America/Los_Angeles - US Pacific (PDT, UTC-7)</option>
                    <option value="America/New_York">America/New_York - US Eastern (EDT, UTC-4)</option>
                    <option value="America/Chicago">America/Chicago - US Central (CDT, UTC-5)</option>
                    <option value="Europe/London">Europe/London - British Time (BST, UTC+1)</option>
                    <option value="Asia/Singapore">Asia/Singapore - Singapore Time (SGT, UTC+8)</option>
                  </select>
                </div>
              </div>

              {/* Dynamic Auto-Conversion Banner */}
              {isIndia ? (
                <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-xl space-y-1.5 animate-in fade-in duration-300">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                    <span>🇮🇳</span>
                    <span>Attendee Booking from India (Automatic Timezone Conversion)</span>
                  </div>
                  <div className="text-sm font-bold text-amber-950">
                    Conference Start Time in IST: Friday, 9th October 2026 at 3:00 AM IST
                  </div>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    Converted automatically from <strong>2:30 PM PDT (Thursday, 8th October)</strong> at UC Santa Cruz Silicon Valley Campus. Adding this to your calendar will save it directly at <strong>3:00 AM IST</strong> on Friday morning.
                  </p>
                </div>
              ) : (
                <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 text-[#004A8F] font-bold text-xs">
                    <span>🇺🇸</span>
                    <span>Venue Time (Santa Clara, California):</span>
                  </div>
                  <div className="text-sm font-bold text-[#002A5C]">
                    Thursday, 8th October 2026 at 2:30 PM PDT onwards
                  </div>
                  <p className="text-[11px] text-blue-700">
                    (Equivalent to 3:00 AM IST on Friday, October 9 in India)
                  </p>
                </div>
              )}

              {/* Attendance Format & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Attendance Mode
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setAttendanceType('in-person')}
                      className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                        attendanceType === 'in-person'
                          ? 'bg-[#004A8F] text-white border-[#004A8F]'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      In-Person (Santa Clara)
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttendanceType('virtual')}
                      className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                        attendanceType === 'virtual'
                          ? 'bg-[#004A8F] text-white border-[#004A8F]'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      Virtual Stream
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={isIndia ? '+91 98765 43210' : '+1 (408) 555-0199'}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#004A8F]"
                  />
                </div>
              </div>

              {/* Form Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-[#004A8F] hover:bg-[#003669] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <CheckCircle className="w-4 h-4 text-[#FFD100]" />
                  <span>Confirm Registration &amp; Get Calendar Pass</span>
                </button>
                <div className="text-center text-[11px] text-slate-500 mt-2">
                  Official confirmation &amp; calendar invite will be issued immediately upon submission.
                </div>
              </div>
            </form>
          ) : (
            /* Registration Success & Pass Screen */
            <div className="space-y-5 animate-in zoom-in-95 duration-200">
              {/* Success Banner */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-emerald-950">
                    Registration Confirmed for 9th US-India Conference!
                  </h3>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    Welcome, {submittedAttendee.fullName}. Your participation pass has been generated. Please add the conference to your calendar below.
                  </p>
                </div>
              </div>

              {/* Digital Delegate Pass */}
              <div className="bg-gradient-to-br from-[#002A5C] via-[#003875] to-[#002A5C] text-white p-5 rounded-2xl shadow-lg border-2 border-[#FFD100] relative overflow-hidden">
                <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl pointer-events-none"></div>

                <div className="flex justify-between items-start border-b border-white/15 pb-3 mb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#FFD100]">
                      Official Delegate Pass
                    </span>
                    <h4 className="text-lg font-bold text-white leading-tight">
                      9th US-INDIA CONFERENCE
                    </h4>
                    <span className="text-xs text-slate-200">US–India: Shaping the Next Global Turn</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-300 block font-mono">PASS ID</span>
                    <span className="text-xs font-mono font-bold text-[#FFD100]">{submittedAttendee.id}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs mb-3">
                  <div>
                    <span className="text-slate-300 text-[10px] block">DELEGATE</span>
                    <span className="font-bold text-white">{submittedAttendee.fullName}</span>
                  </div>
                  <div>
                    <span className="text-slate-300 text-[10px] block">ORGANIZATION</span>
                    <span className="font-semibold text-slate-200">{submittedAttendee.organization}</span>
                  </div>
                  <div>
                    <span className="text-slate-300 text-[10px] block">ACCESS TYPE</span>
                    <span className="font-semibold text-[#FFD100] uppercase">{submittedAttendee.attendanceType}</span>
                  </div>
                </div>

                {/* Dual Timezone Highlight on Pass */}
                <div className="bg-slate-900/60 p-3 rounded-xl border border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-300 text-[10px] block">🇺🇸 VENUE TIME (SANTA CLARA)</span>
                    <span className="font-bold text-[#FFD100] font-mono">
                      {formatInPDT(EVENT_DETAILS.startUTC, true)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-300 text-[10px] block">🇮🇳 INDIA TIME (IST)</span>
                    <span className="font-bold text-[#FFD100] font-mono">
                      {formatInIST(EVENT_DETAILS.startUTC, true)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Immediate 1-Click Calendar Buttons */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Sync to Your Calendar Now:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <a
                    href={getGoogleCalendarUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl border border-slate-300 hover:border-[#004A8F] hover:bg-blue-50 transition-all font-semibold text-xs flex items-center justify-center gap-2 text-slate-800 shadow-2xs"
                  >
                    <span className="text-red-500 font-bold">G</span>
                    <span>Google Calendar</span>
                  </a>

                  <a
                    href={getOutlookLiveUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl border border-slate-300 hover:border-sky-500 hover:bg-sky-50 transition-all font-semibold text-xs flex items-center justify-center gap-2 text-slate-800 shadow-2xs"
                  >
                    <span className="text-sky-600 font-bold">O</span>
                    <span>Outlook / 365</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => downloadIcsFile()}
                    className="py-2.5 px-3 rounded-xl border border-slate-300 hover:border-slate-800 hover:bg-slate-100 transition-all font-semibold text-xs flex items-center justify-center gap-2 text-slate-800 shadow-2xs cursor-pointer"
                  >
                    <span>🍎</span>
                    <span>Apple / iCal (.ics)</span>
                  </button>
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center text-xs">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-slate-600 hover:text-slate-900 underline cursor-pointer"
                >
                  Register another delegate
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 rounded-lg bg-[#004A8F] text-white font-semibold hover:bg-[#003669] cursor-pointer shadow-xs"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
