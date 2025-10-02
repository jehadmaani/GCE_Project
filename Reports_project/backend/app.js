import express from "express";
import bodyParser from "body-parser";
import fs from "node:fs/promises";

const app = express();
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Root route
app.get("/", (req, res) => {
  res.send("Backend server is running. Use /events to get all reports.");
});

// GET all events
app.get("/events", async (req, res) => {
  try {
    const data = await fs.readFile("./data/events.json", "utf-8");
    const events = JSON.parse(data);
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to read events file" });
  }
});

// GET single event by id
app.get("/events/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fs.readFile("./data/events.json", "utf-8");
    const events = JSON.parse(data);

    const event = events.find((e) => e.id === id || e.id === Number(id));
    if (!event) return res.status(404).json({ message: "Event not found" });

    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to read events file" });
  }
});

// POST new event
app.post("/events", async (req, res) => {
  try {
    const { event } = req.body;
    if (!event) return res.status(400).json({ message: "Event data required" });

    const data = await fs.readFile("./data/events.json", "utf-8");
    const events = JSON.parse(data);

    const newEvent = { id: Date.now().toString(), ...event };
    events.push(newEvent);

    await fs.writeFile("./data/events.json", JSON.stringify(events, null, 2));
    res.json(newEvent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add event" });
  }
});

// PUT update event
app.put("/events/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { event } = req.body;

    const data = await fs.readFile("./data/events.json", "utf-8");
    const events = JSON.parse(data);

    const index = events.findIndex((e) => e.id === id || e.id === Number(id));
    if (index === -1)
      return res.status(404).json({ message: "Event not found" });

    events[index] = { id, ...event };
    await fs.writeFile("./data/events.json", JSON.stringify(events, null, 2));
    res.json(events[index]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update event" });
  }
});

// DELETE event
app.delete("/events/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const data = await fs.readFile("./data/events.json", "utf-8");
    let events = JSON.parse(data);

    events = events.filter((e) => e.id !== id && e.id !== Number(id));
    await fs.writeFile("./data/events.json", JSON.stringify(events, null, 2));
    res.json({ message: "Event deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete event" });
  }
});

// Start server
app.listen(4000, () => console.log("Server running on http://localhost:4000"));
