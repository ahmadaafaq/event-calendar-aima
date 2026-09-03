/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { CalendarModal } from './components/CalendarModal';
import { TimezoneMode } from './types/conference';
import { getBrowserTimezone, isIndianLocation } from './utils/timezone';

export default function App() {
  const [userTimezone, setUserTimezone] = useState<string>('America/Los_Angeles');
  const [activeTimezone, setActiveTimezone] = useState<TimezoneMode>('DUAL');
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);

  useEffect(() => {
    const detectedTz = getBrowserTimezone();
    setUserTimezone(detectedTz);

    // If user is accessing from India, default activeTimezone to INDIA_IST or DUAL
    if (isIndianLocation(detectedTz)) {
      setActiveTimezone('INDIA_IST');
    }
  }, []);

  const handleOpenGeneralCalendar = () => {
    setCalendarModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-amber-500 selection:text-white">
      {/* Sticky Header */}
      <Header
        onOpenCalendarModal={handleOpenGeneralCalendar}
        activeTimezone={activeTimezone}
        onChangeTimezone={setActiveTimezone}
        userTimezone={userTimezone}
      />

      {/* Main Conference Content */}
      <main className="flex-1">
        {/* Conference Hero Section */}
        <Hero
          onOpenCalendarModal={handleOpenGeneralCalendar}
          activeTimezone={activeTimezone}
          userTimezone={userTimezone}
        />
      </main>

      {/* Official AIMA Footer */}
      <Footer
        onOpenCalendarModal={handleOpenGeneralCalendar}
      />

      {/* Calendar Integration Modal (Google, Outlook, Apple iCal) */}
      <CalendarModal
        isOpen={calendarModalOpen}
        onClose={() => setCalendarModalOpen(false)}
        userTimezone={userTimezone}
      />
    </div>
  );
}
