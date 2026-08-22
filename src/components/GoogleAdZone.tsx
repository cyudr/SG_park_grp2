import React, { useEffect, useRef } from 'react';

export type AdZoneFormat = 'leaderboard' | 'rectangle' | 'banner' | 'in-feed';

interface GoogleAdZoneProps {
  format?: AdZoneFormat;
  adSlot?: string;
  adClient?: string;
  className?: string;
  id?: string;
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export const GoogleAdZone: React.FC<GoogleAdZoneProps> = ({
  format = 'leaderboard',
  adSlot = '8923471029',
  adClient = 'ca-pub-8369709738621970',
  className = '',
  id = 'google-ad-zone'
}) => {
  const adRef = useRef<HTMLModElement | null>(null);
  const isPushedRef = useRef(false);

  // Safely trigger Google AdSense script when client ID is present
  useEffect(() => {
    if (adClient && !isPushedRef.current) {
      try {
        if (typeof window !== 'undefined') {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          isPushedRef.current = true;
        }
      } catch (err) {
        console.warn('Google AdSense render notice:', err);
      }
    }
  }, [adClient, adSlot]);

  // Dimensions based on format to prevent Cumulative Layout Shift (CLS)
  const getContainerStyles = () => {
    switch (format) {
      case 'rectangle':
        return 'w-full max-w-[340px] min-h-[250px]';
      case 'banner':
      case 'leaderboard':
        return 'w-full max-w-5xl min-h-[90px]';
      case 'in-feed':
        return 'w-full min-h-[100px]';
      default:
        return 'w-full min-h-[90px]';
    }
  };

  const isLiveClient = adClient && !adClient.includes('ca-pub-XXXXXXXX');

  return (
    <aside 
      className={`relative my-5 flex flex-col items-center justify-center clear-both ${className}`} 
      id={id}
      aria-label="Advertisement"
    >
      {/* Google AdSense Compliant Label (Strictly "ADVERTISEMENT" per Google policy) */}
      <div className="w-full flex items-center justify-between px-2 mb-1.5 select-none">
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#78887e]">
          ADVERTISEMENT
        </span>
      </div>

      {/* Ad Container Box with Clear Separation */}
      <div
        className={`${getContainerStyles()} border border-[#d6ded8] bg-[#f8faf8] rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all relative overflow-hidden shadow-2xs`}
      >
        {isLiveClient ? (
          // Live Google AdSense Container
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', minHeight: '90px' }}
            data-ad-client={adClient}
            data-ad-slot={adSlot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        ) : (
          // Eco & Nature Parks Sponsor Demonstration Unit (Compliant Placeholder)
          <>
            <div className="absolute top-0 right-0 bg-[#e7f0e9] text-[#005235] text-[9px] font-bold px-2.5 py-0.5 rounded-bl-lg tracking-wider select-none border-b border-l border-[#c1d0c4]/40">
              Sponsored
            </div>

            <div className="flex items-center gap-3.5 z-10 w-full sm:w-auto">
              <div className="w-12 h-12 rounded-xl bg-[#006b47]/10 flex items-center justify-center shrink-0 text-[#006b47]">
                <span className="material-symbols-outlined text-[26px]">forest</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-[#191c1a] leading-snug">
                  NParks City in Nature • SG Green Plan 2030
                </span>
                <span className="text-[11px] text-[#556258] mt-0.5 line-clamp-1">
                  Explore 300+ km of park connectors, nature ways, and urban green spaces across Singapore.
                </span>
                <a 
                  href="https://www.nparks.gov.sg" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[10px] text-[#00629d] hover:underline font-semibold mt-1 flex items-center gap-1"
                >
                  <span>www.nparks.gov.sg</span>
                  <span className="material-symbols-outlined text-[10px]">open_in_new</span>
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 z-10 w-full sm:w-auto justify-end">
              <a
                href="https://www.nparks.gov.sg"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 bg-[#006b47] text-white text-xs font-semibold rounded-lg hover:bg-[#005235] transition-colors shadow-xs flex items-center gap-1 cursor-pointer"
              >
                <span>Learn More</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </a>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};

