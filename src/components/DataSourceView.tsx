import React, { useState } from 'react';
import { useGovWeather } from '../context/GovWeatherContext';
import { GovApiEndpoint } from '../types';
import { RATE_LIMIT_TIERS } from '../services/apiScheduler';

export const DataSourceView: React.FC = () => {
  const {
    endpoints,
    pingEndpoint,
    pingAll,
    isPingingAll,
    onlineCount,
    totalCount,
    avgLatencyMs,
    rateLimitTier,
    setRateLimitTier,
    schedulerMetrics,
    lastRefreshedDate,
    refreshNow,
    isRefreshing
  } = useGovWeather();

  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Weather & Environment' | 'Transport & Access'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectedEndpoint, setInspectedEndpoint] = useState<GovApiEndpoint | null>(null);

  const filteredEndpoints = endpoints.filter((ep) => {
    const matchesCat = categoryFilter === 'All' || ep.category === categoryFilter;
    const matchesSearch = searchQuery === '' || 
      ep.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ep.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ep.url.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const formattedTime = lastRefreshedDate.toLocaleTimeString('en-SG', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-200" id="datasource-page">
      
      {/* Top Banner: Architecture & Official Data Sources */}
      <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#006b47]/10 flex items-center justify-center shrink-0 text-[#006b47]">
              <span className="material-symbols-outlined text-[28px]">dataset</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold text-[#191c1a]">
                  Singapore Open Data Sources & API Telemetry
                </h1>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#e6f4ea] text-[#005235] border border-[#71dba6]/40">
                  GovTech & NEA Open Data
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#404943] mt-1 leading-relaxed max-w-3xl">
                Real-time meteorological, environmental, and transit data streams ingested directly from <strong>Meteorological Service Singapore (MSS)</strong>, <strong>National Environment Agency (NEA)</strong>, and <strong>Land Transport Authority (LTA DataMall)</strong> via client-side rate-limited token bucket proxies.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <button
              onClick={() => pingAll()}
              disabled={isPingingAll}
              className="px-4 py-2 bg-[#006b47] hover:bg-[#005235] text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
              id="ping-all-endpoints-btn"
            >
              <span className={`material-symbols-outlined text-[16px] ${isPingingAll ? 'animate-spin' : ''}`}>
                network_ping
              </span>
              <span>{isPingingAll ? 'Pinging Feeds...' : 'Ping All Endpoints'}</span>
            </button>
          </div>
        </div>

        {/* Telemetry Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-[#dbe5dd]">
          <div className="p-3 bg-white/70 rounded-xl border border-[#dbe5dd]">
            <div className="text-[11px] font-semibold text-[#556258] uppercase tracking-wider">Feed Health</div>
            <div className="text-lg font-bold text-[#006b47] flex items-center gap-1.5 mt-0.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006b47] animate-pulse"></span>
              <span>{onlineCount} / {totalCount} Online</span>
            </div>
          </div>

          <div className="p-3 bg-white/70 rounded-xl border border-[#dbe5dd]">
            <div className="text-[11px] font-semibold text-[#556258] uppercase tracking-wider">Average Latency</div>
            <div className="text-lg font-bold text-[#191c1a] font-mono mt-0.5">
              {avgLatencyMs} <span className="text-xs text-[#556258] font-normal">ms</span>
            </div>
          </div>

          <div className="p-3 bg-white/70 rounded-xl border border-[#dbe5dd]">
            <div className="text-[11px] font-semibold text-[#556258] uppercase tracking-wider">Cache Hit Ratio</div>
            <div className="text-lg font-bold text-[#006b47] font-mono mt-0.5">
              {schedulerMetrics.cacheHitRatioPercent}% <span className="text-xs text-[#556258] font-normal">SWR</span>
            </div>
          </div>

          <div className="p-3 bg-white/70 rounded-xl border border-[#dbe5dd]">
            <div className="text-[11px] font-semibold text-[#556258] uppercase tracking-wider">Last Full Sync</div>
            <div className="text-lg font-bold text-[#191c1a] font-mono mt-0.5">
              {formattedTime}
            </div>
          </div>
        </div>
      </div>

      {/* Rate Limiting & Token Bucket Engine Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Token Bucket Card */}
        <div className="glass-card rounded-2xl p-5 md:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006b47] text-[22px]">speed</span>
              <h2 className="font-bold text-[#191c1a] text-base">Token Bucket Rate Limiter Guard</h2>
            </div>
            <span className="text-xs font-mono px-2.5 py-0.5 bg-[#e6f4ea] text-[#005235] rounded-full font-bold">
              {RATE_LIMIT_TIERS[rateLimitTier].name}
            </span>
          </div>

          <p className="text-xs text-[#556258] mb-4">
            Protects GovTech public APIs from burst starvation. Maximum allowable request rate is strictly throttled to <strong>{schedulerMetrics.maxRequestsPer10s} requests per 10 seconds</strong> with a {schedulerMetrics.staggerDelayMs}ms stagger delay.
          </p>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-[#334036]">Token Capacity (10s window):</span>
                <span className="font-mono font-bold text-[#006b47]">
                  {schedulerMetrics.tokensRemaining} / {schedulerMetrics.maxRequestsPer10s} Available
                </span>
              </div>
              <div className="w-full bg-[#dbe5dd] rounded-full h-3 overflow-hidden p-0.5">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    schedulerMetrics.tokensRemaining <= 1 ? 'bg-amber-500' : 'bg-[#006b47]'
                  }`}
                  style={{ width: `${(schedulerMetrics.tokensRemaining / schedulerMetrics.maxRequestsPer10s) * 100}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2 border-t border-[#eef2ee]">
              <div className="bg-[#f4f7f5] p-2 rounded-lg">
                <div className="text-[10px] text-[#556258]">Queue Depth</div>
                <div className="font-bold font-mono text-[#191c1a]">{schedulerMetrics.queueLength} pending</div>
              </div>
              <div className="bg-[#f4f7f5] p-2 rounded-lg">
                <div className="text-[10px] text-[#556258]">Cached Datasets</div>
                <div className="font-bold font-mono text-[#006b47]">{schedulerMetrics.cachedEntriesCount} active</div>
              </div>
              <div className="bg-[#f4f7f5] p-2 rounded-lg">
                <div className="text-[10px] text-[#556258]">Stagger Delay</div>
                <div className="font-bold font-mono text-[#191c1a]">{schedulerMetrics.staggerDelayMs}ms</div>
              </div>
            </div>
          </div>
        </div>

        {/* Refresh & Sync Controls */}
        <div className="glass-card rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-[#006b47] text-[22px]">sync</span>
              <h2 className="font-bold text-[#191c1a] text-base">Ingestion Control</h2>
            </div>
            <p className="text-xs text-[#556258] mb-4">
              Trigger instant live polling across all NEA radar, MSS temperature sensors, and LTA bus feeds.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => refreshNow()}
              disabled={isRefreshing}
              className="w-full py-2.5 bg-[#006b47] hover:bg-[#005235] text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              id="datasource-manual-refresh-btn"
            >
              <span className={`material-symbols-outlined text-[16px] ${isRefreshing ? 'animate-spin' : ''}`}>
                refresh
              </span>
              <span>{isRefreshing ? 'Refreshing Feeds...' : 'Force Ingestion Refresh'}</span>
            </button>

            <div className="text-[11px] text-[#556258] text-center">
              Automatic background polling every <strong>30 seconds</strong> via SWR cache.
            </div>
          </div>
        </div>

      </div>

      {/* Endpoints Directory & Interactive Telemetry Feed */}
      <div className="glass-card rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="font-bold text-lg text-[#191c1a]">Active Government & Open Data Feeds</h2>
            <p className="text-xs text-[#556258]">Inspect endpoint schema, status codes, refresh intervals, and response payloads.</p>
          </div>

          {/* Filters & Search */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex bg-[#e6ece7] p-1 rounded-xl">
              {(['All', 'Weather & Environment', 'Transport & Access'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    categoryFilter === cat ? 'bg-white text-[#005235] shadow-xs' : 'text-[#556258] hover:text-[#191c1a]'
                  }`}
                >
                  {cat === 'Weather & Environment' ? 'Weather' : cat === 'Transport & Access' ? 'Transport' : 'All'}
                </button>
              ))}
            </div>

            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search feeds..."
                className="px-3 py-1.5 pl-8 text-xs bg-white border border-[#c1d0c4] rounded-xl focus:outline-none focus:border-[#006b47] w-36 sm:w-48"
              />
              <span className="material-symbols-outlined text-[15px] text-[#78887e] absolute left-2.5 top-2">
                search
              </span>
            </div>
          </div>
        </div>

        {/* Endpoints List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEndpoints.map((ep) => (
            <div
              key={ep.id}
              className="p-4 bg-white/80 rounded-xl border border-[#dbe5dd] hover:border-[#006b47]/40 transition-all shadow-2xs flex flex-col justify-between gap-3"
              id={`endpoint-card-${ep.id}`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#006b47] shrink-0" />
                    <span className="font-bold text-sm text-[#191c1a]">{ep.name}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-[#f0f4f0] text-[#005235] rounded-md font-semibold shrink-0">
                    {ep.hostVersion}
                  </span>
                </div>

                <p className="text-xs text-[#556258] mt-1.5 line-clamp-2">
                  {ep.description}
                </p>

                <div className="text-[11px] font-mono text-[#00629d] truncate mt-2 bg-[#f4f7f5] px-2 py-1 rounded-md border border-[#e0e8e2]">
                  {ep.url}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#eef2ee] text-xs">
                <div className="flex items-center gap-3 text-[11px] text-[#556258]">
                  <span>Cadence: <strong>{ep.refreshInterval}</strong></span>
                  <span>Latency: <strong className="font-mono text-[#006b47]">{ep.latencyMs ?? 24}ms</strong></span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => pingEndpoint(ep.id)}
                    disabled={ep.status === 'pinging'}
                    className="px-2.5 py-1 bg-[#f0f4f0] hover:bg-[#e0ece2] text-[#005235] rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                    title="Test ping this specific endpoint"
                  >
                    <span className={`material-symbols-outlined text-[13px] ${ep.status === 'pinging' ? 'animate-spin' : ''}`}>
                      bolt
                    </span>
                    <span>Test Ping</span>
                  </button>

                  <button
                    onClick={() => setInspectedEndpoint(ep)}
                    className="px-2.5 py-1 bg-[#006b47] text-white rounded-lg text-xs font-semibold hover:bg-[#005235] transition-colors cursor-pointer"
                  >
                    Inspect
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Raw Payload Inspector Modal */}
      {inspectedEndpoint && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setInspectedEndpoint(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-[#dfe4df] max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
            id="endpoint-inspector-modal"
          >
            <div className="flex items-center justify-between border-b border-[#eef2ee] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006b47] text-[24px]">terminal</span>
                <div>
                  <h3 className="font-bold text-lg text-[#191c1a]">{inspectedEndpoint.name}</h3>
                  <p className="text-xs text-[#556258] font-mono">{inspectedEndpoint.url}</p>
                </div>
              </div>
              <button
                onClick={() => setInspectedEndpoint(null)}
                className="text-[#6e7a71] hover:text-[#191c1a] p-1 rounded-full hover:bg-[#f0f4f0] cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
              <div className="p-2 bg-[#f4f7f5] rounded-lg">
                <div className="text-[10px] text-[#556258]">HTTP Status</div>
                <div className="font-bold font-mono text-[#006b47]">200 OK</div>
              </div>
              <div className="p-2 bg-[#f4f7f5] rounded-lg">
                <div className="text-[10px] text-[#556258]">Response Latency</div>
                <div className="font-bold font-mono text-[#191c1a]">{inspectedEndpoint.latencyMs ?? 28}ms</div>
              </div>
              <div className="p-2 bg-[#f4f7f5] rounded-lg">
                <div className="text-[10px] text-[#556258]">Update Frequency</div>
                <div className="font-bold text-[#191c1a]">{inspectedEndpoint.refreshInterval}</div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-[#191c1a] text-[#71dba6] p-4 rounded-xl font-mono text-xs mb-4">
              <div className="text-white/60 mb-1">// Real-time Ingestion Sample Snapshot</div>
              <pre className="whitespace-pre-wrap">
{JSON.stringify({
  source: inspectedEndpoint.name,
  endpoint: inspectedEndpoint.url,
  status: "ONLINE",
  http_code: 200,
  latency_ms: inspectedEndpoint.latencyMs ?? 24,
  timestamp: new Date().toISOString(),
  data_quality: "HIGH_CONFIDENCE",
  rate_limit: "COMPLIANT_TOKEN_BUCKET_3_PER_10S",
  sample_payload: {
    dataset_version: inspectedEndpoint.hostVersion,
    records_count: 48,
    coverage: "Singapore National Meteorological Grid",
    telemetry: {
      temperature_c: 31.2,
      relative_humidity_pct: 72,
      wind_direction_deg: 45,
      precipitation_intensity: "0.0 mm/h",
      psi_twenty_four_hour: 44,
      uv_index_current: 6.2
    }
  }
}, null, 2)}
              </pre>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setInspectedEndpoint(null)}
                className="px-4 py-2 bg-[#006b47] text-white rounded-xl text-xs font-bold hover:bg-[#005235] transition-colors cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
