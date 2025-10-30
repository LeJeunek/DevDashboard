import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import DashboardGrid from "./components/DashboardGrid.jsx";
import Code from "./pages/Code.jsx";
import Tips from "./pages/Tips.jsx";
import RadioWidget from "./components/widgets/RadioWidget.jsx";
import ReactHooksExplorer from "./components/widgets/ReactHooksExplorer.jsx";
import DependencyHealthChecker from "./components/widgets/DependencyHealthChecker.jsx";
import CollapsibleTasks from "./components/CollapsibleTasks.jsx";
import "./index.css";
import { useState } from "react"; // 👈 import useState

function App() {
  const [collapsed, setCollapsed] = useState(false); // 👈 add this

  return (
    <Router>
      {/* 👇 pass both collapsed and setCollapsed */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`main-content ${collapsed ? "collapsed" : ""}`}>
        <Routes>
          <Route path="/" element={<DashboardGrid />} />
          <Route path="/code" element={<Code />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/radio" element={<RadioWidget />} />
          <Route path="/tasks" element={<CollapsibleTasks />} />
          <Route path="/react-hook-explorer" element={<ReactHooksExplorer />} />
          <Route
            path="/dependency-checker"
            element={<DependencyHealthChecker />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
