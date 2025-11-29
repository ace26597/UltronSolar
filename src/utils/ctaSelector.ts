import { CTA_DICTIONARY, CtaVariant, CtaAudience } from '@/config/ctaConfig';
import { UserLanguage } from '@/context/LanguageContext';

export interface CtaContext {
  page: 'home' | 'residential' | 'commercial' | 'agriculture' | 'generic';
  audience?: CtaAudience;
  language?: UserLanguage;
  utmSource?: string | null;
  deviceType?: 'mobile' | 'desktop';
}

export function selectCta(context: CtaContext): CtaVariant {
  const lang = context.language ?? 'en';
  const audience = context.audience ?? 'generic';

  // Determine intent based on audience
  let intent: 'quote' | 'consultation' | 'callback' = 'quote';
  if (audience === 'agriculture') {
    intent = 'consultation';
  } else if (audience === 'commercial' && context.page === 'home') {
    intent = 'consultation';
  }

  // Build potential CTA IDs to try in order of preference
  const candidates: string[] = [];

  // 1) Try exact match: page + audience + intent + lang
  if (context.page === 'home') {
    if (audience === 'residential') {
      candidates.push(`hero_residential_quote_${lang}`);
    } else if (audience === 'commercial') {
      candidates.push(`hero_commercial_assessment_${lang}`);
    }
  } else if (context.page === 'residential') {
    candidates.push(`residential_quote_${lang}`);
  } else if (context.page === 'commercial') {
    candidates.push(`commercial_quote_${lang}`);
  } else if (context.page === 'agriculture') {
    candidates.push(`agriculture_pump_${lang}`);
  }

  // 2) Try audience + intent + lang
  if (audience === 'residential') {
    candidates.push(`residential_quote_${lang}`);
  } else if (audience === 'commercial') {
    candidates.push(`commercial_quote_${lang}`);
  } else if (audience === 'agriculture') {
    candidates.push(`agriculture_pump_${lang}`);
  }

  // 3) Try generic + lang
  candidates.push(`generic_callback_${lang}`);

  // 4) Final fallback: generic English
  candidates.push('generic_callback_en');

  // Find first matching CTA
  for (const candidateId of candidates) {
    const cta = CTA_DICTIONARY[candidateId];
    if (cta) {
      return cta;
    }
  }

  // Ultimate fallback (should never reach here if config is correct)
  return CTA_DICTIONARY['generic_callback_en'] || {
    id: 'fallback',
    label: 'Get Free Quote',
    audience: 'generic',
    intent: 'quote',
    scrollToId: 'contact-form',
    language: 'en',
  };
}

