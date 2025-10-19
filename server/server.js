import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const __dirname = path.resolve();
const snippetsFile = path.join(__dirname, "data", "snippets.json");

// Helper: read file
function readSnippets() {
  const data = fs.readFileSync(snippetsFile, "utf-8");
  return JSON.parse(data);
}

// Helper: write file
function writeSnippets(snippets) {
  fs.writeFileSync(snippetsFile, JSON.stringify(snippets, null, 2));
}

// GET all snippets
app.get("/api/snippets", (req, res) => {
  const snippets = readSnippets();
  res.json(snippets);
});

// POST new snippet
app.post("/api/snippets", (req, res) => {
  const snippets = readSnippets();
  const newSnippet = { id: Date.now(), ...req.body };
  snippets.push(newSnippet);
  writeSnippets(snippets);
  res.json(newSnippet);
});

// PUT (update)
app.put("/api/snippets/:id", (req, res) => {
  const snippets = readSnippets();
  const id = Number(req.params.id);
  const updated = snippets.map(s => s.id === id ? { ...s, ...req.body } : s);
  writeSnippets(updated);
  res.json({ success: true });
});

// DELETE
app.delete("/api/snippets/:id", (req, res) => {
  const snippets = readSnippets();
  const id = Number(req.params.id);
  const filtered = snippets.filter(s => s.id !== id);
  writeSnippets(filtered);
  res.json({ success: true });
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
