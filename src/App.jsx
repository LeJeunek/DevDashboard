import { Container } from "react-bootstrap";
import Sidebar from "./components/Sidebar.jsx";
import DashboardGrid from "./components/DashboardGrid.jsx";
import "./index.css";

function App() {
  return (
    <div>
      <Sidebar />
      <Container fluid className="main-content">
        <div className="page-header mb-4">
          <h1>Dev Dashboard</h1>
        </div>

        <DashboardGrid />
      </Container>
    </div>
  );
}

export default App;
