'use client';

import React, { useState, useEffect } from 'react';
import { useCookieConsent } from '@/context/CookieConsentContext';
import type { CookieConsentState } from '@/types/cookies';

// Global function to reopen cookie banner (called from footer)
declare global {
  interface Window {
    reopenCookieBanner?: () => void;
  }
}

const CookieBanner: React.FC = () => {
  const { state, choice, setConsent } = useCookieConsent();
  const [tempState, setTempState] = useState<CookieConsentState>(state);
  const [forceShow, setForceShow] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Register global function to reopen banner
  useEffect(() => {
    window.reopenCookieBanner = () => {
      setForceShow(true);
      setShowDetails(true); // Auto-expand when manually reopening
    };
    return () => {
      delete window.reopenCookieBanner;
    };
  }, []);

  const showBanner = choice === 'pending' || forceShow;

  if (!showBanner) return null;

  const handleAcceptAll = () => {
    const newState: CookieConsentState = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    setConsent(newState, 'accepted');
    setForceShow(false);
    setShowDetails(false);
  };

  const handleRejectNonEssential = () => {
    const newState: CookieConsentState = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    setConsent(newState, 'rejected');
    setForceShow(false);
    setShowDetails(false);
  };

  const handleSaveCustom = () => {
    const newState: CookieConsentState = {
      essential: true,
      analytics: tempState.analytics,
      marketing: tempState.marketing,
    };
    setConsent(newState, 'custom');
    setForceShow(false);
    setShowDetails(false);
  };

  const handleClose = () => {
    setForceShow(false);
    setShowDetails(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] flex justify-center px-2 sm:px-4 pb-[72px] md:pb-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="max-w-5xl w-full rounded-xl border border-gray-800 bg-gray-950/98 text-gray-200 shadow-2xl p-4 md:p-5 ring-1 ring-white/10 backdrop-blur-md">
        <div className="flex flex-col gap-4">
          {/* Top Bar: Title & Simple Text */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">🍪</span>
                <h2 className="text-sm md:text-base font-bold text-white">
                  {choice === 'pending' ? 'Cookie Consent' : 'Cookie Preferences'}
                </h2>
                {forceShow && (
                  <button
                    onClick={handleClose}
                    className="ml-auto md:hidden text-gray-500 hover:text-white"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              <p className="text-[11px] md:text-xs text-gray-400 leading-relaxed max-w-3xl text-left">
                We use cookies to optimize site functionality and analyze traffic. Essential cookies are always on.
                Manage your preferences or <a href="/privacy" className="text-solar-orange hover:underline font-medium">Read Policy</a>.
              </p>
            </div>

            {/* Main Actions */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-[11px] md:text-xs font-medium text-gray-400 hover:text-white transition-colors underline decoration-gray-600 underline-offset-4 mr-2"
              >
                {showDetails ? 'Hide Settings' : 'Manage Preferences'}
              </button>
              <button
                onClick={handleRejectNonEssential}
                className="px-4 py-2 text-[11px] md:text-xs font-semibold rounded-lg border border-gray-700 hover:bg-white/5 transition-all text-gray-300 min-h-[40px]"
              >
                Essential Only
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 text-[11px] md:text-xs font-bold rounded-lg bg-solar-orange text-navy-dark hover:bg-white transition-all shadow-lg shadow-solar-orange/10 min-h-[40px]"
              >
                Accept All
              </button>
              {forceShow && (
                <button
                  onClick={handleClose}
                  className="hidden md:flex items-center justify-center w-8 h-8 rounded-full border border-gray-800 text-gray-500 hover:text-white hover:border-gray-600 transition-all ml-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Expanded Details Section */}
          {showDetails && (
            <div className="pt-4 border-t border-gray-800 grid grid-cols-1 md:grid-cols-3 gap-4 animate-in slide-in-from-top-2 duration-200">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                <input type="checkbox" checked disabled className="mt-1 w-4 h-4 accent-solar-orange opacity-50" />
                <div>
                  <div className="text-xs font-bold text-white text-left">Essential</div>
                  <div className="text-[10px] text-gray-500 text-left">Security & Core Logic</div>
                </div>
              </div>

              <button
                className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => setTempState((p: CookieConsentState) => ({ ...p, analytics: !p.analytics }))}
              >
                <input
                  type="checkbox"
                  className="mt-1 w-4 h-4 accent-solar-orange cursor-pointer"
                  checked={tempState.analytics}
                  readOnly
                />
                <div className="text-left">
                  <div className="text-xs font-bold text-white">Analytics</div>
                  <div className="text-[10px] text-gray-500">Traffic & Usage patterns</div>
                </div>
              </button>

              <button
                className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => setTempState((p: CookieConsentState) => ({ ...p, marketing: !p.marketing }))}
              >
                <input
                  type="checkbox"
                  className="mt-1 w-4 h-4 accent-solar-orange cursor-pointer"
                  checked={tempState.marketing}
                  readOnly
                />
                <div className="text-left">
                  <div className="text-xs font-bold text-white">Marketing</div>
                  <div className="text-[10px] text-gray-500">Targeted Ads & Retargeting</div>
                </div>
              </button>

              <div className="md:col-span-3 flex justify-end pt-2">
                <button
                  onClick={handleSaveCustom}
                  className="text-[11px] font-bold text-solar-orange hover:text-white transition-colors flex items-center gap-1"
                >
                  Save Selection <span className="text-lg">→</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;

