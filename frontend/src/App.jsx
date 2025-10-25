import { useState } from "react";
import AdminDashboard from "./pages/Admindahboard";
import EnvironmentalDashboard from "./pages/EnvironmentalDashboard";

export default function App() {
  const [currentView, setCurrentView] = useState('user');

  const handleLogout = () => {
    setCurrentView(prevView => prevView === 'user' ? 'admin' : 'user');
  };

  return (
    <>
      {currentView === 'user' ? (
        <EnvironmentalDashboard onLogout={handleLogout} />
      ) : (
        <AdminDashboard onLogout={handleLogout} />
      )}
    </>
  );
}
