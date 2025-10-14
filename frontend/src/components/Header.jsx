import { Wifi } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Header() {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
  );

  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
      );
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-20 bg-slate-900/90 backdrop-blur-lg border-b border-slate-800 px-6 py-3 flex justify-between items-center">
      {/* Left Section */}
      <div className="flex flex-col">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg md:text-xl font-semibold text-white tracking-tight">
            Environmental Dashboard
          </h2>
          <div className="flex items-center space-x-1 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
            <Wifi className="w-3 h-3 text-emerald-400" />
            <span className="text-[10px] font-medium text-emerald-400">Live</span>
          </div>
        </div>
        <div className="flex items-center space-x-3 mt-0.5">
          <p className="text-slate-500 text-xs">Real-time monitoring</p>
          <span className="text-slate-600 text-xs">•</span>
          <p className="text-slate-500 text-xs">{currentTime}</p>
        </div>
      </div>
    </header>
  );
}
