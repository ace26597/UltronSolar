"use client";

import { CTA_DICTIONARY, CtaVariant } from '@/config/ctaConfig';

interface CtaButtonProps {
  ctaId: string;
  variantOverride?: Partial<CtaVariant>;
  trackEventName?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  showSubtext?: boolean;
}

export default function CtaButton({
  ctaId,
  variantOverride,
  trackEventName,
  className = '',
  variant = 'primary',
  showSubtext = false,
}: CtaButtonProps) {
  const cta = CTA_DICTIONARY[ctaId];

  if (!cta) {
    console.warn(`CTA with id "${ctaId}" not found in dictionary`);
    return null;
  }

  // Merge override props
  const finalCta: CtaVariant = { ...cta, ...variantOverride };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Track analytics event
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: trackEventName || 'cta_click',
        cta_id: finalCta.id,
        cta_label: finalCta.label,
        cta_audience: finalCta.audience,
        cta_intent: finalCta.intent,
      });
    }

    // Handle scrolling or navigation
    if (finalCta.scrollToId) {
      e.preventDefault();
      const element = document.getElementById(finalCta.scrollToId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    // If href is provided and no scrollToId, let default anchor behavior handle it
  };

  // Determine button styles based on variant
  const getButtonClasses = () => {
    const baseClasses = 'px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1';
    
    switch (variant) {
      case 'primary':
        return `${baseClasses} bg-solar-red text-white hover:bg-solar-red-dark`;
      case 'secondary':
        return `${baseClasses} bg-transparent border-2 border-white text-white hover:bg-white hover:text-navy-dark`;
      case 'outline':
        return `${baseClasses} bg-transparent border-2 border-solar-red text-solar-red hover:bg-solar-red hover:text-white`;
      default:
        return `${baseClasses} bg-solar-red text-white hover:bg-solar-red-dark`;
    }
  };

  const buttonElement = (
    <a
      href={finalCta.href || (finalCta.scrollToId ? `#${finalCta.scrollToId}` : '#contact')}
      onClick={handleClick}
      className={`${getButtonClasses()} ${className}`}
    >
      {finalCta.label}
    </a>
  );

  if (showSubtext && finalCta.subtext) {
    return (
      <div className="flex flex-col items-center gap-2">
        {buttonElement}
        <p className="text-sm text-gray-600 dark:text-gray-300 text-center max-w-md">
          {finalCta.subtext}
        </p>
      </div>
    );
  }

  return buttonElement;
}

