"use client";

import { useLanguage } from '@/context/LanguageContext';

export default function LanguageToggle() {
  const { currentLanguage, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 border border-gray-300 rounded-lg overflow-hidden">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 text-sm font-medium transition-colors ${
          currentLanguage === 'en'
            ? 'bg-solar-red text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('mr')}
        className={`px-3 py-1.5 text-sm font-medium transition-colors ${
          currentLanguage === 'mr'
            ? 'bg-solar-red text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        मराठी
      </button>
    </div>
  );
}

