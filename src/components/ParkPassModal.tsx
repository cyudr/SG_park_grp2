import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Park } from '../types';

interface ParkPassModalProps {
  park: Park;
  isOpen: boolean;
  onClose: () => void;
}

export const ParkPassModal: React.FC<ParkPassModalProps> = ({ park, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const targetUrl = park.nparksUrl || `https://www.nparks.gov.sg/visit/parks/park-detail/${park.id}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(targetUrl)}&bgcolor=f7faf8&color=005235`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${park.lat},${park.lng}`;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return createPortal(
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      id="park-pass-modal-backdrop"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="glass-card bg-white max-w-lg w-full rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200 text-slate-900 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
        id="park-pass-modal-content"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#005235] via-[#006b47] to-emerald-900 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-emerald-200">
              <span className="material-symbols-outlined text-[24px]">qr_code_2</span>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold leading-tight">Digital Park Pass & Guide</h2>
              <p className="text-xs text-emerald-100">{park.name} • {park.region} Region</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          
          {/* Scannable Pass Box */}
          <div className="p-4 bg-[#f4faf6] border-2 border-dashed border-emerald-300 rounded-2xl flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="bg-white p-2 rounded-xl shadow-xs border border-emerald-100 shrink-0">
              <img 
                src={qrCodeUrl}
                alt={`${park.name} QR Trail Pass`}
                className="w-28 h-28 object-contain rounded-lg"
                loading="lazy"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[#006b47] font-bold text-sm">
                <span className="material-symbols-outlined text-base">verified</span>
                <span>Active Trail Pass</span>
              </div>
              <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                Scan with your phone camera on trailheads or kiosk checkpoints to open the official NParks guide and trail map.
              </p>
              <div className="flex flex-wrap gap-2 mt-2.5 justify-center sm:justify-start">
                <button
                  onClick={handleCopyLink}
                  className="px-2.5 py-1 bg-white hover:bg-emerald-50 text-[#006b47] border border-emerald-200 rounded-lg font-semibold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">{copied ? 'check' : 'content_copy'}</span>
                  <span>{copied ? 'Link Copied!' : 'Copy Guide Link'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Action Navigation Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-800 hover:text-emerald-900 transition-colors flex items-center gap-2 font-semibold text-xs"
            >
              <span className="material-symbols-outlined text-emerald-700 text-lg">directions</span>
              <span>Open in Google Maps</span>
              <span className="material-symbols-outlined text-xs ml-auto">open_in_new</span>
            </a>

            {park.nparksUrl && (
              <a
                href={park.nparksUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-800 hover:text-emerald-900 transition-colors flex items-center gap-2 font-semibold text-xs"
              >
                <span className="material-symbols-outlined text-emerald-700 text-lg">park</span>
                <span>Official NParks Portal</span>
                <span className="material-symbols-outlined text-xs ml-auto">open_in_new</span>
              </a>
            )}
          </div>

          {/* Park Summary */}
          <div>
            <div className="font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
              Park Overview & Highlights
            </div>
            <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
              {park.summary}
            </p>
          </div>

          {/* Facilities & Shelters */}
          {park.facilities && park.facilities.length > 0 && (
            <div>
              <div className="font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1.5">
                Key Amenities & Facilities
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {park.facilities.map((fac, i) => (
                  <div key={i} className="flex items-center gap-1.5 p-2 bg-emerald-50/60 border border-emerald-100 rounded-lg">
                    <span className="material-symbols-outlined text-[16px] text-[#006b47] shrink-0">{fac.icon}</span>
                    <span className="truncate text-slate-800 font-medium">{fac.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Emergency Hotlines */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div className="font-bold text-slate-700 uppercase tracking-wider text-[10px] mb-1">
              Singapore Park Emergency Hotlines
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-1 text-slate-700">
              <span>National Parks Board Helpline: <strong className="text-emerald-800">1800-471-7300</strong></span>
              <span>Emergency Ambulance / Police: <strong className="text-emerald-800">995 / 999</strong></span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 bg-[#006b47] hover:bg-[#005235] text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-xs"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
};
