// src/components/widgets/ReactHooksExplorer.jsx
import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";

// Register languages manually

import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";

const hooksData = [
  {
    name: "useState",
    description:
      "Allows you to add state to a functional component. Updates trigger re-renders.",
    example: `function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}`,
  },
  {
    name: "useEffect",
    description:
      "Runs side effects after render, such as fetching data or subscribing to events.",
    example: `function Timer() {
  const [seconds, setSeconds] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);
  return <p>Seconds: {seconds}</p>;
}`,
  },
  {
    name: "useMemo",
    description:
      "Memoizes a computed value to prevent unnecessary recalculations.",
    example: `function ExpensiveCalc({ num }) {
  const result = React.useMemo(() => {
    console.log("Calculating...");
    return num * 2;
  }, [num]);
  return <p>Result: {result}</p>;
}`,
  },
];

const ReactHooksExplorer = () => {
  const [activeHook, setActiveHook] = useState("useState");
  const hook = hooksData.find((h) => h.name === activeHook);

  return (
    <div>
      <h5 className="mb-3">React Hooks Explorer</h5>
      <Tabs
        activeKey={activeHook}
        onSelect={(k) => setActiveHook(k)}
        className="mb-3"
        justify
      >
        {hooksData.map((h) => (
          <Tab eventKey={h.name} title={h.name} key={h.name}>
            <p>{h.description}</p>
            <h6>Code Example:</h6>

            {h.example}

            <h6 className="mt-3">Try it Live:</h6>
            <LiveProvider code={h.example} noInline={false} scope={{ React }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    border: "1px solid #444",
                    borderRadius: "6px",
                    overflow: "hidden",
                  }}
                >
                  <LiveEditor
                    style={{
                      background: "#1e1e1e",
                      color: "#fff",
                      fontSize: "0.85rem",
                      minHeight: "150px",
                    }}
                  />
                  <LiveError
                    style={{ color: "red", background: "#222", padding: "5px" }}
                  />
                </div>
                <div
                  style={{
                    background: "#111",
                    padding: "10px",
                    borderRadius: "6px",
                    minHeight: "150px",
                  }}
                >
                  <LivePreview />
                </div>
              </div>
            </LiveProvider>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default ReactHooksExplorer;
