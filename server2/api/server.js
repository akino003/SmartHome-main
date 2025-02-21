require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Groq = require("groq-sdk");

const app = express();
const port = 3001;

app.use(cors());
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
    deviceId: "device_12",
    deviceName: "Bedroom Air Conditioner",
    startTime: "2025-02-16T12:00:00Z",
    endTime: "2025-02-16T14:00:00Z",
    duration: 7200,
    current: 3500,
    voltage: 230,
    consumption: 8.05,
    status: "completed",
  },
];


app.get("/ai-insights", async (req, res) => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "Summarize the overall energy consumption data of smart home devices in a user readable format.Just give the summary nothing else" },
        { role: "user", content: `Here is the energy consumption data: ${JSON.stringify(energyData)}` },
      ],
      model: MODEL_NAME,
    });

    const summary = chatCompletion.choices[0]?.message?.content || "No summary available";
    res.json({ summary });
  } catch (error) {
    console.error("Error calling Groq API:", error);
    res.status(500).json({ error: "Failed to fetch summary from Groq API" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});