// src/components/widgets/DependencyHealthChecker.jsx
import React, { useState } from "react";
import { Button, Table, Form, Spinner, Alert } from "react-bootstrap";

const DependencyHealthChecker = () => {
  const [packageJson, setPackageJson] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheck = async () => {
    setError("");
    setResults([]);
    if (!packageJson.trim()) {
      setError("Please paste your package.json first.");
      return;
    }

    let parsed;
    try {
      parsed = JSON.parse(packageJson);
    } catch (err) {
      setError("Invalid JSON format.");
      return;
    }

    const deps = {
      ...parsed.dependencies,
      ...parsed.devDependencies,
    };
    if (!deps || Object.keys(deps).length === 0) {
      setError("No dependencies found in package.json.");
      return;
    }

    setLoading(true);
    const resultsArray = [];
    for (const [name, currentVersion] of Object.entries(deps)) {
      try {
        const res = await fetch(`https://registry.npmjs.org/${name}`);
        const data = await res.json();
        const latest = data["dist-tags"]?.latest || "Unknown";
        const isOutdated =
          latest !== "Unknown" &&
          currentVersion.replace("^", "").replace("~", "") !== latest;

        resultsArray.push({
          name,
          current: currentVersion,
          latest,
          status: isOutdated ? "Outdated" : "Up-to-date",
        });
      } catch (err) {
        resultsArray.push({
          name,
          current: currentVersion,
          latest: "Error fetching",
          status: "Error",
        });
      }
    }
    setResults(resultsArray);
    setLoading(false);
  };

  return (
    <div>
      <h5 className="mb-3">Dependency Health Checker</h5>
      <Form.Group className="mb-3">
        <Form.Control
          as="textarea"
          rows={6}
          placeholder="Paste your package.json here..."
          value={packageJson}
          onChange={(e) => setPackageJson(e.target.value)}
        />
      </Form.Group>
      <Button onClick={handleCheck} disabled={loading}>
        {loading ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />{" "}
            Checking...
          </>
        ) : (
          "Check Updates"
        )}
      </Button>
      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}

      {results.length > 0 && (
        <Table striped bordered hover responsive size="sm" className="mt-3">
          <thead>
            <tr>
              <th>Package</th>
              <th>Current</th>
              <th>Latest</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr
                key={r.name}
                className={
                  r.status === "Outdated"
                    ? "table-warning"
                    : r.status === "Error"
                    ? "table-danger"
                    : "table-success"
                }
              >
                <td>{r.name}</td>
                <td>{r.current}</td>
                <td>{r.latest}</td>
                <td>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default DependencyHealthChecker;
