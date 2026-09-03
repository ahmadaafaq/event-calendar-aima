import React, { useState } from 'react';
import { Sparkles, User, ExternalLink, X, Building, MapPin } from 'lucide-react';
import { SPEAKERS } from '../data/conferenceData';
import { Speaker } from '../types/conference';

export const SpeakersSection: React.FC = () => {
  const [activeSpeaker, setActiveSpeaker] = useState<Speaker | null>(null);

  return (
    <section className="py-16 bg-[#F9FBFF] border-b border-slate-200" id="speakers">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#004A8F] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border border-blue-100 mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#004A8F]" />
            <span>Global Thought Leaders &amp; Dignitaries</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight font-display">
            Distinguished Speakers &amp; Panelists
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Convening leadership from the All India Management Association, UC Santa Cruz, Indian diplomatic missions, Fortune 500 corporations, and Silicon Valley innovators.
          </p>
        </div>

        {/* Speakers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPEAKERS.map((speaker) => (
            <div
              key={speaker.id}
              onClick={() => setActiveSpeaker(speaker)}
              className="bg-white rounded-2xl border border-slate-200 hover:border-[#004A8F]/40 p-6 shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="relative mb-4 overflow-hidden rounded-xl bg-slate-100 aspect-square max-h-56">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 right-2">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-md shadow-2xs ${
                        speaker.country === 'India'
                          ? 'bg-amber-50 text-amber-900 border border-amber-200'
                          : 'bg-blue-50 text-[#004A8F] border border-blue-200'
                      }`}
                    >
                      {speaker.country === 'India' ? '🇮🇳 India' : '🇺🇸 US'}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#004A8F] transition-colors">
                    {speaker.name}
                  </h3>
                  <div className="text-xs font-semibold text-slate-700">
                    {speaker.role}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    {speaker.organization}
                  </div>
                </div>

                {speaker.topic && (
                  <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                    <span className="font-bold text-[#004A8F] block text-[10px] uppercase tracking-wider mb-0.5">
                      Session Topic:
                    </span>
                    {speaker.topic}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#004A8F]">
                <span>View Full Biography</span>
                <span className="text-[#004A8F] group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Speaker Detail Modal */}
      {activeSpeaker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-[#002A5C] px-6 py-4 text-white flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FFD100]">
                Speaker Profile
              </span>
              <button
                onClick={() => setActiveSpeaker(null)}
                className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={activeSpeaker.image}
                  alt={activeSpeaker.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-[#FFD100] shadow-md shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {activeSpeaker.name}
                  </h3>
                  <div className="text-xs font-semibold text-slate-700">
                    {activeSpeaker.role}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    {activeSpeaker.organization}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-xs text-blue-950">
                <strong className="block text-[10px] font-bold uppercase tracking-wider text-[#004A8F] mb-0.5">
                  Speaking at 9th US-India Conference:
                </strong>
                {activeSpeaker.topic || 'Plenary Panel Discussion'}
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Biography &amp; Background:
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {activeSpeaker.bio}
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveSpeaker(null)}
                  className="px-5 py-2 rounded-lg bg-[#004A8F] text-white font-bold text-xs hover:bg-[#003669] cursor-pointer shadow-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
