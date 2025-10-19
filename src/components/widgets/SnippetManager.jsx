import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SnippetManager.css";

export default function SnippetManager() {
  const [snippets, setSnippets] = useState([]);
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [selectedSnippet, setSelectedSnippet] = useState(null);

  // ✅ Load snippets from server (if available), fallback to localStorage
  useEffect(() => {
    const loadSnippets = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/snippets");
        setSnippets(res.data);
      } catch (err) {
        console.warn("Server not reachable, loading from localStorage...");
        const saved = JSON.parse(localStorage.getItem("snippets")) || [];
        setSnippets(saved);
      }
    };
    loadSnippets();
  }, []);

  // ✅ Sync with localStorage for dev-persistence
  useEffect(() => {
    localStorage.setItem("snippets", JSON.stringify(snippets));
  }, [snippets]);

  const handleAdd = async () => {
    if (!title || !code) return alert("Title and code are required");

    const newSnippet = { id: Date.now(), title, code };

    try {
      const res = await axios.post(
        "http://localhost:8080/api/snippets",
        newSnippet
      );
      setSnippets((prev) => [...prev, res.data]);
    } catch {
      // fallback for local mode
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
    } catch {
      // ignore if no backend yet
    }

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
    } catch {
      // ignore if local only
    }

    setSnippets((prev) => prev.filter((s) => s.id !== id));
  };

  const handleEdit = (snippet) => {
    setSelectedSnippet(snippet);
    setTitle(snippet.title);
    setCode(snippet.code);
  };

  return (
    <div className="snippet-manager">
      <h3>Snippet Manager</h3>

      <div className="snippet-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Your code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        ></textarea>

        {selectedSnippet ? (
          <button onClick={handleUpdate}>Update Snippet</button>
        ) : (
          <button onClick={handleAdd}>Add Snippet</button>
        )}
      </div>

      <ul className="snippet-list">
        {snippets.map((s) => (
          <li key={s.id}>
            <strong>{s.title}</strong>
            <div className="actions">
              <button onClick={() => handleEdit(s)}>Edit</button>
              <button onClick={() => handleDelete(s.id)}>Delete</button>
            </div>
            <pre>{s.code}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
}
