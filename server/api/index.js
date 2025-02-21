const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Groq = require("groq-sdk");

const app = express();
const port = 3000;

app.use(cors({
  origin: 'https://smart-home-main-frontend.vercel.app', // Replace with your frontend's URL
}));
app.use(bodyParser.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const MODEL_NAME = "llama-3.3-70b-versatile";

const energyData = [
  {
    deviceId: "device_10",
    deviceName: "Living Room Heater",
    startTime: "2025-02-16T10:00:00Z",
    endTime: "2025-02-16T10:30:00Z",
    duration: 1800,
    current: 2000,
    voltage: 230,
    consumption: 2.3,
    status: "completed",
  },
  {
    deviceId: "device_11",
    deviceName: "Kitchen Microwave",
    startTime: "2025-02-16T11:15:00Z",
    endTime: "2025-02-16T11:45:00Z",
    duration: 1800,
    current: 5000,
    voltage: 230,
    consumption: 5.75,
    status: "completed",
  },
  {
    deviceId: "device_10",
    deviceName: "Living Room Heater",
    startTime: "2025-02-16T12:00:00Z",
    duration: null,
    current: 1500,
    voltage: 230,
    consumption: null,
    status: "active",
  },
];

app.get("/api/data", (req, res) => {
  res.json(energyData);
});

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "Analyze the given energy consumption data and provide answers to the users questions. Don't give any reasoning. Just answer the question in a single line (not a single word)." },
        { role: "user", content: `Here is the energy consumption data: ${JSON.stringify(energyData)}. ${message}` },
      ],
      model: MODEL_NAME,
    });

    const reply = chatCompletion.choices[0]?.message?.content || "No response";
    res.json({ reply });
  } catch (error) {
    console.error("Error calling Groq API:", error);
    res.status(500).json({ error: "Failed to fetch response from Groq API" });
  }
});

module.exports = app;