import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Park } from '../types';

interface PlanVisitModalProps {
  park: Park;
  isOpen: boolean;
  onClose: () => void;
}

export const PlanVisitModal: React.FC<PlanVisitModalProps> = ({ park, isOpen, onClose }) => {
  const [selectedActivity, setSelectedActivity] = useState('jogging');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(park.bestTime.start);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const activities = [
    { id: 'jogging', label: 'Walking & Jogging', icon: 'directions_run', suitability: '95% Ideal (Cool breeze)' },
    { id: 'cycling', label: 'Cycling & Skating', icon: 'pedal_bike', suitability: '90% Great' },
    { id: 'picnic', label: 'Lawn Picnic', icon: 'deck', suitability: '85% Pleasant before 16:00' },
    { id: 'photography', label: 'Wildlife & Nature Photo', icon: 'photo_camera', suitability: '92% Golden Hour Light' },
    { id: 'dogwalk', label: 'Dog Walking', icon: 'pets', suitability: '94% Pavement is cool' }
  ];

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  return createPortal(
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      id="plan-visit-modal-backdrop"
    >
      <div 
        className="glass-card bg-white/95 max-w-lg w-full rounded-2xl shadow-2xl overflow-hidden border border-white/80 p-6 sm:p-7 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        id="plan-visit-modal-content"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#e0e3e1]">
          <div className="flex items-center gap-2 text-[#006b47]">
            <span className="material-symbols-outlined text-[24px]">calendar_month</span>
            <h2 className="text-xl font-bold text-[#006b47]">Plan Your Visit</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-[#6e7a71] hover:text-[#181c1b] p-1 rounded-full hover:bg-[#ebefed] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Park Info */}
        <div className="my-4 p-3.5 bg-[#f1f4f2] rounded-xl flex items-center justify-between">
          <div>
            <div className="text-xs text-[#6e7a71] font-semibold uppercase tracking-wider">Target Destination</div>
            <div className="text-base font-bold text-[#181c1b]">{park.name}</div>
          </div>
          <div className="text-right">
            <span className="bg-[#71dba6]/50 text-[#005235] px-2.5 py-0.5 rounded-full text-xs font-bold">
              {park.currentTemp}°C • {park.condition}
            </span>
          </div>
        </div>

        {/* Activity Selection */}
        <div className="mb-4">
          <label className="block text-xs font-bold text-[#3e4942] uppercase tracking-wider mb-2">
            Select Planned Activity
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {activities.map((act) => (
              <button
                key={act.id}
                onClick={() => setSelectedActivity(act.id)}
                className={`p-2.5 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                  selectedActivity === act.id
                    ? 'border-[#006b47] bg-[#e6f4ea] text-[#006b47]'
                    : 'border-[#e0e3e1] bg-white/70 text-[#3e4942] hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <span className="material-symbols-outlined text-[16px]">{act.icon}</span>
                  <span className="truncate">{act.label}</span>
                </div>
                <div className="text-[10px] text-[#6e7a71]">{act.suitability}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Optimal Time Window Highlight */}
        <div className="mb-4 p-3 bg-[#cfe5ff]/40 border border-[#98cbff] rounded-xl text-xs text-[#003558]">
          <div className="font-bold flex items-center gap-1 text-[#00629d] mb-0.5">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            Recommended Window Today: {park.bestTime.start} – {park.bestTime.end}
          </div>
          <div>Gentle breezes and low UV index (below 3) make this interval optimal for outdoor recreation.</div>
        </div>

        {/* Packing Checklist */}
        <div className="mb-5">
          <div className="text-xs font-bold text-[#3e4942] uppercase tracking-wider mb-2">
            Suggested Tropical Pack List
          </div>
          <div className="flex flex-wrap gap-1.5 text-xs">
            <span className="bg-[#e6e9e7] px-2.5 py-1 rounded-md text-[#181c1b] flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#00629d]">water_drop</span> 750ml Hydration
            </span>
            <span className="bg-[#e6e9e7] px-2.5 py-1 rounded-md text-[#181c1b] flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#9b6c49]">wb_sunny</span> SPF 30+ Lotion
            </span>
            <span className="bg-[#e6e9e7] px-2.5 py-1 rounded-md text-[#181c1b] flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#006b47]">umbrella</span> Compact Rain Poncho
            </span>
            <span className="bg-[#e6e9e7] px-2.5 py-1 rounded-md text-[#181c1b] flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#3e4942]">pest_control</span> Bug Repellent
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#e0e3e1]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-[#6e7a71] hover:bg-[#f1f4f2] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-[#006b47] hover:bg-[#00875a] text-white px-5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isSaved ? 'check' : 'bookmark'}
            </span>
            <span>{isSaved ? 'Saved to Schedule!' : 'Save Visit Advisory'}</span>
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
};
