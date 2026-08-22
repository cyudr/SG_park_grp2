import React from 'react';
import { Park } from '../types';
import { DisqusThread } from './DisqusThread';

interface TalkToUsViewProps {
  currentPark: Park;
  onSelectPark?: (parkId: string) => void;
}

export const CommunityView: React.FC<TalkToUsViewProps> = ({ currentPark }) => {
  const pageIdentifier = 'sg-parkweather-talk-to-us';
  const pageTitle = 'Talk to us - SG ParkWeather';

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-300" id="talk-to-us-container">
      
      {/* Talk to Us Header Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-7 flex flex-col md:flex-row justify-between items-start md:items-center gap-5 shadow-xs border border-emerald-100 bg-gradient-to-br from-white via-[#f4faf6] to-emerald-50/40">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#006b47] to-[#004d33] flex items-center justify-center text-white shadow-sm shrink-0">
            <span className="material-symbols-outlined text-[32px]">chat</span>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#005235]">
                Talk to us
              </h1>
              {/* Disqus Comment Count Badge using official count script */}
              <a 
                href="#disqus_thread" 
                data-disqus-identifier={pageIdentifier}
                className="disqus-comment-count bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200/80 transition-colors flex items-center gap-1.5"
                title="View comments count and jump to conversation"
              >
                <span className="material-symbols-outlined text-sm">forum</span>
                <span>Comments</span>
              </a>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Share feedback, report trail conditions, or connect with our team.
            </p>
          </div>
        </div>

        {/* Direct Email Action Button */}
        <div className="flex items-center gap-3 shrink-0 self-stretch md:self-auto">
          <a
            href="mailto:contact@sg-parkweather.live?subject=SG%20ParkWeather%20Inquiry%20%26%20Feedback"
            className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-[#006b47] hover:bg-[#005235] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">mail</span>
            <span>Email the Team</span>
          </a>
        </div>
      </div>

      {/* Main Grid: Discussion Thread + Contact Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Talk To Us Disqus Conversation Stream */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          
          <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2 text-xs">
              <span className="material-symbols-outlined text-emerald-700 text-lg">forum</span>
              <span className="font-semibold text-slate-700">Direct Message Board:</span>
              <strong className="text-emerald-900 font-bold">Feedback & Inquiries</strong>
            </div>

            <div className="flex items-center gap-2">
              <a 
                href="#disqus_thread"
                data-disqus-identifier={pageIdentifier}
                className="disqus-comment-count text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100"
              >
                Comments
              </a>
            </div>
          </div>

          {/* Official Disqus Embedded Thread Component */}
          <DisqusThread
            pageIdentifier={pageIdentifier}
            pageTitle={pageTitle}
          />
        </div>

        {/* Right Sidebar: Contact Cards & Official Information */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          
          {/* Quick Contact & Inquiry Channels */}
          <div className="glass-card rounded-2xl p-5 border border-emerald-100 bg-white/95 shadow-2xs">
            <h3 className="text-sm font-bold text-[#005235] flex items-center gap-2 mb-3.5">
              <span className="material-symbols-outlined text-lg text-emerald-700">contact_support</span>
              <span>How We Can Help</span>
            </h3>
            
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-[#f4faf6] border border-emerald-100/80">
                <div className="font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                  <span className="material-symbols-outlined text-emerald-700 text-base">rate_review</span>
                  <span>Suggestions & Feedback</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Ideas to improve forecasts, transport, or park guides.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                  <span className="material-symbols-outlined text-emerald-700 text-base">report_problem</span>
                  <span>Trail & Weather Reports</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Fallen trees, maintenance closures, or heavy downpours.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                  <span className="material-symbols-outlined text-emerald-700 text-base">api</span>
                  <span>Data & Partnerships</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Integration requests and API inquiries for developers.
                </p>
              </div>
            </div>
          </div>

          {/* Official Agency Hotlines & Immediate Assistance */}
          <div className="glass-card rounded-2xl p-5 border border-slate-200 bg-white shadow-2xs text-xs">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5 mb-3">
              <span className="material-symbols-outlined text-base text-red-600">emergency</span>
              <span>Emergency Park Contacts</span>
            </h3>
            
            <p className="text-slate-500 mb-3 leading-relaxed">
              For urgent safety or wildlife emergencies:
            </p>

            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-700 font-medium">NParks Helpline:</span>
                <strong className="text-emerald-800 font-bold">1800-471-7300</strong>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-700 font-medium">Ambulance / Police:</span>
                <strong className="text-emerald-800 font-bold">995 / 999</strong>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-700 font-medium">NEA 24-hr Hotline:</span>
                <strong className="text-emerald-800 font-bold">1800-225-5632</strong>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export const TalkToUsView = CommunityView;
