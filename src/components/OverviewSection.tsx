import React from 'react';
import { Sparkles, Cpu, TrendingUp, Activity, SunMedium, Compass, GraduationCap, CheckCircle2, ShieldCheck } from 'lucide-react';
import { CORE_THEMES } from '../data/conferenceData';

interface OverviewSectionProps {
  onOpenRegisterModal: () => void;
  onOpenBrochureModal: () => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  onOpenRegisterModal,
  onOpenBrochureModal,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-[#004A8F]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-[#004A8F]" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-[#004A8F]" />;
      case 'SunMedium':
        return <SunMedium className="w-5 h-5 text-[#004A8F]" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-[#004A8F]" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-[#004A8F]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#004A8F]" />;
    }
  };

  return (
    <section className="py-16 bg-white border-b border-slate-200" id="overview">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Summit Background & Purpose */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-[#004A8F] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border border-blue-100 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-[#004A8F]" />
              <span>About the Conference</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display leading-tight">
              A Flagship Platform for US-India Strategic Leadership
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              The <strong>9th US–India Conference</strong>, co-hosted by the <strong>All India Management Association (AIMA)</strong> and the <strong>University of California, Santa Cruz (UCSC)</strong>, and supported by the <strong>Consulate General of India in San Francisco</strong>, is an premier bilateral forum dedicated to advancing economic, technological, and intellectual convergence between India and the United States.
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Against the backdrop of dynamic geopolitical realignments and technological frontiers like Artificial Intelligence and quantum computing, this edition convenes under the theme <em>“US–India: Shaping the Next Global Turn.”</em> The conference acts as a catalyst to unlock high-impact partnerships, supply chain resilience, and shared prosperity.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Executive Networking &amp; G2B Engagements</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Joint Declarations &amp; Policy Dialogues</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Silicon Valley Innovation Ecosystem</span>
              </div>
            </div>
          </div>

          {/* Co-Host Highlights Card */}
          <div className="lg:col-span-5 bg-[#F9FBFF] p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <h3 className="font-bold text-[#002A5C] uppercase tracking-wider text-xs border-b border-slate-200 pb-2">
              Co-Hosts &amp; Institutional Alliance
            </h3>

            {/* AIMA */}
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-lg bg-[#004A8F] text-white flex flex-col items-center justify-center text-xs font-bold shrink-0 shadow-xs">
                <span>AIMA</span>
              </div>
              <div className="text-xs">
                <h4 className="font-bold text-slate-900">All India Management Association</h4>
                <p className="text-slate-600 mt-0.5 leading-relaxed">
                  Established in 1957, AIMA is the national apex body of the management profession in India, collaborating actively with industry, government, and premier international academic institutions.
                </p>
              </div>
            </div>

            {/* UC Santa Cruz */}
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-lg bg-[#FFD100] text-[#002A5C] flex flex-col items-center justify-center text-xs font-bold shrink-0 shadow-xs">
                <span>UCSC</span>
              </div>
              <div className="text-xs">
                <h4 className="font-bold text-slate-900">University of California, Santa Cruz</h4>
                <p className="text-slate-600 mt-0.5 leading-relaxed">
                  A premier public research university, renowned for pioneering human genomics, astronomical discoveries, and cutting-edge silicon technology at its Silicon Valley Campus.
                </p>
              </div>
            </div>

            {/* Consulate Support */}
            <div className="p-3 bg-blue-50/80 border border-blue-100 rounded-xl text-xs text-blue-950">
              <strong className="block text-[#004A8F] font-bold mb-0.5">Diplomatic Support:</strong>
              Supported by the Consulate General of India, San Francisco, fostering Pacific corridor diplomatic and commercial synergies.
            </div>
          </div>
        </div>

        {/* Six Core Pillars / Themes */}
        <div id="themes">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
              Strategic Focus Areas &amp; Pillars
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Key thematic imperatives shaping bilateral cooperation at the 9th US-India Conference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CORE_THEMES.map((theme, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-[#004A8F]/40 hover:shadow-lg transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100">
                  {getIcon(theme.icon)}
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  {theme.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {theme.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
