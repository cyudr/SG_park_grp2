import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    DISQUS?: {
      reset: (options: {
        reload: boolean;
        config?: (this: any) => void;
      }) => void;
    };
    DISQUSWIDGETS?: {
      getCount: () => void;
    };
    disqus_config?: (this: any) => void;
    disqus_shortname?: string;
  }
}

interface DisqusThreadProps {
  pageUrl?: string;
  pageIdentifier: string;
  pageTitle?: string;
}

export const DisqusThread: React.FC<DisqusThreadProps> = ({
  pageUrl,
  pageIdentifier,
  pageTitle = 'Talk to us - SG ParkWeather'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use a canonical URL for discussion
  const currentUrl = pageUrl || (typeof window !== 'undefined' ? `${window.location.origin}/talk-to-us` : 'https://sg-parkweather.live/talk-to-us');

  useEffect(() => {
    window.disqus_shortname = 'goers';

    const configureDisqus = function (this: any) {
      this.page = this.page || {};
      this.page.url = currentUrl;
      this.page.identifier = pageIdentifier;
      this.page.title = pageTitle;
    };

    window.disqus_config = configureDisqus;

    const loadOrResetDisqus = () => {
      if (window.DISQUS) {
        try {
          window.DISQUS.reset({
            reload: true,
            config: configureDisqus
          });
        } catch (err) {
          console.warn('Disqus reset error:', err);
        }
      } else {
        const disqusScriptId = 'dsq-embed-scr';
        let script = document.getElementById(disqusScriptId) as HTMLScriptElement | null;
        if (!script) {
          script = document.createElement('script');
          script.id = disqusScriptId;
          script.src = 'https://goers.disqus.com/embed.js';
          script.setAttribute('data-timestamp', String(+new Date()));
          script.async = true;
          (document.head || document.body).appendChild(script);
        }
      }
    };

    // Small delay ensures #disqus_thread is fully attached in the React DOM tree
    const timer = setTimeout(() => {
      loadOrResetDisqus();
    }, 50);

    // Refresh comment counts
    try {
      if (window.DISQUSWIDGETS) {
        window.DISQUSWIDGETS.getCount();
      }
    } catch {
      // ignore
    }

    return () => {
      clearTimeout(timer);
    };
  }, [currentUrl, pageIdentifier, pageTitle]);

  return (
    <div className="w-full bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-xs" id="disqus-container">
      {/* Target Container for Disqus Comments */}
      <div id="disqus_thread" ref={containerRef} className="min-h-[340px]"></div>

      {/* Noscript fallback */}
      <noscript>
        Please enable JavaScript to view the{' '}
        <a href="https://disqus.com/?ref_noscript" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline">
          comments powered by Disqus.
        </a>
      </noscript>
    </div>
  );
};
