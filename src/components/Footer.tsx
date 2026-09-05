import React from 'react';
import { MapPin, Phone, Mail, Globe, Calendar, ArrowUp, Shield, Download, FileText } from 'lucide-react';

interface FooterProps {
  onOpenCalendarModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCalendarModal,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#001733] text-white border-t border-slate-800">
      {/* Upper Footer CTA Strip */}
      <div className="bg-[#002A5C] border-b border-blue-900/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-wider font-bold text-[#FFD100]">
              9th US-India Conference • October 8, 2026
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              US–India: Shaping the Next Global Turn
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 mt-0.5">
              UC Santa Cruz, Silicon Valley Campus, Santa Clara, California
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://event-calendar-aima.vercel.app/9th-US-India-Conference-2026.ics"
              className="px-6 py-2.5 rounded-xl bg-[#FFD100] hover:bg-yellow-400 text-[#002A5C] font-bold text-xs flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#002A5C]" />
              <span>Add to Calendar</span>
            </a>

            <button
              onClick={onOpenCalendarModal}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-[#002A5C] font-bold text-xs flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <span>Other Calendar Options</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: About AIMA */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#004A8F] text-white flex items-center justify-center text-xs font-black shadow-xs">
                AIMA
              </div>
              <span className="text-sm font-bold text-white tracking-wide">
                All India Management Association
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Established in 1957, AIMA is the national apex body of the management profession in India, actively promoting excellence in management, education, and global trade partnerships.
            </p>
            <div className="text-[11px] text-slate-400 pt-1">
              <strong>Registration:</strong> Society registered under the Societies Registration Act XXI of 1860.
            </div>
          </div>

          {/* Col 2: New Delhi Secretariat */}
          <div className="space-y-3 text-xs text-slate-300">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFD100]">
              AIMA Headquarters (India)
            </h4>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#FFD100] shrink-0 mt-0.5" />
              <span>
                Management House, 14 Institutional Area, Lodi Road, New Delhi – 110003, India
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#FFD100] shrink-0" />
              <span>+91-11-24645100 / 43128100</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#FFD100] shrink-0" />
              <a href="mailto:usindiaconference@aima.in" className="hover:text-yellow-300">
                usindiaconference@aima.in
              </a>
            </div>
          </div>

          {/* Col 3: UC Santa Cruz Silicon Valley */}
          <div className="space-y-3 text-xs text-slate-300">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFD100]">
              Co-Host Campus (United States)
            </h4>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#FFD100] shrink-0 mt-0.5" />
              <span>
                UC Santa Cruz Silicon Valley Campus<br />
                3175 Bowers Ave, Santa Clara, CA 95054, USA
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#FFD100] shrink-0" />
              <span>svcenter.ucsc.edu</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Supported by Consulate General of India, San Francisco
            </div>
          </div>

          {/* Col 4: Quick Navigation & Timezone Support */}
          <div className="space-y-3 text-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFD100]">
              Event Resources
            </h4>
            <ul className="space-y-1.5 text-slate-300">
              <li>
                <a
                  href="https://event-calendar-aima.vercel.app/9th-US-India-Conference-2026.ics"
                  className="hover:text-[#FFD100] transition-colors flex items-center gap-1 font-semibold text-white"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#FFD100]" />
                  <span>Add to Calendar (.ICS File)</span>
                </a>
              </li>
              <li>
                <a
                  href="/download.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FFD100] transition-colors"
                >
                  Standalone Calendar Page (/download.html)
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenCalendarModal}
                  className="hover:text-[#FFD100] transition-colors text-left cursor-pointer"
                >
                  Add to Calendar (Google / Outlook / Apple)
                </button>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=UC+Santa+Cruz+Silicon+Valley+Campus+3175+Bowers+Ave+Santa+Clara+CA+95054"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FFD100] transition-colors"
                >
                  Google Maps Directions (Santa Clara)
                </a>
              </li>
              <li>
                <a
                  href="https://svcenter.ucsc.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FFD100] transition-colors"
                >
                  UC Santa Cruz Silicon Valley Campus
                </a>
              </li>
              <li>
                <a
                  href="https://www.aima.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FFD100] transition-colors"
                >
                  AIMA Official Portal (aima.in)
                </a>
              </li>
              <li>
                <a
                  href="https://cgisf.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FFD100] transition-colors"
                >
                  Consulate General of India, San Francisco
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <div>
            © 2026 All India Management Association (AIMA). Co-hosted with University of California, Santa Cruz. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-500">Official Bilateral Conference Portal</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
