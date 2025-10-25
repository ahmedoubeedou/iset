import { Activity, ChevronRight, Droplets, Thermometer, Wifi, WifiOff, Wind } from "lucide-react";
import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar"; // Changed to AdminSidebar
import Header from "../components/Header";

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('users'); // Changed default to 'users'
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "mariem.j@enviro.com",
      role: "Admin",
      status: "online",
      lastActive: "2 min ago",
      devices: [
        { id: "D001", name: "Temperature Sensor A1", type: "temperature", value: 65, status: "online", location: "Building A" },
        { id: "D002", name: "Humidity Monitor B2", type: "humidity", value: 40, status: "online", location: "Building B" },
        { id: "D003", name: "Gas Detector C1", type: "gas", value: 21, status: "warning", location: "Building C" }
      ]
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@enviro.com",
      role: "Operator",
      status: "online",
      lastActive: "5 min ago",
      devices: [
        { id: "D004", name: "Temperature Sensor D4", type: "temperature", value: 72, status: "online", location: "Building D" },
        { id: "D005", name: "Air Quality Monitor E1", type: "gas", value: 18, status: "online", location: "Building E" }
      ]
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "e.rodriguez@enviro.com",
      role: "Technician",
      status: "away",
      lastActive: "1 hour ago",
      devices: [
        { id: "D006", name: "Humidity Sensor F2", type: "humidity", value: 55, status: "online", location: "Building F" },
        { id: "D007", name: "Temperature Monitor G3", type: "temperature", value: 68, status: "offline", location: "Building G" }
      ]
    },
    {
      id: 4,
      name: "James Wilson",
      email: "j.wilson@enviro.com",
      role: "Viewer",
      status: "offline",
      lastActive: "3 hours ago",
      devices: [
        { id: "D008", name: "Gas Monitor H1", type: "gas", value: 22, status: "online", location: "Building H" }
      ]
    },
    {
      id: 5,
      name: "Aisha Patel",
      email: "a.patel@enviro.com",
      role: "Operator",
      status: "online",
      lastActive: "Just now",
      devices: [
        { id: "D009", name: "Temperature Sensor I2", type: "temperature", value: 70, status: "online", location: "Building I" },
        { id: "D010", name: "Humidity Monitor J3", type: "humidity", value: 45, status: "online", location: "Building J" },
        { id: "D011", name: "Gas Detector K1", type: "gas", value: 19, status: "online", location: "Building K" }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-emerald-500';
      case 'away': return 'bg-amber-500';
      case 'offline': return 'bg-slate-500';
      case 'warning': return 'bg-orange-500';
      default: return 'bg-slate-500';
    }
  };

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'temperature': return <Thermometer className="w-5 h-5" />;
      case 'humidity': return <Droplets className="w-5 h-5" />;
      case 'gas': return <Wind className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  const totalDevices = users.reduce((acc, user) => acc + user.devices.length, 0);
  const onlineUsers = users.filter(u => u.status === 'online').length;
  const onlineDevices = users.reduce((acc, user) =>
    acc + user.devices.filter(d => d.status === 'online').length, 0
  );

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        {/* Stats Bar */}
        <div className="bg-slate-900 border-b border-slate-800 px-8 py-4">
          <div className="flex gap-4">
            <div className="bg-slate-800/50 rounded-lg px-4 py-3 flex-1">
              <p className="text-xs text-slate-400 mb-1">Total Users</p>
              <p className="text-2xl font-bold">{users.length}</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg px-4 py-3 flex-1">
              <p className="text-xs text-slate-400 mb-1">Online</p>
              <p className="text-2xl font-bold text-emerald-500">{onlineUsers}</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg px-4 py-3 flex-1">
              <p className="text-xs text-slate-400 mb-1">Total Devices</p>
              <p className="text-2xl font-bold text-blue-500">{totalDevices}</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg px-4 py-3 flex-1">
              <p className="text-xs text-slate-400 mb-1">Devices Online</p>
              <p className="text-2xl font-bold text-emerald-500">{onlineDevices}</p>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden flex">
          {/* Users List */}
          <div className={`${selectedUser ? 'w-2/5' : 'w-full'} overflow-y-auto p-6 transition-all duration-300`}>
            <div className="space-y-3">
              {users.map(user => (
                <div
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className={`bg-slate-900 rounded-xl p-5 cursor-pointer transition-all hover:bg-slate-800 border-2 ${selectedUser?.id === user.id ? 'border-blue-600' : 'border-transparent'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-lg font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div className={`absolute bottom-0 right-0 w-4 h-4 ${getStatusColor(user.status)} rounded-full border-2 border-slate-900`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{user.name}</h3>
                        <p className="text-slate-400 text-sm">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="px-3 py-1 bg-slate-800 rounded-full text-xs font-medium">
                          {user.role}
                        </span>
                        <p className="text-xs text-slate-500 mt-1">{user.lastActive}</p>
                      </div>
                      <ChevronRight className={`w-5 h-5 text-slate-600 transition-transform ${selectedUser?.id === user.id ? 'rotate-90' : ''
                        }`} />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-400">{user.devices.length} devices</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {user.devices.filter(d => d.status === 'online').length > 0 ? (
                        <>
                          <Wifi className="w-4 h-4 text-emerald-500" />
                          <span className="text-emerald-500">
                            {user.devices.filter(d => d.status === 'online').length} online
                          </span>
                        </>
                      ) : (
                        <>
                          <WifiOff className="w-4 h-4 text-slate-500" />
                          <span className="text-slate-500">All offline</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Details Panel */}
          {selectedUser && (
            <div className="w-3/5 bg-slate-900 border-l border-slate-800 overflow-y-auto p-8">
              <div className="mb-6">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-slate-400 hover:text-slate-200 text-sm mb-4"
                >
                  ← Back to users
                </button>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-3xl font-bold">
                      {selectedUser.name.charAt(0)}
                    </div>
                    <div className={`absolute bottom-0 right-0 w-6 h-6 ${getStatusColor(selectedUser.status)} rounded-full border-4 border-slate-900`} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">{selectedUser.name}</h2>
                    <p className="text-slate-400">{selectedUser.email}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="px-3 py-1 bg-slate-800 rounded-full text-xs font-medium">
                        {selectedUser.role}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${selectedUser.status === 'online' ? 'bg-emerald-500/20 text-emerald-500' :
                        selectedUser.status === 'away' ? 'bg-amber-500/20 text-amber-500' :
                          'bg-slate-700 text-slate-400'
                        }`}>
                        {selectedUser.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Connected Devices ({selectedUser.devices.length})</h3>
                <div className="space-y-3">
                  {selectedUser.devices.map(device => (
                    <div
                      key={device.id}
                      className="bg-slate-800 rounded-xl p-5 hover:bg-slate-750 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${device.type === 'temperature' ? 'bg-orange-500/20 text-orange-500' :
                            device.type === 'humidity' ? 'bg-blue-500/20 text-blue-500' :
                              'bg-emerald-500/20 text-emerald-500'
                            }`}>
                            {getDeviceIcon(device.type)}
                          </div>
                          <div>
                            <h4 className="font-semibold">{device.name}</h4>
                            <p className="text-xs text-slate-400">{device.id}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 ${getStatusColor(device.status)} rounded-full`} />
                          <span className="text-sm capitalize">{device.status}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-400">
                          📍 {device.location}
                        </div>
                        <div className="text-2xl font-bold">
                          {device.value}
                          {device.type === 'temperature' ? '°C' :
                            device.type === 'humidity' ? '%' : ' ppm'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
