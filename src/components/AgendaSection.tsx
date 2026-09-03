import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, ArrowRight, Check, Sparkles, Filter } from 'lucide-react';
import { AGENDA_SESSIONS, SPEAKERS } from '../data/conferenceData';
import { TimezoneMode, AgendaSession } from '../types/conference';
import { formatInPDT, formatInIST, formatTimeInZone } from '../utils/timezone';

interface AgendaSectionProps {
  activeTimezone: TimezoneMode;
  userTimezone: string;
  onAddSessionToCalendar: (sessionId: string) => void;
}

export const AgendaSection: React.FC<AgendaSectionProps> = ({
  activeTimezone,
  userTimezone,
  onAddSessionToCalendar,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Inaugural', 'Keynote', 'Plenary', 'Networking', 'Valedictory'];

  const filteredSessions = selectedCategory === 'All'
    ? AGENDA_SESSIONS
    : AGENDA_SESSIONS.filter((s) => s.category === selectedCategory);

  const renderSessionTime = (session: AgendaSession) => {
    const pdtStart = formatInPDT(session.startUTC, false);
    const pdtEnd = formatInPDT(session.endUTC, false);

    const istStart = formatInIST(session.startUTC, false);
    const istEnd = formatInIST(session.endUTC, false);

    const localStart = formatTimeInZone(session.startUTC, userTimezone, { timeOnly: true });
    const localEnd = formatTimeInZone(session.endUTC, userTimezone, { timeOnly: true });

    if (activeTimezone === 'US_PDT') {
      return (
        <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#002A5C] bg-blue-50/80 px-2.5 py-1 rounded-md border border-blue-100">
          <Clock className="w-3.5 h-3.5 text-[#004A8F]" />
          <span>{pdtStart} – {pdtEnd} (PDT)</span>
        </div>
      );
    }

    if (activeTimezone === 'INDIA_IST') {
      return (
        <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-amber-950 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
          <Clock className="w-3.5 h-3.5 text-amber-700" />
          <span>{istStart} – {istEnd} IST (Fri, Oct 9)</span>
        </div>
      );
    }

    if (activeTimezone === 'USER_LOCAL') {
      return (
        <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
          <Clock className="w-3.5 h-3.5 text-[#004A8F]" />
          <span>{localStart} – {localEnd} ({userTimezone.split('/')[1]?.replace(/_/g, ' ') || 'Local'})</span>
        </div>
      );
    }

    // DUAL MODE
    return (
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs font-bold text-[#002A5C] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
          🇺🇸 {pdtStart} – {pdtEnd} PDT
        </span>
        <span className="font-mono text-xs font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
          🇮🇳 {istStart} – {istEnd} IST
        </span>
      </div>
    );
  };

  return (
    <section className="py-16 bg-white border-b border-slate-200" id="agenda">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#004A8F] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border border-blue-100 mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#004A8F]" />
            <span>Official Conference Program Flow</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight font-display">
            Conference Agenda &amp; Program Schedule
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Thursday, 8th October 2026 • UC Santa Cruz, Silicon Valley Campus
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-8">
          <span className="text-xs font-semibold text-slate-500 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-[#004A8F]" /> Filter Track:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#004A8F] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Timeline List */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {filteredSessions.map((session, index) => {
            const sessionSpeakers = SPEAKERS.filter((sp) => session.speakers.includes(sp.id));

            return (
              <div
                key={session.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-[#004A8F]/40 p-6 shadow-xs hover:shadow-md transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-blue-50 text-[#004A8F] border border-blue-100">
                        {session.category}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#004A8F]" />
                        {session.room}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {session.title}
                    </h3>
                  </div>

                  {/* Add to Calendar for this Session */}
                  <button
                    onClick={() => onAddSessionToCalendar(session.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-blue-50 text-[#004A8F] border border-slate-200 font-semibold text-xs shrink-0 self-start transition-colors cursor-pointer"
                    title="Add this individual session to your calendar"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#004A8F]" />
                    <span>Add to Calendar</span>
                  </button>
                </div>

                {/* Times Bar */}
                <div className="mb-3">{renderSessionTime(session)}</div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {session.description}
                </p>

                {/* Session Speakers */}
                {sessionSpeakers.length > 0 && (
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-3">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Featuring:
                    </span>
                    {sessionSpeakers.map((speaker) => (
                      <div key={speaker.id} className="flex items-center gap-2">
                        <img
                          src={speaker.image}
                          alt={speaker.name}
                          className="w-6 h-6 rounded-full object-cover border border-slate-300"
                          referrerPolicy="no-referrer"
                        />
                        <span className="text-xs font-semibold text-slate-800">
                          {speaker.name}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          ({speaker.organization.split(',')[0].slice(0, 25)})
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
