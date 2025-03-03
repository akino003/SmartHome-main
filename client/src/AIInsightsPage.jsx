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
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 w-full bg-white shadow-sm z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => window.history.back()} className="text-teal-600 text-lg font-bold">
            ←
          </button>
          <h1 className="font-medium text-gray-800">AI Insights</h1>
          <i className="fas fa-robot text-teal-600 text-xl"></i>
        </div>
      </header>
      <div className="pt-20 px-4 flex flex-col justify-center items-center">
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Overall Energy Consumption Summary
          </h2>
          <p className="text-lg text-gray-700">
            {summary}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIInsightsPage;
