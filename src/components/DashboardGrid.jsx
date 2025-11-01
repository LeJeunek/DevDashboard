import React, { useEffect, useState } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./DashboardGrid.css";

import SnippetManager from "./widgets/SnippetManager.jsx";
import TipsWidget from "./widgets/TipsWidget.jsx";
import RadioWidget from "./widgets/RadioWidget.jsx";
import DependencyHealthChecker from "./widgets/DependencyHealthChecker.jsx";
import ReactHooksExplorer from "./widgets/ReactHooksExplorer.jsx";
import CollapsibleTasks from "./CollapsibleTasks.jsx";

export default function DashboardGrid({ collapsed }) {
  const sidebarWidth = collapsed ? 80 : 250;
  const [gridWidth, setGridWidth] = useState(window.innerWidth - sidebarWidth);
  const [expandedWidget, setExpandedWidget] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setGridWidth(window.innerWidth - sidebarWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [sidebarWidth]);

  const layout = [
    { i: "a", x: 0.5, y: 3, w: 3, h: 3 },
    { i: "b", x: 0.5, y: 3, w: 3, h: 3 },
    { i: "c", x: 3.5, y: 3, w: 3, h: 3 },
    { i: "d", x: 3.5, y: 6, w: 3, h: 3 },
    { i: "e", x: 6.5, y: 6, w: 3, h: 3 },
    { i: "f", x: 6.5, y: 6, w: 3, h: 3 },
  ];

  return (
    <>
      <CollapsibleTasks />

      <div
        className={`dashboard-grid ${collapsed ? "collapsed" : "with-sidebar"}`}
      >
        <GridLayout
          className={`layout ${expandedWidget ? "blurred" : ""}`}
          layout={layout}
          cols={12}
          rowHeight={100}
          width={gridWidth}
          isDraggable={!expandedWidget}
          isResizable={!expandedWidget}
          draggableHandle=".drag-handle"
          margin={[20, 20]}
          containerPadding={[20, 20]}
        >
          {/* === WIDGET A: Snippet Manager === */}
          <div key="a" className="widget">
            <div className="widget-header">
              <div className="widget-left">
                <span className="drag-handle">☰</span>
                <span className="widget-title">Snippet Manager</span>
              </div>
              <button
                className="expand-btn"
                onClick={() => setExpandedWidget("a")}
              >
                ⤢
              </button>
            </div>
            <div className="widget-body">
              <SnippetManager />
            </div>
          </div>

          {/* === WIDGET B: Color Palette Placeholder === */}
          <div key="b" className="widget">
            <div className="widget-header">
              <div className="widget-left">
                <span className="drag-handle">☰</span>
                <span className="widget-title">Color Palette</span>
              </div>
              <button
                className="expand-btn"
                onClick={() => setExpandedWidget("b")}
              >
                ⤢
              </button>
            </div>
            <div className="widget-body">Color Palette Widget</div>
          </div>

          {/* === WIDGET C: Tips === */}
          <div key="c" className="widget">
            <div className="widget-header">
              <div className="widget-left">
                <span className="drag-handle">☰</span>
                <span className="widget-title">Tips</span>
              </div>
              <button
                className="expand-btn"
                onClick={() => setExpandedWidget("c")}
              >
                ⤢
              </button>
            </div>
            <div className="widget-body">
              <TipsWidget />
            </div>
          </div>

          {/* === WIDGET D: Radio === */}
          <div key="d" className="widget">
            <div className="widget-header">
              <div className="widget-left">
                <span className="drag-handle">☰</span>
                <span className="widget-title">Radio</span>
              </div>
              <button
                className="expand-btn"
                onClick={() => setExpandedWidget("d")}
              >
                ⤢
              </button>
            </div>
            <div className="widget-body">
              <RadioWidget />
            </div>
          </div>

          {/* === WIDGET E: Dependency Checker === */}
          <div key="e" className="widget">
            <div className="widget-header">
              <div className="widget-left">
                <span className="drag-handle">☰</span>
                <span className="widget-title">Dependency Health</span>
              </div>
              <button
                className="expand-btn"
                onClick={() => setExpandedWidget("e")}
              >
                ⤢
              </button>
            </div>
            <div className="widget-body">
              <DependencyHealthChecker />
            </div>
          </div>

          {/* === WIDGET F: React Hooks Explorer === */}
          <div key="f" className="widget">
            <div className="widget-header">
              <div className="widget-left">
                <span className="drag-handle">☰</span>
                <span className="widget-title">React Hooks Explorer</span>
              </div>
              <button
                className="expand-btn"
                onClick={() => setExpandedWidget("f")}
              >
                ⤢
              </button>
            </div>
            <div className="widget-body">
              <ReactHooksExplorer />
            </div>
          </div>
        </GridLayout>

        {/* === EXPANDED OVERLAY === */}
        {expandedWidget && (
          <div
            className="expanded-overlay"
            onClick={() => setExpandedWidget(null)}
          >
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
