import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Calendar, Globe } from 'lucide-react';
import { FREQUENTLY_ASKED_QUESTIONS } from '../data/conferenceData';

interface FaqSectionProps {
  onOpenCalendarModal: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenCalendarModal }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 bg-[#F9FBFF] border-b border-slate-200" id="faqs">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#004A8F] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border border-blue-100 mb-3 shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#004A8F]" />
            <span>Attendee Guidance</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight font-display">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Everything you need to know regarding participation, timezone scheduling, and calendar integration.
          </p>
        </div>

        <div className="space-y-3">
          {FREQUENTLY_ASKED_QUESTIONS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4.5 text-left flex justify-between items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900">
                    {faq.question}
                  </span>
                  <div className="p-1 rounded-full text-slate-400">
                    {isOpen ? <ChevronUp className="w-5 h-5 text-[#004A8F]" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Calendar Helper Banner in FAQ */}
        <div className="mt-8 p-5 rounded-2xl bg-white border border-blue-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#004A8F] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Calendar className="w-5 h-5 text-[#FFD100]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Ready to save your spot on your schedule?
              </h4>
              <p className="text-xs text-slate-600">
                Instantly add to Google Calendar, Outlook, or Apple Calendar with accurate UTC timezone conversion.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenCalendarModal}
            className="px-5 py-2.5 rounded-xl bg-[#004A8F] hover:bg-[#003669] text-white font-bold text-xs shrink-0 transition-colors cursor-pointer shadow-xs"
          >
            Add to Calendar Now
          </button>
        </div>
      </div>
    </section>
  );
};
