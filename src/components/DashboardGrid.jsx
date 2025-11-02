import React, { useEffect, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
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

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function DashboardGrid({ collapsed }) {
  const [expandedWidget, setExpandedWidget] = useState(null);
  const [rowHeight, setRowHeight] = useState(
    window.innerWidth < 768 ? 120 : 80
  );
  const [resizable, setResizable] = useState(window.innerWidth >= 768);

  // update on resize
  useEffect(() => {
    const handleResize = () => {
      setRowHeight(window.innerWidth < 768 ? 120 : 80);
      setResizable(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Responsive settings
  const breakpoints = { xl: 1600, lg: 1200, md: 992, sm: 768, xs: 480, xxs: 0 };
  const cols = { xl: 12, lg: 12, md: 10, sm: 6, xs: 2, xxs: 1 };

  // Adjusted margins (less top padding)
  const margins = {
    xl: [40, 20],
    lg: [20, 10],
    md: [15, 10],
    sm: [10, 10],
    xs: [8, 8],
    xxs: [5, 5],
  };

  // Adjusted container padding to reduce top spacing
  const containerPadding = {
    xl: [40, 40],
    lg: [20, 10],
    md: [15, 10],
    sm: [10, 10],
    xs: [8, 8],
    xxs: [5, 5],
  };

  // Layouts per breakpoint
  const layouts = {
    xl: [
      { i: "a", x: 0, y: 0, w: 3, h: 3 },
      { i: "b", x: 3, y: 0, w: 3, h: 3 },
      { i: "c", x: 6, y: 0, w: 3, h: 3 },
      { i: "d", x: 9, y: 0, w: 3, h: 3 },
      { i: "e", x: 0, y: 3, w: 3, h: 3 },
      { i: "f", x: 3, y: 3, w: 3, h: 3 },
    ],
    lg: [
      { i: "a", x: 0, y: 0, w: 3, h: 3 },
      { i: "b", x: 3, y: 0, w: 3, h: 3 },
      { i: "c", x: 6, y: 0, w: 3, h: 3 },
      { i: "d", x: 6, y: 0, w: 3, h: 3 },
      { i: "e", x: 0, y: 3, w: 3, h: 3 },
      { i: "f", x: 3, y: 3, w: 3, h: 3 },
    ],
    md: [
      { i: "a", x: 0, y: 0, w: 5, h: 3 },
      { i: "b", x: 5, y: 0, w: 5, h: 3 },
      { i: "c", x: 0, y: 3, w: 5, h: 3 },
      { i: "d", x: 5, y: 3, w: 5, h: 3 },
      { i: "e", x: 0, y: 6, w: 5, h: 3 },
      { i: "f", x: 5, y: 6, w: 5, h: 3 },
    ],
    sm: [
      { i: "a", x: 0, y: 0, w: 6, h: 3 },
      { i: "b", x: 0, y: 3, w: 6, h: 3 },
      { i: "c", x: 0, y: 6, w: 6, h: 3 },
      { i: "d", x: 0, y: 9, w: 6, h: 3 },
      { i: "e", x: 0, y: 12, w: 6, h: 3 },
      { i: "f", x: 0, y: 15, w: 6, h: 3 },
    ],
  };

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
        <ResponsiveGridLayout
          className={`layout ${expandedWidget ? "blurred" : ""}`}
          layouts={layouts}
          breakpoints={breakpoints}
          cols={cols}
          rowHeight={rowHeight}
          isDraggable={!expandedWidget}
          isResizable={resizable}
          draggableHandle=".drag-handle"
          margin={margins}
          containerPadding={containerPadding}
          // ⚠️ Do NOT manually set width here
        >
          {widgets.map(({ key, title, img }) => (
            <div
              key={key}
              className="widget"
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
        </ResponsiveGridLayout>

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
