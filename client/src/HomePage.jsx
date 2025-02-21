
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full bg-[#008388] p-4 text-white text-2xl font-bold text-center shadow-md">
        SMART HOMES
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col justify-center items-center p-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Smart Homes!</h1>
        <div className="flex flex-col space-y-6"> {/* Added vertical spacing */}
          <button
            onClick={() => navigate("/ai-insights")}
            className="bg-[#008388] text-white px-6 py-3 text-lg font-semibold rounded-lg shadow-md hover:opacity-90"
          >
            AI Insights
          </button>
          <button
            onClick={() => navigate("/chat")}
            className="bg-[#008388] text-white px-6 py-3 text-lg font-semibold rounded-lg shadow-md hover:opacity-90"
          >
            Chat with Assistant
          </button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;