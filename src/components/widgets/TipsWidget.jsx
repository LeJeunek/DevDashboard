// src/pages/Tips.jsx
import React from "react";
import "./TipsWidget.css";

export default function TipsWidget({ compact = false }) {
  const tips = [
    {
      title: "Centering in CSS",
      preview: (
        <div className="center-container">
          <div className="center-box">Centered</div>
        </div>
      ),
      code: `
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.center-box {
  background: #0dcaf0;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  color: #121212;
  font-weight: 600;
}
      `,
      note: "Use flexbox for simple vertical and horizontal centering.",
    },
    {
      title: "Responsive Font Sizes",
      preview: <div className="responsive-font">Resize the window</div>,
      code: `
.responsive-font {
  font-size: clamp(1rem, 5vw, 2.5rem);
  color: #0dcaf0;
  font-weight: bold;
}
      `,
      note: "The clamp() function scales text smoothly between min and max sizes.",
    },
    {
      title: "Gradient Borders",
      preview: <div className="gradient-border">Gradient Border</div>,
      code: `
.gradient-border {
  border: 3px solid transparent;
  border-image: linear-gradient(90deg, #0dcaf0, #6610f2);
  border-image-slice: 1;
  padding: 0.75rem 1.25rem;
  border-radius: 10px;
  color: #fafafa;
}
      `,
      note: "Use gradient borders without pseudo-elements using border-image.",
    },
    {
      title: "Glassmorphism Effect",
      preview: <div className="glass-box">Glassmorphic Card</div>,
      code: `
.glass-box {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  backdrop-filter: blur(8px);
  padding: 1rem 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fafafa;
}
      `,
      note: "Creates a frosted glass look for modern UIs.",
    },
    {
      title: "Dark Mode with CSS Variables",
      preview: <div className="theme-box">Toggle theme in code</div>,
      code: `
:root {
  --bg-color: #fff;
  --text-color: #000;
}

[data-theme="dark"] {
  --bg-color: #121212;
  --text-color: #fafafa;
}

.theme-box {
  background: var(--bg-color);
  color: var(--text-color);
  padding: 1rem 1.5rem;
  border-radius: 10px;
}
      `,
      note: "Switch themes easily using a data-theme attribute and CSS variables.",
    },
  ];

  return (
    <div className={`tips-page ${compact ? "compact" : ""}`}>
      <h2>CSS Tips & Tricks</h2>
      <p className="tips-subtitle">Useful snippets to improve your workflow</p>

      <div className="tips-list">
        {tips.map((tip, i) => (
          <div className="tip-card" key={i}>
            <h3>{tip.title}</h3>

            <div className="tips-preview">{tip.preview}</div>

            <pre>
              <code>{tip.code}</code>
            </pre>
            <p>{tip.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
