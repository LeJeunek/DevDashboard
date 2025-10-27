import { Nav } from "react-bootstrap";
import { FaHome, FaCode, FaPalette, FaLightbulb } from "react-icons/fa";
import { NavLink } from "react-router-dom"; // <-- use NavLink for active styling
import "./Sidebar.css";
import { FaRadio } from "react-icons/fa6";

export default function Sidebar() {
  return (
    <div className="sidebar d-flex flex-column align-items-start p-3">
      <h4 className="mb-4 text-white">Dev Dashboard</h4>
      <Nav className="flex-column w-100">
        <Nav.Link
          as={NavLink}
          to="/"
          className="d-flex align-items-center mb-3 text-white"
        >
          <FaHome className="me-2" /> Home
        </Nav.Link>

        <Nav.Link
          as={NavLink}
          to="/code"
          className="d-flex align-items-center mb-3 text-white"
        >
          <FaCode className="me-2" /> Code
        </Nav.Link>

        <Nav.Link
          as={NavLink}
          to="/palette"
          className="d-flex align-items-center mb-3 text-white"
        >
          <FaPalette className="me-2" /> Palette
        </Nav.Link>
        <Nav.Link
          as={NavLink}
          to="/radio"
          className="d-flex align-items-center mb-3 text-white"
        >
          <FaRadio className="me-2" /> Radio
        </Nav.Link>

        <Nav.Link
          as={NavLink}
          to="/tips"
          className="d-flex align-items-center mb-3 text-white"
        >
          <FaLightbulb className="me-2" /> Tips
        </Nav.Link>
      </Nav>
    </div>
  );
}
