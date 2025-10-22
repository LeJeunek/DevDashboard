import React, { useEffect, useState } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./DashboardGrid.css";
import Tips from "../pages/Tips.jsx";
import SnippetManager from "./widgets/SnippetManager.jsx";
import TipsWidget from "./widgets/TipsWidget.jsx";

export default function DashboardGrid() {
  const [gridWidth, setGridWidth] = useState(window.innerWidth - 250); // minus sidebar
  const [expandedWidget, setExpandedWidget] = useState(null);
  useEffect(() => {
    const handleResize = () => setGridWidth(window.innerWidth - 250);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fixed layout — each widget spaced evenly
  const layout = [
    { i: "a", x: 0, y: 0, w: 3, h: 2 },
    { i: "b", x: 3, y: 0, w: 3, h: 2 },
    { i: "c", x: 6, y: 0, w: 3, h: 2 },
    { i: "d", x: 0, y: 2, w: 3, h: 2 }, // stacked under A
  ];

  const handleExpand = (id) => {
    setExpandedWidget(id);
  };
  const handleClose = () => {
    setExpandedWidget(null);
  };

  return (
    <div className="dashboard-grid">
      <GridLayout
        className={`layout ${expandedWidget ? "blurred" : ""}`}
        layout={layout}
        cols={12}
        rowHeight={100}
        isDraggable={!expandedWidget} // disable drag when expanded
        isResizable={!expandedWidget}
        draggableHandle=".drag-handle"
        width={gridWidth}
      >
        <div key="a" className="widget">
          <div className="widget-header">
            <div className="widget-left">
              <div className="drag-handle" title="Drag to move">
                ⋮⋮
              </div>
              <span className="widget-title">Snippet Manager</span>
            </div>
            <button
              className="expand-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleExpand("a");
              }}
            >
              ⛶
            </button>
          </div>

          <div className="widget-body">
            <SnippetManager />
          </div>
        </div>

        <div key="b" className="widget">
          <div className="widget-header">
            <div className="widget-left">
              <div className="drag-handle" title="Drag to move">
                ⋮⋮
              </div>
              <span className="widget-title">Color Palette</span>
            </div>
            <button
              className="expand-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleExpand("b");
              }}
            >
              ⛶
            </button>
          </div>

          <div className="widget-body">
            <div>Color Palette Content</div>
          </div>
        </div>
        <div key="c" className="widget">
          <div className="widget-header">
            <div className="widget-left">
              <div className="drag-handle" title="Drag to move">
                ⋮⋮
              </div>
              <span className="widget-title">Cheat sheet</span>
            </div>
            <button
              className="expand-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleExpand("c");
              }}
            >
              ⛶
            </button>
          </div>

          <div className="widget-body">
            <TipsWidget />
          </div>
        </div>
        <div key="d" className="widget">
          <div className="widget-header">
            <div className="widget-left">
              <div className="drag-handle" title="Drag to move">
                ⋮⋮
              </div>
              <span className="widget-title">Radio</span>
            </div>
            <button
              className="expand-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleExpand("d");
              }}
            >
              ⛶
            </button>
          </div>

          <div className="widget-body"></div>
        </div>
      </GridLayout>

      {expandedWidget && (
        <div className="expanded-overlay" onClick={handleClose}>
          <div
            className="expanded-content"
            onClick={(e) => e.stopPropagation()}
          >
            {expandedWidget === "a" && <SnippetManager />}
            {expandedWidget === "b" && <div>Color Palette Full View</div>}
            {expandedWidget === "c" && <TipsWidget />}
            {expandedWidget === "d" && <div>Radio Full View</div>}
          </div>
        </div>
      )}
    </div>
  );
}
