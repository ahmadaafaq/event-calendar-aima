import React from 'react';
import { Briefcase, Building2, Users, Calendar, ArrowRight, Shield, Award } from 'lucide-react';

interface CeosDelegationSectionProps {
  onOpenRegisterModal: () => void;
}

export const CeosDelegationSection: React.FC<CeosDelegationSectionProps> = ({ onOpenRegisterModal }) => {
  return (
    <section className="py-16 bg-[#F9FBFF] text-slate-900 border-b border-slate-200" id="delegation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-[#002A5C] via-[#003c7a] to-[#002A5C] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden border border-slate-200/20">
          {/* Subtle ambient light */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#004A8F]/30 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FFD100] text-xs font-bold uppercase tracking-wider border border-white/15">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Special Bilateral Initiative</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-display">
                AIMA CEOs Delegation to Silicon Valley
              </h2>

              <div className="text-[#FFD100] text-sm font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>October 5 – 9, 2026 • San Francisco &amp; Silicon Valley, California</span>
              </div>

              <p className="text-sm text-slate-200 leading-relaxed max-w-2xl">
                The 9th US-India Conference is organized in close conjunction with AIMA's annual flagship <strong>CEOs Delegation to Silicon Valley</strong>. This exclusive 5-day delegation brings together top Indian business leaders, conglomerate chairpersons, and unicorn founders for executive briefings with leading technology giants, venture capital firms, advanced research labs at UC Santa Cruz and Stanford, and California innovation hubs.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-white/10 border border-white/15 rounded-xl p-3.5">
                  <div className="text-[#FFD100] font-bold text-base font-mono">5 Days</div>
                  <div className="text-xs text-slate-200 mt-0.5">High-impact immersions &amp; board-level roundtables</div>
                </div>

                <div className="bg-white/10 border border-white/15 rounded-xl p-3.5">
                  <div className="text-[#FFD100] font-bold text-base font-mono">35+ CEOs</div>
                  <div className="text-xs text-slate-200 mt-0.5">Senior business leaders from key Indian sectors</div>
                </div>

                <div className="bg-white/10 border border-white/15 rounded-xl p-3.5">
                  <div className="text-[#FFD100] font-bold text-base font-mono">10+ Labs</div>
                  <div className="text-xs text-slate-200 mt-0.5">Private visits to Silicon Valley tech founders &amp; R&amp;D campuses</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-black/20 rounded-2xl border border-white/15 text-center space-y-4 backdrop-blur-xs">
              <div className="w-14 h-14 rounded-full bg-[#FFD100]/20 text-[#FFD100] flex items-center justify-center border border-[#FFD100]/30">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Join as a Delegate</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Participation in the 9th US-India Conference is included for delegation members and open to invited executives.
                </p>
              </div>

              <button
                onClick={onOpenRegisterModal}
                className="w-full py-3 px-4 rounded-xl bg-[#FFD100] hover:bg-yellow-400 text-[#002A5C] font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Delegate Invitation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
