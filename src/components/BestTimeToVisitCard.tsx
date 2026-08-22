import React from 'react';
import { Park } from '../types';

interface BestTimeToVisitCardProps {
  park: Park;
  onOpenPlanModal: () => void;
}

export const BestTimeToVisitCard: React.FC<BestTimeToVisitCardProps> = ({
  park,
  onOpenPlanModal
}) => {
  return (
    <div 
      className="glass-card rounded-2xl p-5 sm:p-6 flex flex-col justify-between h-full min-h-[220px] shadow-xs border border-[#bdcac0]/40 bg-white/95"
      id="best-time-visit-card"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-fluid-card-title font-bold text-[#006b47] flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px] text-[#006b47]">
              directions_walk
            </span>
            <span>Best Time to Visit</span>
          </h2>
          <span className="text-[11px] font-bold text-[#005235] bg-[#eef7f1] px-2.5 py-0.5 rounded-full border border-[#006b47]/20">
            {park.bestTime.start} - {park.bestTime.end}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-[#3e4942] leading-relaxed">
          Conditions are ideal for walking and jogging between{' '}
          <strong className="text-[#181c1b] font-bold">
            {park.bestTime.start} and {park.bestTime.end}
          </strong>{' '}
          today with lower humidity and refreshing tropical park breezes.
        </p>
      </div>

      {/* Plan Visit Action Button */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
        <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
          Optimal shade & breeze window
        </span>
        <button 
          onClick={onOpenPlanModal}
          className="w-full sm:w-auto bg-[#006b47] hover:bg-[#005235] text-white px-5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-2xs hover:shadow-xs active:scale-95 whitespace-nowrap cursor-pointer ml-auto"
          id="plan-visit-action-btn"
        >
          Plan Visit
        </button>
      </div>
    </div>
  );
};
