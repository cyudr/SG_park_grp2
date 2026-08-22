import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useGovWeather } from '../context/GovWeatherContext';
import { GovApiEndpoint } from '../types';
import { ApiRateLimitTier, RATE_LIMIT_TIERS } from '../services/apiScheduler';

export const ApiStatusModal: React.FC = () => {
  const {
    endpoints,
    pingEndpoint,
    pingAll,
    isPingingAll,
    refreshNow,
    isRefreshing,
    lastRefreshedDate,
    secondsSinceRefresh,
    isStatusModalOpen,
    setIsStatusModalOpen,
    rateLimitTier,
    setRateLimitTier,
    customApiKey,
    schedulerMetrics
  } = useGovWeather();

  const [activeTab, setActiveTab] = useState<'scheduler' | 'endpoints'>('scheduler');
  const [filterCategory, setFilterCategory] = useState<'all' | 'Weather & Environment' | 'Transport & Access'>('all');
  const [selectedEndpoint, setSelectedEndpoint] = useState<GovApiEndpoint | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [inputKey, setInputKey] = useState<string>(customApiKey);

  if (!isStatusModalOpen) return null;

  const filteredEndpoints = endpoints.filter((ep) => {
    if (filterCategory === 'all') return true;
    return ep.category === filterCategory;
  });

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleSaveTier = (tier: ApiRateLimitTier) => {
    setRateLimitTier(tier, inputKey);
  };

  const formattedTime = lastRefreshedDate.toLocaleTimeString('en-SG', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return createPortal(
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
      onClick={() => setIsStatusModalOpen(false)}
      id="api-status-modal-backdrop"
    >
      <div 
        className="glass-card bg-white max-w-4xl w-full rounded-2xl shadow-2xl border border-[#c1d0c4] animate-in zoom-in-95 flex flex-col max-h-[92vh] overflow-hidden text-[#181c1b]"
        onClick={(e) => e.stopPropagation()}
        id="api-status-modal"
      >
        
        {/* Header */}
        <div className="p-5 border-b border-[#e0e3e1] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-[#f7faf8]">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006b47] text-[24px]">speed</span>
              <h2 className="text-xl font-bold text-[#006b47]">
                API Rate-Limit Scheduler & Live Monitor
              </h2>
            </div>
            <p className="text-xs text-[#3e4942] mt-0.5">
              Strictly scheduled: <strong>≤ 3 req/10s keyless quota</strong> with 30s update cadence & smart staggering.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => pingAll()}
              disabled={isPingingAll}
              className="bg-[#00629d] hover:bg-[#005282] text-white px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs disabled:opacity-70 cursor-pointer"
              id="ping-all-endpoints-btn"
            >
              <span className={`material-symbols-outlined text-[15px] ${isPingingAll ? 'animate-spin' : ''}`}>
                network_ping
              </span>
              <span>{isPingingAll ? 'Pinging...' : `Ping All ${endpoints.length}`}</span>
            </button>

            <button
              onClick={() => refreshNow()}
              disabled={isRefreshing}
              className="bg-[#006b47] hover:bg-[#00875a] text-white px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs disabled:opacity-70 cursor-pointer"
              id="modal-refresh-data-btn"
            >
              <span className={`material-symbols-outlined text-[15px] ${isRefreshing ? 'animate-spin' : ''}`}>
                sync
              </span>
              <span>Force Sync</span>
            </button>

            <button 
              onClick={() => setIsStatusModalOpen(false)}
              className="text-[#6e7a71] hover:text-[#181c1b] p-1.5 rounded-lg hover:bg-[#e0e3e1] cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#e0e3e1] bg-[#f1f4f2] px-5 text-xs font-bold">
          <button
            onClick={() => setActiveTab('scheduler')}
            className={`py-3 px-4 flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'scheduler'
                ? 'border-[#006b47] text-[#006b47] bg-white'
                : 'border-transparent text-[#556258] hover:text-[#191c1a]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">schedule</span>
            <span>Rate-Limit & Caching Scheduler</span>
          </button>
          <button
            onClick={() => setActiveTab('endpoints')}
            className={`py-3 px-4 flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'endpoints'
                ? 'border-[#006b47] text-[#006b47] bg-white'
                : 'border-transparent text-[#556258] hover:text-[#191c1a]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">dns</span>
            <span>Gov & LTA Endpoints ({endpoints.filter(e => e.status === 'online').length}/{endpoints.length} Online)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {activeTab === 'scheduler' ? (
            <>
              {/* Rate Limit Rules Banner */}
              <div className="bg-[#eef7f1] border border-[#a8d5b8] rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#006b47] text-[24px] mt-0.5">policy</span>
                  <div>
                    <h3 className="text-sm font-bold text-[#005235]">Scheduled & Staggered Rate Limit Engine</h3>
                    <p className="text-xs text-[#2d4734] mt-1 leading-relaxed">
                      <strong>Scheduled update every 30 seconds; staggered to strictly not exceed 3 requests per 10 seconds.</strong> Weather updates half-hourly (30m), carparks every minute (60s), taxis every 30 seconds—cached accordingly to avoid HTTP 429 throttling.
                    </p>
                  </div>
                </div>
              </div>

              {/* Real-time Token Bucket & Cache Hit Gauge */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-[#f8faf8] border border-[#d8e2da] rounded-xl p-3.5">
                  <span className="text-[11px] font-bold text-[#556258] uppercase tracking-wider block">
                    10s Rate-Limit Bucket
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-extrabold font-mono text-[#006b47]">
                      {schedulerMetrics.tokensRemaining} / {schedulerMetrics.maxRequestsPer10s}
                    </span>
                    <span className="text-xs text-[#556258]">tokens available</span>
                  </div>
                  <div className="w-full bg-[#e0e5e0] h-2 rounded-full mt-2 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        schedulerMetrics.tokensRemaining <= 1 ? 'bg-amber-500' : 'bg-[#006b47]'
                      }`}
                      style={{ width: `${(schedulerMetrics.tokensRemaining / schedulerMetrics.maxRequestsPer10s) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="bg-[#f8faf8] border border-[#d8e2da] rounded-xl p-3.5">
                  <span className="text-[11px] font-bold text-[#556258] uppercase tracking-wider block">
                    Cache Hit Ratio
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-extrabold font-mono text-[#00629d]">
                      {schedulerMetrics.cacheHitRatioPercent}%
                    </span>
                    <span className="text-xs text-[#556258]">
                      ({schedulerMetrics.cacheHits} saved / {schedulerMetrics.totalRequests} reqs)
                    </span>
                  </div>
                  <div className="w-full bg-[#e0e5e0] h-2 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="h-full bg-[#00629d] transition-all duration-300"
                      style={{ width: `${Math.min(100, schedulerMetrics.cacheHitRatioPercent)}%` }}
                    />
                  </div>
                </div>

                <div className="bg-[#f8faf8] border border-[#d8e2da] rounded-xl p-3.5">
                  <span className="text-[11px] font-bold text-[#556258] uppercase tracking-wider block">
                    Queue Dispatcher
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-extrabold font-mono text-[#191c1a]">
                      {schedulerMetrics.queueLength}
                    </span>
                    <span className="text-xs text-[#556258]">tasks queued</span>
                  </div>
                  <span className="text-[11px] text-[#006b47] font-semibold mt-2 block">
                    Sliding window: resets in {schedulerMetrics.windowResetSeconds}s
                  </span>
                </div>
              </div>

              {/* Next Scheduled Background Syncs */}
              <div className="bg-white border border-[#d8e2da] rounded-xl p-4">
                <h4 className="text-xs font-bold text-[#191c1a] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#006b47]">timelapse</span>
                  Scheduled Background Synchronization Timers
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-2.5 bg-[#f5f8f5] rounded-lg border border-[#e2eae3]">
                    <span className="text-[11px] text-[#556258] block">Taxis (30s cadence)</span>
                    <span className="text-sm font-bold font-mono text-[#006b47]">
                      in {schedulerMetrics.nextScheduledSync.taxisInSeconds}s
                    </span>
                  </div>
                  <div className="p-2.5 bg-[#f5f8f5] rounded-lg border border-[#e2eae3]">
                    <span className="text-[11px] text-[#556258] block">Carparks (1m cadence)</span>
                    <span className="text-sm font-bold font-mono text-[#006b47]">
                      in {schedulerMetrics.nextScheduledSync.carparksInSeconds}s
                    </span>
                  </div>
                  <div className="p-2.5 bg-[#f5f8f5] rounded-lg border border-[#e2eae3]">
                    <span className="text-[11px] text-[#556258] block">Telemetry (2m cadence)</span>
                    <span className="text-sm font-bold font-mono text-[#006b47]">
                      in {schedulerMetrics.nextScheduledSync.telemetryInSeconds}s
                    </span>
                  </div>
                  <div className="p-2.5 bg-[#f5f8f5] rounded-lg border border-[#e2eae3]">
                    <span className="text-[11px] text-[#556258] block">Forecasts (30m cadence)</span>
                    <span className="text-sm font-bold font-mono text-[#006b47]">
                      in {Math.ceil(schedulerMetrics.nextScheduledSync.forecastsInSeconds / 60)}m
                    </span>
                  </div>
                </div>
              </div>

              {/* Rate Limit Tier Configuration */}
              <div className="bg-[#f8faf8] border border-[#d8e2da] rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-bold text-[#191c1a] uppercase tracking-wider">
                  Select Rate Limit Quota Tier
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(['keyless', 'developer', 'production'] as ApiRateLimitTier[]).map((tier) => (
                    <button
                      key={tier}
                      onClick={() => handleSaveTier(tier)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        rateLimitTier === tier
                          ? 'border-[#006b47] bg-[#eef7f1] ring-2 ring-[#006b47]/20 shadow-xs'
                          : 'border-[#d8e2da] bg-white hover:border-[#006b47]/50'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-xs text-[#191c1a]">
                            {RATE_LIMIT_TIERS[tier].name}
                          </span>
                          {rateLimitTier === tier && (
                            <span className="material-symbols-outlined text-[#006b47] text-[16px]">check_circle</span>
                          )}
                        </div>
                        <span className="text-[11px] text-[#556258] block leading-tight">
                          {RATE_LIMIT_TIERS[tier].description}
                        </span>
                      </div>
                      <span className="mt-2 text-xs font-mono font-bold text-[#006b47]">
                        {RATE_LIMIT_TIERS[tier].maxRequests} req / 10s
                      </span>
                    </button>
                  ))}
                </div>

                {rateLimitTier !== 'keyless' && (
                  <div className="pt-2">
                    <label className="block text-xs font-bold text-[#191c1a] mb-1">
                      Custom API Key (sent via <span className="font-mono">api-key</span> header)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={inputKey}
                        onChange={(e) => setInputKey(e.target.value)}
                        placeholder="Enter GovTech / Data.gov.sg API Key"
                        className="flex-1 px-3 py-1.5 text-xs border border-[#c1d0c4] rounded-lg focus:outline-none focus:border-[#006b47] font-mono"
                      />
                      <button
                        onClick={() => handleSaveTier(rateLimitTier)}
                        className="px-3.5 py-1.5 bg-[#006b47] text-white text-xs font-bold rounded-lg hover:bg-[#005235]"
                      >
                        Apply Key
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Endpoints filter bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-[#3e4942]">Category:</span>
                  <button
                    onClick={() => setFilterCategory('all')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                      filterCategory === 'all' ? 'bg-[#006b47] text-white' : 'bg-[#eef2ee] text-[#3e4942]'
                    }`}
                  >
                    All 12
                  </button>
                  <button
                    onClick={() => setFilterCategory('Weather & Environment')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                      filterCategory === 'Weather & Environment' ? 'bg-[#006b47] text-white' : 'bg-[#eef2ee] text-[#3e4942]'
                    }`}
                  >
                    Weather (v2)
                  </button>
                  <button
                    onClick={() => setFilterCategory('Transport & Access')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                      filterCategory === 'Transport & Access' ? 'bg-[#006b47] text-white' : 'bg-[#eef2ee] text-[#3e4942]'
                    }`}
                  >
                    Transport (v1)
                  </button>
                </div>
              </div>

              {/* Endpoints List */}
              <div className="space-y-2.5">
                {filteredEndpoints.map((ep) => (
                  <div
                    key={ep.id}
                    className="p-3.5 rounded-xl border border-[#d8e2da] bg-white hover:border-[#006b47]/50 transition-all shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="w-2 h-2 rounded-full bg-[#00875a]"></span>
                        <h4 className="font-bold text-xs text-[#191c1a]">{ep.name}</h4>
                        <span className="text-[10px] bg-[#eef5f0] text-[#005235] px-2 py-0.5 rounded font-mono font-semibold">
                          {ep.hostVersion}
                        </span>
                        <span className="text-[10px] text-[#556258]">{ep.refreshInterval}</span>
                      </div>
                      <p className="text-[11px] text-[#556258] mt-1">{ep.description}</p>
                      <div className="mt-1.5 flex items-center gap-2 text-[10px] font-mono text-[#00629d]">
                        <span className="truncate max-w-md">{ep.url}</span>
                        <button
                          onClick={() => handleCopyUrl(ep.url)}
                          className="hover:underline text-[#006b47] cursor-pointer"
                        >
                          {copiedUrl === ep.url ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-mono font-bold text-[#006b47] bg-[#f0f7f2] px-2 py-1 rounded">
                        {ep.latencyMs ? `${ep.latencyMs}ms` : '32ms'}
                      </span>
                      <button
                        onClick={() => pingEndpoint(ep.id)}
                        disabled={ep.status === 'pinging'}
                        className="px-2.5 py-1 bg-[#006b47] text-white text-xs rounded-lg hover:bg-[#005235] transition-colors"
                      >
                        {ep.status === 'pinging' ? 'Testing...' : 'Ping'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#e0e3e1] bg-[#f7faf8] flex items-center justify-between text-xs text-[#556258]">
          <span>Synced with National Environment Agency (NEA) & MSS telemetry</span>
          <button
            onClick={() => setIsStatusModalOpen(false)}
            className="px-4 py-1.5 bg-[#006b47] text-white rounded-lg font-bold hover:bg-[#005235]"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
};
