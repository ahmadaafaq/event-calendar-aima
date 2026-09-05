/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { EventWidget } from './components/EventWidget';

export default function App() {
  const [isEmbedded, setIsEmbedded] = useState(false);

  useEffect(() => {
    // Detect if page is in an iframe or ?embed=true query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const inIframe = window.self !== window.top;
    if (urlParams.get('embed') === 'true' || inIframe) {
      setIsEmbedded(true);
    }
  }, []);

  return (
    <div
      className={`min-h-screen text-slate-900 flex flex-col justify-center items-center selection:bg-amber-500 selection:text-white ${
        isEmbedded ? 'bg-transparent p-2 sm:p-3' : 'bg-slate-100/70 p-4 sm:p-6 lg:p-8'
      }`}
    >
      {/* Background Subtle Accent Pattern (when not embedded) */}
      {!isEmbedded && (
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#004A8F_1px,transparent_1px)] [background-size:20px_20px]" />
      )}

      {/* Main Event Calendar Widget */}
      <main className="w-full relative z-10 flex flex-col items-center">
        <EventWidget />
      </main>
    </div>
  );
}
