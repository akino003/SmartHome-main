import { useState, useEffect } from "react";

const AIInsightsPage = () => {
  const [summary, setSummary] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch("http://localhost:3001/ai-insights");
        const data = await response.json();
        setSummary(data.summary || "No summary available.");
      } catch (error) {
        console.error("Error fetching summary:", error);
        setSummary("Failed to fetch energy summary.");
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full bg-[#008388] p-4 flex items-center text-white shadow-md">
        <button onClick={() => window.history.back()} className="text-white text-lg font-bold mr-4">
          ← 
        </button>
        <h1 className="text-2xl font-bold flex-grow text-center">SMART HOMES</h1>
      </header>

      {/* Insights Section */}
      <main className="flex-grow flex flex-col justify-center items-center p-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Overall Energy Consumption Summary</h2>
        <p className="text-lg bg-white shadow-md p-4 rounded-lg max-w-2xl">
          {summary}
        </p>
      </main>
    </div>
  );
};

export default AIInsightsPage;