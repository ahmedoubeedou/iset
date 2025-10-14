export default function StatsCards({ currentMachine }) {
  return (
    <div className="space-y-4">
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs text-slate-500">Temperature</span>
          <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <span className="text-lg">🌡️</span>
          </div>
        </div>
        <p className="text-2xl font-bold text-white">{currentMachine.temperature}°C</p>
        <div className="mt-2 flex items-center space-x-1">
          <div className={`w-1.5 h-1.5 rounded-full ${currentMachine.temperature > 70 ? 'bg-red-500' : 'bg-orange-500'}`}></div>
          <span className="text-xs text-slate-500">
            {currentMachine.temperature > 70 ? 'High' : currentMachine.temperature < 65 ? 'Low' : 'Normal'}
          </span>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs text-slate-500">Humidity</span>
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <span className="text-lg">💧</span>
          </div>
        </div>
        <p className="text-2xl font-bold text-white">{currentMachine.humidity}%</p>
        <div className="mt-2 flex items-center space-x-1">
          <div className={`w-1.5 h-1.5 rounded-full ${currentMachine.humidity < 30 ? 'bg-yellow-500' : 'bg-blue-500'}`}></div>
          <span className="text-xs text-slate-500">
            {currentMachine.humidity < 30 ? 'Low' : currentMachine.humidity > 55 ? 'High' : 'Optimal'}
          </span>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs text-slate-500">Gas Level</span>
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <span className="text-lg">🌬️</span>
          </div>
        </div>
        <p className="text-2xl font-bold text-white">{currentMachine.gas}%</p>
        <div className="mt-2 flex items-center space-x-1">
          <div className={`w-1.5 h-1.5 rounded-full ${currentMachine.gas > 25 ? 'bg-red-500' : currentMachine.gas > 22 ? 'bg-yellow-500' : 'bg-emerald-500'}`}></div>
          <span className="text-xs text-slate-500">
            {currentMachine.gas > 25 ? 'Critical' : currentMachine.gas > 22 ? 'Warning' : 'Safe'}
          </span>
        </div>
      </div>
    </div>
  );
}
