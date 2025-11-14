import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SnippetManager.css";

export default function SnippetManager() {
  const [snippets, setSnippets] = useState([]);
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [selectedSnippet, setSelectedSnippet] = useState(null);
  const [category, setCategory] = useState("general");
  const [expandedIds, setExpandedIds] = useState([]); // ✅ track expanded code blocks

  const categories = ["general", "html / css", "javascript", "animations"];

  // Load from backend or localStorage
  useEffect(() => {
    const loadSnippets = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/snippets");
        setSnippets(res.data);
      } catch {
        const saved = JSON.parse(localStorage.getItem("snippets")) || [];
        setSnippets(saved);
      }
    };
    loadSnippets();
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("snippets", JSON.stringify(snippets));
  }, [snippets]);

  const handleAdd = async () => {
    if (!title || !code) return alert("Title and code are required");
    const newSnippet = { id: Date.now(), title, code, category };

    try {
      const res = await axios.post(
        "http://localhost:8080/api/snippets",
        newSnippet
      );
      setSnippets((prev) => [...prev, res.data]);
    } catch {
      setSnippets((prev) => [...prev, newSnippet]);
    }

    setTitle("");
    setCode("");
  };

  const handleUpdate = async () => {
    if (!selectedSnippet) return;
    const updated = { ...selectedSnippet, title, code };

    try {
      await axios.put(
        `http://localhost:8080/api/snippets/${selectedSnippet.id}`,
        updated
      );
    } catch {}

    setSnippets((prev) =>
      prev.map((s) => (s.id === selectedSnippet.id ? updated : s))
    );
    setSelectedSnippet(null);
    setTitle("");
    setCode("");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/snippets/${id}`);
    } catch {}
    setSnippets((prev) => prev.filter((s) => s.id !== id));
  };

  const handleEdit = (snippet) => {
    setSelectedSnippet(snippet);
    setTitle(snippet.title);
    setCode(snippet.code);
  };

  // ✅ Collapse toggle
  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // ✅ Copy to clipboard
  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="snippet-manager">
      <h3>Snippet Manager</h3>

      {/* Form */}
      <div className="snippet-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <textarea
          placeholder="Your code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        ></textarea>

        {selectedSnippet ? (
          <div className="update-btn">
            <button onClick={handleUpdate}>Update Snippet</button>
          </div>
        ) : (
          <div className="add-btn ms-auto me-5">
            <button onClick={handleAdd} className="">
              Add Snippet
            </button>
          </div>
        )}
      </div>

      {/* Category Filter */}
      <div className="category-filter">
        {categories.map((cat) => (
          <button
            key={cat}
            className={cat === category ? "active" : ""}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Snippet List */}
      <ul className="snippet-list">
        {snippets
          .filter((s) => s.category === category)
          .map((s) => {
            const isExpanded = expandedIds.includes(s.id);
            return (
              <li key={s.id} className="snippet-item">
                <div className="snippet-header d-flex justify-content-between align-items-center flex-column">
                  <strong>{s.title}</strong>
                  <div className="actions">
                    <div className="snippet-buttons">
                      {" "}
                      <button onClick={() => toggleExpand(s.id)}>
                        {isExpanded ? "Collapse" : "Expand"}
                      </button>
                      <button onClick={() => copyCode(s.code)}>Copy</button>
                      <button onClick={() => handleEdit(s)}>Edit</button>
                      <button onClick={() => handleDelete(s.id)}>Delete</button>
                    </div>
                  </div>
                </div>

                {/* Code Block (collapsible) */}
                <div
                  className={`code-block ${
                    isExpanded ? "expanded" : "collapsed"
                  }`}
                >
                  <pre>{s.code}</pre>
                </div>

                {/* Live HTML Preview */}
                <div
                  className="snippet-preview"
                  dangerouslySetInnerHTML={{ __html: s.code }}
                ></div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
