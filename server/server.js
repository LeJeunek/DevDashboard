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

app.get("/api/radio/:tag", async (req, res) => {
  try {
    const { tag } = req.params;
    const { country } = req.query;

    const countryMap = {
      US: "United States",
      CA: "Canada",
      GB: "United Kingdom",
      FR: "France",
    };

    let stations = [];

    if (country && countryMap[country]) {
      // Fetch stations by country first
      const fullCountry = encodeURIComponent(countryMap[country]);
      const countryResponse = await fetch(
        `https://de1.api.radio-browser.info/json/stations/bycountry/${fullCountry}`
      );
      stations = await countryResponse.json();
    } else {
      // No country filter, fetch all stations
      const response = await fetch(
        `https://de1.api.radio-browser.info/json/stations`
      );
      stations = await response.json();
    }

    // Filter by genre/tag
    if (tag) {
      const tagLower = tag.toLowerCase();
      stations = stations.filter(
        station => station.tags && station.tags.toLowerCase().includes(tagLower)
      );
    }

    // Limit to 12 stations for layout
    stations = stations.slice(0, 12);

    res.json(stations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch radio stations" });
  }
});





const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
