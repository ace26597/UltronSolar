// Extend Window interface for Google Analytics dataLayer
declare global {
  interface Window {
    dataLayer?: Array<Record<string, any>>;
  }
}

export {};

