import { Activity, Droplets, Thermometer } from "lucide-react";

export default function SensorVisualization({ currentMachine }) {
  const getSectorColor = (value, type) => {
    if (type === "gas") {
      if (value < 22) return "#10b981"; // green
      if (value < 25) return "#f59e0b"; // amber
      return "#ef4444"; // red
    }
    if (type === "humidity") {
      if (value >= 35 && value <= 55) return "#3b82f6"; // blue
      return "#6366f1"; // indigo
    }
    if (type === "temperature") {
      if (value < 65) return "#f97316"; // orange
      if (value < 70) return "#fb923c";
      return "#dc2626"; // red
    }
  };

  const MiniRing = ({ value, max, color, label, Icon }) => (
    <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-3 flex flex-col items-center">
      <Icon className="w-6 h-6 mb-2" style={{ color }} />
      <svg width="80" height="80" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="8" />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={`${(value / max) * 2 * Math.PI * 40} 999`}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          className="transition-all duration-1000"
        />
        <text
          x="50"
          y="55"
          textAnchor="middle"
          className="text-xs font-bold fill-white select-none"
        >
          {value}
        </text>
      </svg>
      <p className="text-xs text-slate-400 mt-2">{label}</p>
    </div>
  );

  return (
    <div className="lg:col-span-4 bg-gradient-to-b from-slate-900 to-slate-950 rounded-3xl border border-slate-800 p-8 flex flex-col items-center shadow-2xl shadow-slate-900/50">
      {/* Header */}
      <div className="flex justify-between w-full mb-6 px-2">
        <h3 className="text-sm font-medium text-slate-300 tracking-wide">
          Sensor Visualization
        </h3>
        <span className="text-xs text-slate-500">{currentMachine.id}</span>
      </div>

      {/* Central Rings */}
      <div className="flex justify-center items-center py-4">
        <svg width="320" height="320" viewBox="0 0 360 360">
          <defs>
            <linearGradient id="tempGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                stopColor={getSectorColor(currentMachine.temperature, "temperature")}
                stopOpacity="0.9"
              />
              <stop
                offset="100%"
                stopColor={getSectorColor(currentMachine.temperature, "temperature")}
                stopOpacity="0.3"
              />
            </linearGradient>
            <linearGradient id="humidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                stopColor={getSectorColor(currentMachine.humidity, "humidity")}
                stopOpacity="0.9"
              />
              <stop
                offset="100%"
                stopColor={getSectorColor(currentMachine.humidity, "humidity")}
                stopOpacity="0.3"
              />
            </linearGradient>
            <linearGradient id="gasGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                stopColor={getSectorColor(currentMachine.gas, "gas")}
                stopOpacity="0.9"
              />
              <stop
                offset="100%"
                stopColor={getSectorColor(currentMachine.gas, "gas")}
                stopOpacity="0.3"
              />
            </linearGradient>
          </defs>

          {/* Gas ring */}
          <circle
            cx="180"
            cy="180"
            r="110"
            fill="none"
            stroke="url(#gasGrad)"
            strokeWidth="10"
            strokeDasharray={`${(currentMachine.gas / 30) * 2 * Math.PI * 110} 9999`}
            strokeLinecap="round"
            transform="rotate(-90 180 180)"
            className="transition-all duration-1000 drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]"
          />

          {/* Humidity ring */}
          <circle
            cx="180"
            cy="180"
            r="85"
            fill="none"
            stroke="url(#humidGrad)"
            strokeWidth="10"
            strokeDasharray={`${(currentMachine.humidity / 100) * 2 * Math.PI * 85} 9999`}
            strokeLinecap="round"
            transform="rotate(-90 180 180)"
            className="transition-all duration-1000 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
          />

          {/* Temperature core */}
          <circle
            cx="180"
            cy="180"
            r="60"
            fill="url(#tempGrad)"
            className="transition-all duration-1000 animate-pulse"
          />
          <circle
            cx="180"
            cy="180"
            r="60"
            fill="none"
            stroke={getSectorColor(currentMachine.temperature, "temperature")}
            strokeWidth="3"
            opacity="0.5"
          />
          <text
            x="180"
            y="185"
            textAnchor="middle"
            className="text-4xl font-bold fill-white drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]"
          >
            {currentMachine.temperature}°C
          </text>
        </svg>
      </div>

      {/* Mini Rings Section */}
      <div className="grid grid-cols-3 gap-4 w-full mt-6">
        <MiniRing
          value={currentMachine.temperature}
          max={100}
          color={getSectorColor(currentMachine.temperature, "temperature")}
          label="Temperature"
          Icon={Thermometer}
        />
        <MiniRing
          value={currentMachine.humidity}
          max={100}
          color={getSectorColor(currentMachine.humidity, "humidity")}
          label="Humidity"
          Icon={Droplets}
        />
        <MiniRing
          value={currentMachine.gas}
          max={30}
          color={getSectorColor(currentMachine.gas, "gas")}
          label="Gas"
          Icon={Activity}
        />
      </div>
    </div>
  );
}
