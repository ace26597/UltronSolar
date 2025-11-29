export type CtaAudience = 'residential' | 'commercial' | 'industrial' | 'agriculture' | 'generic';

export type CtaIntent = 'quote' | 'consultation' | 'callback' | 'learn_more';

export interface CtaVariant {
  id: string; // e.g. 'hero_residential_quote_en'
  label: string; // button text
  subtext?: string; // small microcopy under or next to button
  audience: CtaAudience;
  intent: CtaIntent;
  href?: string;
  scrollToId?: string; // for scrolling to forms/sections
  icon?: string; // optional icon name
  language?: 'en' | 'mr' | 'hi';
}

export interface CtaDictionary {
  [id: string]: CtaVariant;
}

export const CTA_DICTIONARY: CtaDictionary = {
  // Hero / generic - English
  hero_residential_quote_en: {
    id: 'hero_residential_quote_en',
    label: 'Get Home Solar Quote',
    subtext: 'Estimate your rooftop solar cost and monthly savings in Dhule & North Maharashtra.',
    audience: 'residential',
    intent: 'quote',
    scrollToId: 'contact',
    language: 'en',
  },
  hero_commercial_assessment_en: {
    id: 'hero_commercial_assessment_en',
    label: 'Book Commercial Site Visit',
    subtext: 'For shops, offices, and small industries who want lower electricity bills.',
    audience: 'commercial',
    intent: 'consultation',
    scrollToId: 'contact',
    language: 'en',
  },
  // Residential section - English
  residential_quote_en: {
    id: 'residential_quote_en',
    label: 'Get Residential Solar Quote',
    subtext: 'Typical homes save 60–90% on light bills after switching to rooftop solar.',
    audience: 'residential',
    intent: 'quote',
    scrollToId: 'contact',
    language: 'en',
  },
  // Commercial / industrial section - English
  commercial_quote_en: {
    id: 'commercial_quote_en',
    label: 'Compare Your Current Bill',
    subtext: 'Share your last 3 months\' bills and we\'ll send a simple solar saving report.',
    audience: 'commercial',
    intent: 'quote',
    scrollToId: 'contact',
    language: 'en',
  },
  // Agriculture / solar pump section - English
  agriculture_pump_en: {
    id: 'agriculture_pump_en',
    label: 'Talk About Solar Pump',
    subtext: 'Farm-friendly solutions for borewell pumps, farmhouses and shed roofs.',
    audience: 'agriculture',
    intent: 'consultation',
    scrollToId: 'contact',
    language: 'en',
  },
  // Generic fallback - English
  generic_callback_en: {
    id: 'generic_callback_en',
    label: 'Request a Callback',
    subtext: 'Share your number and preferred time; our team will call you within 24 hours.',
    audience: 'generic',
    intent: 'callback',
    scrollToId: 'contact',
    language: 'en',
  },
  // Hero / generic - Marathi
  hero_residential_quote_mr: {
    id: 'hero_residential_quote_mr',
    label: 'घराबाहेर सोलर कोट मिळवा',
    subtext: 'धुळे आणि उत्तर महाराष्ट्रातील घरांसाठी अंदाजे खर्च आणि बचत समजून घ्या.',
    audience: 'residential',
    intent: 'quote',
    scrollToId: 'contact',
    language: 'mr',
  },
  hero_commercial_assessment_mr: {
    id: 'hero_commercial_assessment_mr',
    label: 'कमर्शियल साइट व्हिजिट बुक करा',
    subtext: 'दुकान, ऑफिस किंवा लहान उद्योगांसाठी सोलर बचत रिपोर्ट मिळवा.',
    audience: 'commercial',
    intent: 'consultation',
    scrollToId: 'contact',
    language: 'mr',
  },
  // Residential section - Marathi
  residential_quote_mr: {
    id: 'residential_quote_mr',
    label: 'घरासाठी सोलर कोट मागवा',
    subtext: 'बहुतांश घरांचे वीज बिल 60–90% पर्यंत कमी होते.',
    audience: 'residential',
    intent: 'quote',
    scrollToId: 'contact',
    language: 'mr',
  },
  // Commercial / industrial section - Marathi
  commercial_quote_mr: {
    id: 'commercial_quote_mr',
    label: 'तुमच्या बिलाची तुलना करा',
    subtext: 'गेल्या 3 महिन्यांची बिले सामायिक करा आणि आम्ही सोलर बचत रिपोर्ट पाठवू.',
    audience: 'commercial',
    intent: 'quote',
    scrollToId: 'contact',
    language: 'mr',
  },
  // Agriculture / solar pump section - Marathi
  agriculture_pump_mr: {
    id: 'agriculture_pump_mr',
    label: 'सोलर पंप बद्दल बोला',
    subtext: 'बोरवेल पंप, फार्महाऊस आणि शेड छतांसाठी शेत-मैत्रीपूर्ण उपाय.',
    audience: 'agriculture',
    intent: 'consultation',
    scrollToId: 'contact',
    language: 'mr',
  },
  // Generic fallback - Marathi
  generic_callback_mr: {
    id: 'generic_callback_mr',
    label: 'कॉल बॅक मागवा',
    subtext: 'तुमचा मोबाईल नंबर आणि वेळ द्या; आमची टीम 24 तासांत कॉल करेल.',
    audience: 'generic',
    intent: 'callback',
    scrollToId: 'contact',
    language: 'mr',
  },
};

