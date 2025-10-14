import { Activity, AlertTriangle, Home, LogOut, Server, Settings, User } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Sidebar({ activeTab, setActiveTab, onLogout }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [systemStatus, setSystemStatus] = useState({
    online: true,
    uptime: '99.9%',
    uptimePercentage: 99.9,
    activeMachines: 3,
    lastChecked: new Date(),
  });

  // Simulate system status updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        lastChecked: new Date(),
        uptimePercentage: prev.uptimePercentage > 98 ? prev.uptimePercentage : prev.uptimePercentage + 0.1
      }));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Auto collapse on small screens
  useEffect(() => {
    const handleResize = () => setIsCollapsed(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigationItems = [
    { name: 'Dashboard', icon: Home, key: 'dashboard', description: 'Overview & insights' },
    { name: 'Machines', icon: Server, key: 'machines', badge: systemStatus.activeMachines, description: 'Manage devices' },
    { name: 'Alerts', icon: AlertTriangle, key: 'alerts', description: 'Notifications & warnings' },
    { name: 'Analytics', icon: Activity, key: 'analytics', description: 'Data & reports' },
    { name: 'Settings', icon: Settings, key: 'settings', description: 'System configuration' },
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to sign out?')) onLogout?.();
  };

  return (
    <aside
      className={`bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300 relative z-20
      ${isCollapsed ? 'w-20' : 'w-64'}`}
      role="navigation"
      aria-label="Sidebar Navigation"
    >
      {/* HEADER */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-600/30">
            <Activity className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight truncate">ISET Project</h1>
              <p className="text-xs text-slate-500">Controller</p>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="mt-4 w-full py-1.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200 text-xs transition"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? '→ Expand' : '← Collapse'}
        </button>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navigationItems.map(item => (
          <NavItem
            key={item.key}
            item={item}
            active={activeTab === item.key}
            collapsed={isCollapsed}
            onClick={() => setActiveTab(item.key)}
          />
        ))}
      </nav>

      {/* FOOTER */}
      <div className="p-4 space-y-3 border-t border-slate-800">
        <SystemStatus collapsed={isCollapsed} status={systemStatus} />
        {!isCollapsed && <UserProfile />}
        <LogoutButton collapsed={isCollapsed} onClick={handleLogout} />
      </div>
    </aside>
  );
}

/* 🔸 Nav Item Component */
function NavItem({ item, active, collapsed, onClick }) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group relative
      ${active ? 'bg-blue-600/20 text-white shadow-md shadow-blue-700/20' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
      aria-current={active ? 'page' : undefined}
      title={collapsed ? item.name : ''}
    >
      <div className="flex items-center space-x-3 min-w-0">
        <Icon className={`w-5 h-5 flex-shrink-0 transition-transform ${active ? 'scale-110' : 'group-hover:scale-105'}`} />
        {!collapsed && (
          <div className="flex flex-col items-start flex-1 min-w-0 overflow-hidden">
            <span className="text-sm font-medium truncate">{item.name}</span>
            <span className={`text-xs ${active ? 'text-blue-300' : 'text-slate-500'}`}>{item.description}</span>
          </div>
        )}
      </div>

      {item.badge !== undefined && !collapsed && (
        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${active ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'}`}>
          {item.badge}
        </span>
      )}
      {item.badge !== undefined && collapsed && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-semibold">
          {item.badge}
        </span>
      )}
    </button>
  );
}

/* 🔸 System Status Component */
function SystemStatus({ collapsed, status }) {
  const barColor = status.online ? 'from-emerald-500 to-emerald-400' : 'from-red-500 to-red-400';
  return (
    <div
      className={`rounded-lg p-3 border transition-all duration-300 ${
        status.online ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'
      }`}
    >
      {!collapsed ? (
        <>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${status.online ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
              <span className={`text-xs font-medium ${status.online ? 'text-emerald-400' : 'text-red-400'}`}>
                {status.online ? 'System Online' : 'System Offline'}
              </span>
            </div>
            <span className="text-xs text-slate-500">{status.uptime}</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${barColor} transition-all duration-500`}
              style={{ width: `${status.uptimePercentage}%` }}
            />
          </div>
        </>
      ) : (
        <div className="flex justify-center">
          <div className={`w-3 h-3 rounded-full ${status.online ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
        </div>
      )}
    </div>
  );
}

/* 🔸 User Profile Component */
function UserProfile() {
  return (
    <div className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-slate-800/50">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
        <User className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-200 truncate">User</p>
        <p className="text-xs text-slate-500 truncate">user@enviro.com</p>
      </div>
    </div>
  );
}

/* 🔸 Logout Button Component */
function LogoutButton({ collapsed, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center space-x-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 hover:border hover:border-red-500/30 transition group"
    >
      <LogOut className="w-4 h-4 group-hover:scale-105 transition-transform" />
      {!collapsed && <span className="text-xs font-medium">Sign Out</span>}
    </button>
  );
}
