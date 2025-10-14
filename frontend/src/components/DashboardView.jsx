import SensorVisualization from './SensorVisualization';
// import StatsCards from './StatsCards';

export default function DashboardView({ currentMachine }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <SensorVisualization currentMachine={currentMachine} />
      {/* <StatsCards currentMachine={currentMachine} /> */}
    </div>
  );
}
