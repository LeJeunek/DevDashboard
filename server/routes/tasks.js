import express from "express";
import Database from "better-sqlite3";
import db from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM tasks").all();
    res.json(rows.map((t) => ({ ...t, done: !!t.done })));
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Database error" });
  }
});

router.post("/", (req, res) => {
  try {
    const { text } = req.body;
    if (!text?.trim()) {
      return res.status(400).json({ error: "Missing text" });
    }

    const stmt = db.prepare("INSERT INTO tasks (text) VALUES (?)");
    const result = stmt.run(text);

    const newTask = db
      .prepare("SELECT * FROM tasks WHERE id = ?")
      .get(result.lastInsertRowid);

    res.json({ ...newTask, done: !!newTask.done });
  } catch (err) {
    console.error("Error inserting task:", err);
    res.status(500).json({ error: "Database error" });
  }
});

router.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const current = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
    if (!current) return res.status(404).json({ error: "Task not found" });

    const newDone = current.done ? 0 : 1;
    db.prepare("UPDATE tasks SET done = ? WHERE id = ?").run(newDone, id);

    const updated = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
    res.json({ ...updated, done: !!updated.done });
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ error: "Database error" });
  }
});

router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    db.prepare("DELETE FROM tasks WHERE id = ?").run(id);
    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
