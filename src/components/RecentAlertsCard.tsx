import React from 'react';
import { ParkAlert } from '../types';

interface RecentAlertsCardProps {
  alerts: ParkAlert[];
  onViewAllAlerts: () => void;
  onOpenSafety?: (alert?: ParkAlert) => void;
}

export const RecentAlertsCard: React.FC<RecentAlertsCardProps> = ({ alerts, onViewAllAlerts, onOpenSafety }) => {
  if (!alerts || alerts.length === 0) {
    return (
      <div 
        className="glass-card rounded-2xl p-5 sm:p-6 border border-[#c1d0c4]/60 shadow-xs bg-white/95"
        id="recent-alerts-card"
      >
        <h2 className="text-fluid-card-title font-bold text-[#006b47] mb-1.5 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#006b47] text-[22px]">check_circle</span>
          <span>Recent Weather Alerts</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#3e4942]">No active weather warnings. Conditions are safe and great for outdoor recreation!</p>
      </div>
    );
  }

  return (
    <div 
      className="glass-card rounded-2xl p-5 sm:p-6 border border-red-200/80 shadow-xs bg-white/95"
      id="recent-alerts-card"
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-fluid-card-title font-bold text-[#ba1a1a] flex items-center gap-2">
          <span className="material-symbols-outlined text-[#ba1a1a] text-[22px]">warning</span>
          <span>Recent Alerts</span>
        </h2>
        <div className="flex items-center gap-2">
          {onOpenSafety && (
            <button
              onClick={() => onOpenSafety()}
              className="text-xs font-bold text-red-700 hover:bg-red-100 cursor-pointer bg-red-50 px-2.5 py-1 rounded-lg border border-red-300"
            >
              Safety Measures
            </button>
          )}
          <button
            onClick={onViewAllAlerts}
            className="text-xs font-bold text-[#ba1a1a] hover:underline cursor-pointer bg-red-50 px-2.5 py-1 rounded-lg border border-red-200"
          >
            All Alerts
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        {alerts.map((alert) => (
          <div 
            key={alert.id}
            onClick={() => onOpenSafety ? onOpenSafety(alert) : onViewAllAlerts()}
            className="bg-[#fff5f5] hover:bg-[#ffebeb] p-3 rounded-xl cursor-pointer transition-all border border-red-200/70"
          >
            <h3 className="text-xs sm:text-sm font-bold text-[#93000a]">
              {alert.title}
            </h3>
            <p className="text-xs text-[#93000a]/90 mt-1 leading-snug">
              {alert.description}
            </p>
            <div className="mt-2 flex items-center justify-between text-[11px] font-semibold text-[#93000a]/80">
              <span>Time: {alert.timeWindow}</span>
              <span className="flex items-center gap-0.5 text-red-700 font-bold">
                Safety Measures <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
