import Sidebar from "./Sidebar";
import DashboardGrid from "./DashboardGrid";
import { useState } from "react";

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="dashboard-wrapper">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`main-content ${collapsed ? "collapsed" : ""}`}>
        <DashboardGrid collapsed={collapsed} />
      </div>
    </div>
  );
}
