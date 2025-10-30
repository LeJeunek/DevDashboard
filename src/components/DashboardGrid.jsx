import React, { useEffect, useState } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./DashboardGrid.css";
import Tips from "../pages/Tips.jsx";
import SnippetManager from "./widgets/SnippetManager.jsx";
import TipsWidget from "./widgets/TipsWidget.jsx";
import RadioWidget from "./widgets/RadioWidget.jsx";
import DependencyHealthChecker from "./widgets/DependencyHealthChecker.jsx";
import ReactHooksExplorer from "./widgets/ReactHooksExplorer.jsx";
import CollapsibleTasks from "./CollapsibleTasks.jsx";

export default function DashboardGrid({ collapsed }) {
  const sidebarWidth = collapsed ? 80 : 250;
  const [gridWidth, setGridWidth] = useState(window.innerWidth - 250); // minus sidebar
  const [expandedWidget, setExpandedWidget] = useState(null);

  useEffect(() => {
    const handleResize = () => setGridWidth(window.innerWidth - sidebarWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [collapsed]);

  // Fixed layout — each widget spaced evenly
  const layout = [
    { i: "a", x: 0, y: 0, w: 3, h: 2 },
    { i: "b", x: 3, y: 0, w: 3, h: 2 },
    { i: "c", x: 6, y: 0, w: 3, h: 2 },
    { i: "d", x: 0, y: 2, w: 3, h: 2 },
    { i: "e", x: 3, y: 2, w: 3, h: 2 }, // Dependency Checker
    { i: "f", x: 6, y: 2, w: 3, h: 2 }, // Hooks Explorer
  ];
  const handleExpand = (id) => {
    setExpandedWidget(id);
  };
  const handleClose = () => {
    setExpandedWidget(null);
  };

  return (
    <>
      <CollapsibleTasks />
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
              </div>
              <span className="widget-title">Snippet Manager</span>
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

            <div className="widget-body  d-none d-md-block">
              <SnippetManager />
            </div>
          </div>

          <div key="b" className="widget">
            <div className="widget-header">
              <div className="widget-left">
                <div className="drag-handle" title="Drag to move">
                  ⋮⋮
                </div>
              </div>
              <span className="widget-title">Color Palette</span>
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

            <div className="widget-body  d-none d-md-block">
              <div>Color Palette Content</div>
            </div>
          </div>
          <div key="c" className="widget">
            <div className="widget-header">
              <div className="widget-left">
                <div className="drag-handle" title="Drag to move">
                  ⋮⋮
                </div>
              </div>
              <span className="widget-title">Cheat sheet</span>
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

            <div className="widget-body  d-none d-md-block">
              <TipsWidget />
            </div>
          </div>
          <div key="d" className="widget">
            <div className="widget-header">
              <div className="widget-left">
                <div className="drag-handle" title="Drag to move">
                  ⋮⋮
                </div>
              </div>{" "}
              <span className="widget-title">Radio</span>
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

            <div className="widget-body d-none d-md-block">
              <RadioWidget />
            </div>
          </div>
          <div key="e" className="widget">
            <div className="widget-header">
              <div className="widget-left">
                <div className="drag-handle">⋮⋮</div>
              </div>
              <span className="widget-title">Dependency Health</span>
              <button className="expand-btn" onClick={() => handleExpand("e")}>
                ⛶
              </button>
            </div>
            <div className="widget-body d-none d-md-block">
              <DependencyHealthChecker />
            </div>
          </div>

          <div key="f" className="widget">
            <div className="widget-header">
              <div className="widget-left">
                <div className="drag-handle">⋮⋮</div>
              </div>
              <span className="widget-title">React Hooks Explorer</span>
              <button className="expand-btn" onClick={() => handleExpand("f")}>
                ⛶
              </button>
            </div>
            <div className="widget-body d-none d-md-block">
              <ReactHooksExplorer />
            </div>
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
              {expandedWidget === "d" && <RadioWidget />}
              {expandedWidget === "e" && <DependencyHealthChecker />}
              {expandedWidget === "f" && <ReactHooksExplorer />}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
