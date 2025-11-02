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

import boombox from "../assets/boombox-primary.png";
import tip from "../assets/lightbulb.png";
import health from "../assets/health.png";
import palette from "../assets/palette.png";
import code from "../assets/code.png";

export default function DashboardGrid({ collapsed }) {
  const sidebarWidth = collapsed ? 100 : 250;
  const [gridWidth, setGridWidth] = useState(window.innerWidth - sidebarWidth);
  const [expandedWidget, setExpandedWidget] = useState(null);
  const [cols, setCols] = useState(window.innerWidth < 768 ? 1 : 12);
  const [rowHeight, setRowHeight] = useState(
    window.innerWidth < 768 ? 120 : 80
  );
  const [resizable, setResizable] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth - sidebarWidth;
      setGridWidth(w);
      setCols(window.innerWidth < 768 ? 1 : 12);
      setRowHeight(window.innerWidth < 768 ? 120 : 80);
      setResizable(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [sidebarWidth]);

  const layout = [
    { i: "a", x: 0, y: 0, w: 3, h: 3 },
    { i: "b", x: 3, y: 0, w: 3, h: 3 },
    { i: "c", x: 6, y: 0, w: 3, h: 3 },
    { i: "d", x: 9, y: 0, w: 3, h: 3 },
    { i: "e", x: 0, y: 3, w: 3, h: 3 },
    { i: "f", x: 3, y: 3, w: 3, h: 3 },
  ];

  const widgets = [
    {
      key: "a",
      title: "Snippet Manager",
      img: code,
      content: <SnippetManager />,
    },
    {
      key: "b",
      title: "Color Palette",
      img: palette,
      content: <div>Color Palette Full View</div>,
    },
    { key: "c", title: "Tips & Tricks", img: tip, content: <TipsWidget /> },
    { key: "d", title: "Radio Player", img: boombox, content: <RadioWidget /> },
    {
      key: "e",
      title: "Dependency Checker",
      img: health,
      content: <DependencyHealthChecker />,
    },
    {
      key: "f",
      title: "Hooks Explorer",
      img: palette,
      content: <ReactHooksExplorer />,
    },
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
          cols={cols}
          rowHeight={rowHeight}
          width={gridWidth}
          isDraggable={!expandedWidget}
          isResizable={resizable}
          draggableHandle=".drag-handle"
          margin={[20, 60]}
          containerPadding={[100, 20]}
        >
          {widgets.map(({ key, title, img }) => (
            <div
              key={key}
              className="widget mx-4 "
              onClick={() => setExpandedWidget(key)}
            >
              <div className="widget-header">
                <div className="widget-left">
                  <span className="drag-handle">☰</span>
                </div>
              </div>
              <div className="widget-thumbnail">
                <div className="thumbnail">
                  {title}
                  <div className="thumbnail-img">
                    <img src={img} alt={title} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </GridLayout>

        {/* Expanded overlay */}
        {expandedWidget && (
          <div
            className="expanded-overlay"
            onClick={() => setExpandedWidget(null)}
          >
            <div
              className="expanded-content"
              onClick={(e) => e.stopPropagation()}
            >
              {widgets.find((w) => w.key === expandedWidget)?.content}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
