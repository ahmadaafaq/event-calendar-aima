import React from 'react';
import { X, Download, Printer, CheckCircle, Calendar, FileText, Sparkles, Building } from 'lucide-react';
import { EVENT_DETAILS, formatInPDT, formatInIST } from '../utils/timezone';
import { downloadIcsFile } from '../utils/calendar';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegisterModal: () => void;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({
  isOpen,
  onClose,
  onOpenRegisterModal,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-[#002A5C] px-6 py-4 text-white flex justify-between items-center border-b border-blue-900/60">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-[#FFD100]" />
            <div>
              <h2 className="text-base font-bold text-white leading-tight">
                9th US-India Conference • Official Program Brochure
              </h2>
              <span className="text-xs text-slate-200">All India Management Association &amp; UC Santa Cruz</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Print Brochure"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Brochure Content */}
        <div className="overflow-y-auto px-6 py-6 space-y-6 text-slate-800 printable-area">
          {/* Cover Strip */}
          <div className="bg-gradient-to-r from-[#002A5C] via-[#003875] to-[#002A5C] text-white p-6 rounded-2xl border border-[#FFD100]/60 shadow-md text-center space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#FFD100] bg-white/10 px-3 py-1 rounded-full border border-white/20">
              Official Conference Brief
            </span>
            <h3 className="text-2xl font-black tracking-tight text-white font-display">
              9th US–INDIA CONFERENCE
            </h3>
            <p className="text-lg font-medium text-[#FFD100] italic">
              “US–India: Shaping the Next Global Turn”
            </p>
            <div className="pt-2 text-xs text-slate-200 flex flex-wrap justify-center gap-4">
              <span>📅 Thursday, 8th October 2026 | 2:30 pm onwards</span>
              <span>📍 UC Santa Cruz Silicon Valley Campus, Santa Clara, CA</span>
            </div>
          </div>

          {/* Dual Timezone Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block font-bold mb-1">
                🇺🇸 California Venue Timing (PDT)
              </strong>
              <div className="font-mono text-slate-800 font-semibold">
                Thursday, 8 October 2026 • 2:30 PM PDT onwards
              </div>
              <div className="text-slate-500 mt-1">
                Reception check-in begins at 2:00 PM PDT
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
              <strong className="text-amber-950 block font-bold mb-1">
                🇮🇳 India Standard Time (IST Auto-Converted)
              </strong>
              <div className="font-mono text-amber-900 font-semibold">
                Friday, 9 October 2026 • 3:00 AM IST onwards
              </div>
              <div className="text-amber-800 mt-1">
                Automatic universal sync available for all calendar clients
              </div>
            </div>
          </div>

          {/* Core Objectives */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Conference Imperatives &amp; Focus Areas:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Critical and Emerging Technologies (iCET) &amp; Semiconductor Fabs</span>
              </div>
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Clean Energy, Sustainable Grid Transitions &amp; Decarbonization</span>
              </div>
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>AI Governance, Sovereign Compute Infrastructure &amp; Genomic AI</span>
              </div>
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Cross-Border Venture Capital, Deep-Tech Scaling &amp; Unicorn Synergy</span>
              </div>
            </div>
          </div>

          {/* Institutional Background */}
          <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 text-xs text-slate-700 space-y-2">
            <div className="font-bold text-[#002A5C] text-sm">
              Organized by All India Management Association &amp; UC Santa Cruz
            </div>
            <p className="leading-relaxed text-slate-600">
              In conjunction with AIMA's annual CEOs Delegation to Silicon Valley (October 5–9, 2026) and supported by the Consulate General of India, San Francisco.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap justify-between items-center gap-3">
          <button
            type="button"
            onClick={() => downloadIcsFile()}
            className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Calendar className="w-3.5 h-3.5 text-[#004A8F]" />
            <span>Download .ICS Calendar File</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenRegisterModal();
              }}
              className="px-5 py-2.5 rounded-lg bg-[#004A8F] hover:bg-[#003669] text-white font-bold text-xs cursor-pointer shadow-xs"
            >
              Register for Conference
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
