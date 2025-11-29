'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { CookieConsentState, CookieConsentChoice } from '@/types/cookies';

interface CookieConsentContextValue {
  state: CookieConsentState;
  choice: CookieConsentChoice;
  setConsent: (state: CookieConsentState, choice: CookieConsentChoice) => void;
}

const defaultState: CookieConsentState = {
  essential: true,
  analytics: false,
  marketing: false,
};

const CookieConsentContext = createContext<CookieConsentContextValue>({
  state: defaultState,
  choice: 'pending',
  setConsent: () => {},
});

const STORAGE_KEY = 'ultron_cookie_consent_v1';

export const CookieConsentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<CookieConsentState>(defaultState);
  const [choice, setChoice] = useState<CookieConsentChoice>('pending');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as {
          state: CookieConsentState;
          choice: CookieConsentChoice;
        };
        setState({ ...defaultState, ...parsed.state });
        setChoice(parsed.choice);
      }
    } catch (e) {
      console.error('Failed to parse stored cookie consent', e);
    }
  }, []);

  const setConsent = (newState: CookieConsentState, newChoice: CookieConsentChoice) => {
    setState(newState);
    setChoice(newChoice);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ state: newState, choice: newChoice })
      );
    }
  };

  return (
    <CookieConsentContext.Provider value={{ state, choice, setConsent }}>
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = () => useContext(CookieConsentContext);

export const useAnalyticsConsent = () => {
  const { state } = useCookieConsent();
  return state.analytics;
};

export const useMarketingConsent = () => {
  const { state } = useCookieConsent();
  return state.marketing;
};

