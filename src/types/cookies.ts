export type ConsentCategory = 'essential' | 'analytics' | 'marketing';

export interface CookieConsentState {
  essential: true; // always true
  analytics: boolean;
  marketing: boolean;
}

export type CookieConsentChoice = 'pending' | 'accepted' | 'rejected' | 'custom';

