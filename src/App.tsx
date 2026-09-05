/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TimezoneMode } from './types/conference';
import { getBrowserTimezone, isIndianLocation } from './utils/timezone';

export default function App() {
  const [userTimezone, setUserTimezone] = useState<string>('America/Los_Angeles');
  const [activeTimezone, setActiveTimezone] = useState<TimezoneMode>('DUAL');

  useEffect(() => {
    const detectedTz = getBrowserTimezone();
    setUserTimezone(detectedTz);

    // If user is accessing from India, default activeTimezone to INDIA_IST or DUAL
    if (isIndianLocation(detectedTz)) {
      setActiveTimezone('INDIA_IST');
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-amber-500 selection:text-white">
      {/* Clean Single Navigation Bar */}
      <Header
        activeTimezone={activeTimezone}
        onChangeTimezone={setActiveTimezone}
        userTimezone={userTimezone}
      />

      {/* Main Conference Content with Single-Click Calendar Options */}
      <main className="flex-1">
        <Hero
          activeTimezone={activeTimezone}
          userTimezone={userTimezone}
        />
      </main>
    </div>
  );
}
