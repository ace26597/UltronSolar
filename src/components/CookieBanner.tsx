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

  // Register global function to reopen banner
  useEffect(() => {
    window.reopenCookieBanner = () => {
      setForceShow(true);
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
  };

  const handleRejectNonEssential = () => {
    const newState: CookieConsentState = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    setConsent(newState, 'rejected');
    setForceShow(false);
  };

  const handleSaveCustom = () => {
    const newState: CookieConsentState = {
      essential: true,
      analytics: tempState.analytics,
      marketing: tempState.marketing,
    };
    setConsent(newState, 'custom');
    setForceShow(false);
  };

  const handleClose = () => {
    setForceShow(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-2 sm:px-4 pb-[72px] md:pb-4">
      <div className="max-w-3xl w-full rounded-xl border border-gray-700 bg-gray-900/95 text-gray-100 shadow-lg p-3 sm:p-4 md:p-5">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 md:items-start">
          <div className="flex-1">
            {(forceShow || choice !== 'pending') && (
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-base md:text-lg font-semibold">
                  Cookie Preferences
                </h2>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Close cookie banner"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            {choice === 'pending' && (
              <h2 className="text-base md:text-lg font-semibold">
                We use cookies to improve your experience
              </h2>
            )}

            <p className="mt-1 text-xs md:text-sm text-gray-300">
              We use essential cookies to make this site work, and optional analytics and
              marketing cookies to understand usage and show relevant offers. You can
              change your choice any time in our privacy settings.
            </p>
            <div className="mt-3 space-y-2 text-xs md:text-sm">
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked
                  disabled
                  className="mt-0.5 accent-emerald-500"
                />
                <div>
                  <div className="font-medium">Essential</div>
                  <div className="text-gray-400">
                    Required for security and basic site functionality.
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  className="mt-0.5 accent-emerald-500"
                  checked={tempState.analytics}
                  onChange={(e) =>
                    setTempState((prev) => ({ ...prev, analytics: e.target.checked }))
                  }
                />
                <div>
                  <div className="font-medium">Analytics</div>
                  <div className="text-gray-400">
                    Helps us understand which pages are useful so we can improve them.
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  className="mt-0.5 accent-emerald-500"
                  checked={tempState.marketing}
                  onChange={(e) =>
                    setTempState((prev) => ({ ...prev, marketing: e.target.checked }))
                  }
                />
                <div>
                  <div className="font-medium">Marketing</div>
                  <div className="text-gray-400">
                    Used for remarketing (e.g. Google/Meta ads) based on your visit.
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-2 text-[11px] text-gray-400">
              Read our{' '}
              <a href="/privacy" className="underline">
                Privacy Policy
              </a>{' '}
              and{' '}
              <a href="/cookies" className="underline">
                Cookie Policy
              </a>
              .
            </p>
          </div>
          <div className="flex flex-row md:flex-col gap-2 w-full md:w-40 shrink-0">
            <button
              onClick={handleAcceptAll}
              className="flex-1 md:w-full rounded-lg bg-emerald-500 px-3 py-3 md:py-2 text-sm font-semibold text-black hover:bg-emerald-400 touch-manipulation min-h-[44px]"
            >
              Accept all
            </button>
            <button
              onClick={handleRejectNonEssential}
              className="flex-1 md:w-full rounded-lg border border-gray-600 px-3 py-3 md:py-2 text-sm text-gray-100 hover:bg-gray-800 touch-manipulation min-h-[44px]"
            >
              Essential only
            </button>
            <button
              onClick={handleSaveCustom}
              className="hidden md:block w-full rounded-lg text-xs text-gray-300 hover:text-white"
            >
              Save custom choices
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;

