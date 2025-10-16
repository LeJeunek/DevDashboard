import React, { useEffect, useState } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./DashboardGrid.css";

export default function DashboardGrid() {
  const [gridWidth, setGridWidth] = useState(window.innerWidth - 250); // minus sidebar

  useEffect(() => {
    const handleResize = () => setGridWidth(window.innerWidth - 250);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const layout = [
    { i: "a", x: 0, y: 0, w: 3, h: 2 },
    { i: "b", x: 3, y: 0, w: 3, h: 2 },
    { i: "c", x: 6, y: 0, w: 3, h: 2 },
  ];

  return (
    <div className="dashboard-grid">
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={100}
        width={gridWidth} // dynamically adjust for sidebar width
        draggableHandle=".widget-header"
      >
        <div key="a" className="widget">
          <div className="widget-header">Snippet Manager</div>
          <div className="widget-body">Code snippets go here...</div>
        </div>

        <div key="b" className="widget">
          <div className="widget-header">Color Palette</div>
          <div className="widget-body">Palette generator UI...</div>
        </div>

        <div key="c" className="widget">
          <div className="widget-header">Cheat Sheet</div>
          <div className="widget-body">CSS & JS tips...</div>
        </div>
      </GridLayout>
    </div>
  );
}
