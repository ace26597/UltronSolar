"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export type UserLanguage = 'en' | 'mr' | 'hi';

interface LanguageContextType {
  currentLanguage: UserLanguage;
  setLanguage: (lang: UserLanguage) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguageState] = useState<UserLanguage>('en');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check URL query parameter first
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get('lang') as UserLanguage | null;
      
      if (langParam && ['en', 'mr', 'hi'].includes(langParam)) {
        setCurrentLanguageState(langParam);
        localStorage.setItem('preferredLanguage', langParam);
        setIsInitialized(true);
        return;
      }

      // Check localStorage
      const storedLang = localStorage.getItem('preferredLanguage') as UserLanguage | null;
      if (storedLang && ['en', 'mr', 'hi'].includes(storedLang)) {
        setCurrentLanguageState(storedLang);
        setIsInitialized(true);
        return;
      }

      // Default to English
      setIsInitialized(true);
    }
  }, []);

  const setLanguage = (lang: UserLanguage) => {
    setCurrentLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredLanguage', lang);
      
      // Update URL without page reload
      const url = new URL(window.location.href);
      url.searchParams.set('lang', lang);
      window.history.pushState({}, '', url);
    }
  };

  // Don't render until initialized to avoid hydration mismatch
  if (!isInitialized) {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

