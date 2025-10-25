import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import AlertsView from '../components/AlertsView';
import DashboardView from '../components/DashboardView';
import Header from '../components/Header';
import MachinesView from '../components/MachinesView';
import Sidebar from '../components/Sidebar';

export default function EnvironmentalDashboard({ onLogout }) {  // Added onLogout prop
  const [activeTab, setActiveTab] = useState('dashboard');
  const [machines, setMachines] = useState([
    { id: 'ZZ-999-ZZ', temperature: 65, humidity: 40, gas: 21, status: 'active' }
  ]);
  const [selectedMachine, setSelectedMachine] = useState('ZZ-999-ZZ');
  const [Alert, setAlert] = useState([]);
  const [montrantAlerr, setestmontrantalert] = useState(false);
  const [dernirereAlert, setdernirereAlert] = useState([]);

  // Process alert queue
  useEffect(() => {
    if (Alert.length > 0 && !montrantAlerr) {
      setestmontrantalert(true);
      const nextAlert = Alert[0];

      toast(nextAlert.message, {
        duration: 4000,
        icon: nextAlert.icon,
        position: 'bottom-right',
        style: {
          background: '#0f172a',
          color: '#f1f5f9',
          border: '1px solid #1e293b',
          borderRadius: '8px',
          cursor: 'pointer',
        },
        onClick: () => {
          setActiveTab('alerts');
          toast.dismiss();
        },
      });

      setdernirereAlert(prev => [
        {
          ...nextAlert,
          timestamp: new Date().toISOString(),
          id: Date.now()
        },
        ...prev.slice(0, 19)
      ]);

      setTimeout(() => {
        setAlert(prev => prev.slice(1));
        setestmontrantalert(false);
      }, 4000);
    }
  }, [Alert, montrantAlerr]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMachines(prev =>
        prev.map(machine => {
          if (machine.id === selectedMachine) {
            const newTemp = Math.round(Math.random() * 15 + 58);
            const newHumidity = Math.round(Math.random() * 20 + 30);
            const newGas = Math.round(Math.random() * 10 + 18);

            const alerts = [];

            if (newTemp > 70) {
              alerts.push({
                type: 'temperature',
                severity: 'error',
                message: `High Temperature Alert: ${newTemp}°C on ${machine.id}`,
                icon: '🌡️',
                value: newTemp,
                machineId: machine.id
              });
            }

            if (newGas > 25) {
              alerts.push({
                type: 'gas',
                severity: 'critical',
                message: `Gas Level Critical: ${newGas}% on ${machine.id}`,
                icon: '⚠️',
                value: newGas,
                machineId: machine.id
              });
            }

            if (newHumidity < 30) {
              alerts.push({
                type: 'humidity',
                severity: 'warning',
                message: `Low Humidity Warning: ${newHumidity}% on ${machine.id}`,
                icon: '💧',
                value: newHumidity,
                machineId: machine.id
              });
            }

            if (alerts.length > 0) {
              setAlert(prev => [...prev, ...alerts]);
            }

            return { ...machine, temperature: newTemp, humidity: newHumidity, gas: newGas };
          }
          return machine;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedMachine]);

  const currentMachine = machines.find(m => m.id === selectedMachine) || machines[0];

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(71 85 105 / 0.15) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }}></div>

      <Toaster
        position="bottom-right"
        containerStyle={{
          bottom: 40,
          right: 40,
        }}
        toastOptions={{
          style: {
            background: '#0f172a',
            color: '#f1f5f9',
            border: '1px solid #1e293b',
            borderRadius: '8px',
            cursor: 'pointer',
            minWidth: '300px',
          },
        }}
      />

      <div className="flex h-screen overflow-hidden relative z-10">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={onLogout}  // Pass onLogout to Sidebar
        />

        <main className="flex-1 flex flex-col overflow-y-auto">
          <Header />

          <div className="p-6 space-y-6">
            {activeTab === 'dashboard' && <DashboardView currentMachine={currentMachine} />}
            {activeTab === 'machines' && <MachinesView machines={machines} />}
            {activeTab === 'alerts' && <AlertsView alerts={dernirereAlert} />}
          </div>
        </main>
      </div>
    </div>
  );
}
