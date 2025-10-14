export default function MachinesView({ machines }) {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
      <h3 className="text-lg font-semibold mb-4 text-white">Machine Management</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="text-left py-3 px-4 text-slate-500 font-medium text-xs">Device ID</th>
              <th className="text-left py-3 px-4 text-slate-500 font-medium text-xs">Temperature</th>
              <th className="text-left py-3 px-4 text-slate-500 font-medium text-xs">Humidity</th>
              <th className="text-left py-3 px-4 text-slate-500 font-medium text-xs">Gas Level</th>
              <th className="text-left py-3 px-4 text-slate-500 font-medium text-xs">Status</th>
            </tr>
          </thead>
          <tbody>
            {machines.map(machine => (
              <tr key={machine.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                <td className="py-3 px-4 font-medium text-slate-200 text-sm">{machine.id}</td>
                <td className="py-3 px-4 text-slate-400 text-sm">{machine.temperature}°C</td>
                <td className="py-3 px-4 text-slate-400 text-sm">{machine.humidity}%</td>
                <td className="py-3 px-4 text-slate-400 text-sm">{machine.gas}%</td>
                <td className="py-3 px-4">
                  <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded border border-emerald-500/30">
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
