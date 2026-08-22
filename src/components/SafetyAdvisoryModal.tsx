import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Park, ParkAlert } from '../types';

interface SafetyAdvisoryModalProps {
  park: Park;
  isOpen: boolean;
  onClose: () => void;
  selectedAlert?: ParkAlert | null;
}

export const SafetyAdvisoryModal: React.FC<SafetyAdvisoryModalProps> = ({
  park,
  isOpen,
  onClose,
  selectedAlert
}) => {
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

  return createPortal(
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      id="safety-advisory-modal-backdrop"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="glass-card bg-white max-w-xl w-full rounded-3xl shadow-2xl overflow-hidden border border-red-200 animate-in zoom-in-95 duration-200 text-slate-900 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
        id="safety-advisory-modal-content"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-800 via-red-700 to-amber-900 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-amber-200">
              <span className="material-symbols-outlined text-[26px]">health_and_safety</span>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold leading-tight flex items-center gap-2">
                <span>Park Safety Measures & Advisory</span>
                <span className="text-[10px] bg-red-950/60 px-2 py-0.5 rounded-full uppercase tracking-wider text-amber-200 border border-red-400/40">
                  MSS & NParks
                </span>
              </h2>
              <p className="text-xs text-red-100 mt-0.5">{park.name} • Tropical Weather Protection</p>
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
          
          {/* Active Context Alert Banner (if opened from an alert) */}
          {selectedAlert && (
            <div className="p-3.5 bg-red-50 border-l-4 border-red-600 rounded-xl">
              <div className="flex items-center gap-2 font-bold text-sm text-red-900 mb-1">
                <span className="material-symbols-outlined text-red-600 text-lg">warning</span>
                <span>Active Warning: {selectedAlert.title}</span>
              </div>
              <p className="text-red-800 leading-relaxed text-xs">
                {selectedAlert.description}
              </p>
              <div className="mt-2 text-[11px] font-semibold text-red-700">
                Time Window: {selectedAlert.timeWindow}
              </div>
            </div>
          )}

          {/* 1. Lightning Protocol (Cat 1 Warning & 30/30 Rule) */}
          <div className="p-4 bg-[#fff8f6] border border-red-200/80 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-red-900">
              <span className="material-symbols-outlined text-amber-600 text-xl">bolt</span>
              <span>1. Lightning Protection (Singapore 30/30 Rule)</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Singapore experiences over 170 thunderstorm days annually. When an active lightning alert sounds or thunder is heard:
            </p>
            <ul className="space-y-1.5 pl-2 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-amber-600 text-sm shrink-0 mt-0.5">check_circle</span>
                <span><strong>Immediately seek shelter</strong> inside fully enclosed buildings or designated park pavilions with lightning conductors.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-red-600 text-sm shrink-0 mt-0.5">cancel</span>
                <span><strong>DO NOT</strong> seek shelter under lone tall trees, metal canopies, open gazebos without conductors, or open beach shores.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-slate-600 text-sm shrink-0 mt-0.5">schedule</span>
                <span>Wait at least <strong>30 minutes</strong> after the last roll of thunder before resuming outdoor activities.</span>
              </li>
            </ul>
          </div>

          {/* 2. Flash Floods & Rising Waterway Safety */}
          <div className="p-4 bg-[#f0f8ff] border border-sky-200 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-sky-900">
              <span className="material-symbols-outlined text-sky-600 text-xl">flood</span>
              <span>2. Naturalized Canals & Waterways (PUB Warning)</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              In parklands with naturalized streams (e.g. Bishan-AMK Park, Kallang River, Jurong Lake):
            </p>
            <ul className="space-y-1 pl-2 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-sky-600 text-sm shrink-0 mt-0.5">info</span>
                <span>Water levels in retention channels can rise by 2 to 3 meters in under 10 minutes during intense tropical convective storms.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-sky-600 text-sm shrink-0 mt-0.5">warning</span>
                <span>When audio-visual flood warning sirens sound or flashing strobe beacons activate, <strong>move up to elevated embankments immediately</strong>.</span>
              </li>
            </ul>
          </div>

          {/* 3. Tropical Heat Stress & Hydration */}
          <div className="p-4 bg-[#fffbf0] border border-amber-200 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
              <span className="material-symbols-outlined text-amber-600 text-xl">thermostat</span>
              <span>3. Heat Stress Index (WBGT) & Sun Protection</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              High ambient temperatures combined with 80%+ tropical relative humidity increase risk of heat exhaustion and cramps.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <div className="p-2.5 bg-white rounded-xl border border-amber-100">
                <span className="font-bold text-amber-900 block mb-0.5">Hydration Routine</span>
                <p className="text-slate-600">Drink 250ml of water or isotonic fluids every 20-30 minutes, even if you do not feel thirsty.</p>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-amber-100">
                <span className="font-bold text-amber-900 block mb-0.5">Sun & UV Shielding</span>
                <p className="text-slate-600">Apply broad-spectrum SPF50+ sunscreen, wear UV-rated sunglasses and a wide-brimmed hat.</p>
              </div>
            </div>
          </div>

          {/* 4. Designated Shelters & Facilities for this Park */}
          <div className="p-4 bg-[#f4faf6] border border-emerald-200 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-900">
                <span className="material-symbols-outlined text-emerald-700 text-xl">roofing</span>
                <span>4. Designated Shelters & Amenities at {park.name}</span>
              </div>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                NParks Verified
              </span>
            </div>
            <p className="text-slate-600">
              Visitor centers, park pavilions, F&B hubs, and restrooms equipped with lightning protection:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
              {park.facilities && park.facilities.length > 0 ? (
                park.facilities.map((fac, idx) => (
                  <div key={idx} className="p-2 bg-white rounded-xl border border-emerald-100 flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-700 text-base">{fac.icon}</span>
                    <span className="font-medium text-slate-800 truncate">{fac.name}</span>
                  </div>
                ))
              ) : (
                <>
                  <div className="p-2 bg-white rounded-xl border border-emerald-100 flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-700 text-base">roofing</span>
                    <span className="font-medium text-slate-800">Park Pavilions</span>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-emerald-100 flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-700 text-base">wc</span>
                    <span className="font-medium text-slate-800">Restroom Blocks</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* 5. 24/7 Singapore Emergency Contacts */}
          <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-amber-400">
              <span className="material-symbols-outlined text-amber-400 text-xl">emergency</span>
              <span>24/7 Singapore Park Emergency Numbers</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
              <div className="p-2.5 bg-white/10 rounded-xl">
                <span className="text-slate-300 block text-[11px]">NParks 24-hr Helpline / Fallen Trees:</span>
                <span className="text-emerald-300 font-bold text-sm font-mono">1800-471-7300</span>
              </div>
              <div className="p-2.5 bg-white/10 rounded-xl">
                <span className="text-slate-300 block text-[11px]">SCDF Ambulance / Medical Emergency:</span>
                <span className="text-red-300 font-bold text-sm font-mono">995</span>
              </div>
              <div className="p-2.5 bg-white/10 rounded-xl">
                <span className="text-slate-300 block text-[11px]">Singapore Police Force Emergency:</span>
                <span className="text-sky-300 font-bold text-sm font-mono">999</span>
              </div>
              <div className="p-2.5 bg-white/10 rounded-xl">
                <span className="text-slate-300 block text-[11px]">PUB 24-hr Drainage & Flood Center:</span>
                <span className="text-cyan-300 font-bold text-sm font-mono">1800-225-5782</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500">Source: NEA & NParks Safety Directives</span>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-red-700 hover:bg-red-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-xs"
          >
            I Understand
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
};
