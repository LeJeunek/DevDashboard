import { Nav } from "react-bootstrap";
import {
  FaHome,
  FaCode,
  FaPalette,
  FaLightbulb,
  FaJournalWhills,
  FaBars,
} from "react-icons/fa";
import { FaRadio } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./Sidebar.css";

export default function Sidebar({ collapsed, setCollapsed }) {
  return (
    <Nav
      className={`sidebar d-flex flex-column p-5 align-items-center text-center ${
        collapsed ? "collapsed" : ""
      }`}
    >
      {/* Header with Hamburger */}
      <div className="sidebar-header d-flex align-items-center justify-content-between">
        <button
          className="btn btn-sm btn-outline-light toggle-btn"
          onClick={() => setCollapsed(!collapsed)}
          style={{ marginRight: "2rem" }}
        >
          <FaBars />
        </button>
        <h4 className={`text-white ${collapsed ? "d-none" : ""}`}>
          Dev Dashboard
        </h4>
      </div>

      <div className="sidebar-links d-flex flex-column w-100">
        <Nav.Link as={NavLink} to="/" className="nav-item">
          <span className="icon">
            <FaHome />
          </span>
          <span className="text">Home</span>
        </Nav.Link>

        <Nav.Link as={NavLink} to="/code" className="nav-item">
          <span className="icon">
            <FaCode />
          </span>
          <span className="text">Code</span>
        </Nav.Link>

        <Nav.Link as={NavLink} to="/palette" className="nav-item">
          <span className="icon">
            <FaPalette />
          </span>
          <span className="text">Palette</span>
        </Nav.Link>

        <Nav.Link as={NavLink} to="/radio" className="nav-item">
          <span className="icon">
            <FaRadio />
          </span>
          <span className="text">Radio</span>
        </Nav.Link>

        <Nav.Link as={NavLink} to="/tips" className="nav-item">
          <span className="icon">
            <FaLightbulb />
          </span>
          <span className="text">Tips</span>
        </Nav.Link>

        <Nav.Link as={NavLink} to="/tasks" className="nav-item">
          <span className="icon">
            <FaJournalWhills />
          </span>
          <span className="text">Tasks</span>
        </Nav.Link>
      </div>
    </Nav>
  );
}
