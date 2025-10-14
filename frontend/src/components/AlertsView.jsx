import { AlertTriangle, Clock, Droplets, Thermometer, Wind } from 'lucide-react';

export default function AlertsView({ alerts = [] }) {
  const getAlertIcon = (type) => {
    switch (type) {
      case 'temperature':
        return <Thermometer className="w-5 h-5" />;
      case 'humidity':
        return <Droplets className="w-5 h-5" />;
      case 'gas':
        return <Wind className="w-5 h-5" />;
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getSeverityStyles = (severity) => {
    switch (severity) {
      case 'critical':
        return {
          bg: 'bg-red-500/10',
          border: 'border-red-500/30',
          text: 'text-red-400',
          badge: 'bg-red-500/20 text-red-300 border-red-500/40'
        };
      case 'error':
        return {
          bg: 'bg-orange-500/10',
          border: 'border-orange-500/30',
          text: 'text-orange-400',
          badge: 'bg-orange-500/20 text-orange-300 border-orange-500/40'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-500/10',
          border: 'border-yellow-500/30',
          text: 'text-yellow-400',
          badge: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
        };
      default:
        return {
          bg: 'bg-blue-500/10',
          border: 'border-blue-500/30',
          text: 'text-blue-400',
          badge: 'bg-blue-500/20 text-blue-300 border-blue-500/40'
        };
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // seconds

    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-4">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 mb-1">Total Alerts</p>
              <p className="text-2xl font-bold text-white">{alerts.length}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 mb-1">Critical</p>
              <p className="text-2xl font-bold text-red-400">
                {alerts.filter(a => a.severity === 'critical').length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
              <Wind className="w-6 h-6 text-red-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 mb-1">Warnings</p>
              <p className="text-2xl font-bold text-yellow-400">
                {alerts.filter(a => a.severity === 'warning' || a.severity === 'error').length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <Thermometer className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
        <h3 className="text-lg font-semibold mb-4 text-white flex items-center space-x-2">
          <Clock className="w-5 h-5" />
          <span>Recent Alerts</span>
        </h3>

        {alerts.length === 0 ? (
          <div className="space-y-3">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex items-start space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current text-blue-400 shrink-0 w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div>
                <h3 className="font-semibold text-blue-300 text-sm">System Information</h3>
                <div className="text-xs text-slate-400 mt-1">All monitoring systems operating normally</div>
              </div>
            </div>
            <div className="text-center py-8">
              <p className="text-slate-500 text-sm">No alerts at this time</p>
              <span className="text-3xl mt-2 inline-block">✅</span>
            </div>
          </div>
        ) : (
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
            {alerts.map((alert) => {
              const styles = getSeverityStyles(alert.severity);
              return (
                <div
                  key={alert.id}
                  className={`${styles.bg} border ${styles.border} rounded-lg p-4 flex items-start space-x-3 hover:scale-[1.01] transition-all duration-200`}
                >
                  <div className={`${styles.text} shrink-0 mt-0.5`}>
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className={`font-semibold ${styles.text} text-sm`}>
                        {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)} Alert
                      </h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${styles.badge} font-medium`}>
                        {alert.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mb-2">{alert.message}</p>
                    <div className="flex items-center space-x-3 text-xs text-slate-500">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{formatTimestamp(alert.timestamp)}</span>
                      </span>
                      <span>•</span>
                      <span>Device: {alert.machineId}</span>
                      <span>•</span>
                      <span>Value: {alert.value}{alert.type === 'temperature' ? '°C' : '%'}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
