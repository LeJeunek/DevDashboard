import { Nav } from "react-bootstrap";
import { FaHome, FaCode, FaPalette, FaLightbulb } from "react-icons/fa";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar d-flex flex-column align-items-start p-3">
      <h4 className="mb-4 text-white">Dev Dashboard</h4>
      <Nav className="flex-column w-100">
        <Nav.Link
          href="/"
          className="d-flex align-items-center mb-3 text-white"
        >
          <FaHome className="me-2" /> Home
        </Nav.Link>
        <Nav.Link
          href="/code"
          className="d-flex align-items-center mb-3 text-white"
        >
          <FaCode className="me-2" /> Code
        </Nav.Link>
        <Nav.Link
          href="/palette"
          className="d-flex align-items-center mb-3 text-white"
        >
          <FaPalette className="me-2" /> Palette
        </Nav.Link>
        <Nav.Link
          href="/tips"
          className="d-flex align-items-center mb-3 text-white"
        >
          <FaLightbulb className="me-2" /> Tips
        </Nav.Link>
      </Nav>
    </div>
  );
}
