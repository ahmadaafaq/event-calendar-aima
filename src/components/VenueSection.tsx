import React from 'react';
import { MapPin, Navigation, Plane, Car, Train, Building, ExternalLink } from 'lucide-react';
import { EVENT_DETAILS } from '../utils/timezone';

export const VenueSection: React.FC = () => {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${EVENT_DETAILS.venueName}, ${EVENT_DETAILS.venueAddress}`
  )}`;

  return (
    <section className="py-16 bg-white border-b border-slate-200" id="venue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#004A8F] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border border-blue-100 mb-3 shadow-2xs">
            <MapPin className="w-3.5 h-3.5 text-[#004A8F]" />
            <span>Silicon Valley Location</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight font-display">
            Venue &amp; Travel Directions
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            UC Santa Cruz Silicon Valley Campus • 3175 Bowers Ave, Santa Clara, CA 95054
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Venue Info & Directions */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#F9FBFF] p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#004A8F] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Building className="w-5 h-5 text-[#FFD100]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    UC Santa Cruz, Silicon Valley Campus
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Located in the heart of Santa Clara and Silicon Valley, UCSC's Silicon Valley Center provides state-of-the-art auditorium facilities, executive networking lounges, and advanced audiovisual infrastructure.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="font-semibold text-slate-700">
                  Address: 3175 Bowers Ave, Santa Clara, CA 95054
                </span>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#004A8F] hover:text-[#003669] font-bold"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Travel Guide Options */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Transit &amp; Airport Connectivity:
              </h4>

              <div className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
                <Plane className="w-5 h-5 text-[#004A8F] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-slate-900 block font-bold">San Jose Airport (SJC) — 10 mins</strong>
                  <p className="text-slate-600 mt-0.5">
                    Closest airport. Just 5.5 miles via US-101 N / San Tomas Expressway. 10-15 minute rideshare or taxi.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
                <Plane className="w-5 h-5 text-[#004A8F] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-slate-900 block font-bold">San Francisco Airport (SFO) — 35 mins</strong>
                  <p className="text-slate-600 mt-0.5">
                    Primary international hub. Direct international flights from Delhi/Mumbai and worldwide. 32 miles via US-101 S.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
                <Car className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-slate-900 block font-bold">Parking &amp; Driving</strong>
                  <p className="text-slate-600 mt-0.5">
                    Convenient on-site parking garage is available for conference delegates directly adjacent to 3175 Bowers Ave.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map Visual */}
          <div className="lg:col-span-6">
            <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-300 shadow-lg flex flex-col">
              {/* Map Header */}
              <div className="bg-[#002A5C] px-4 py-3.5 text-white flex justify-between items-center text-xs">
                <span className="font-bold flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-[#FFD100]" />
                  Santa Clara, CA Map View
                </span>
                <span className="text-slate-300 font-mono text-[11px]">37.3828° N, 121.9733° W</span>
              </div>

              {/* Map Canvas / Simulated Interactive View */}
              <div className="relative aspect-video sm:aspect-4/3 bg-slate-800 flex items-center justify-center p-6 text-center">
                <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

                <div className="relative z-10 max-w-sm bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl text-slate-800 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#FFD100] text-[#002A5C] flex items-center justify-center mx-auto shadow-md">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-base text-slate-900">
                      UC Santa Cruz Silicon Valley Campus
                    </h5>
                    <p className="text-xs text-slate-600 mt-1">
                      3175 Bowers Ave, Santa Clara, CA 95054
                    </p>
                  </div>

                  <div className="text-[11px] text-slate-500 bg-slate-100 p-2 rounded-lg">
                    Near Scott Blvd &amp; Central Expressway • Silicon Valley Corridor
                  </div>

                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#004A8F] hover:bg-[#003669] text-white font-bold text-xs transition-colors shadow-xs"
                  >
                    <span>Get Turn-by-Turn Directions</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
