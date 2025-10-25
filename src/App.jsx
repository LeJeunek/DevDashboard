import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import DashboardGrid from "./components/DashboardGrid.jsx";
import Code from "./pages/Code.jsx";
import Tips from "./pages/Tips.jsx";
import RadioWidget from "./components/widgets/RadioWidget.jsx";
import "./index.css";

function App() {
  return (
    <Router>
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<DashboardGrid />} />
          <Route path="/code" element={<Code />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/radio" element={<RadioWidget />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
