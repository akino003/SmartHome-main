import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();

  return (
    <div className="relative h-screen bg-gradient-to-b from-teal-50 to-white flex flex-col">
      <header className="absolute top-0 w-full bg-[#008388] p-4 text-white text-2xl font-bold text-center shadow-md z-20">
        SMART HOMES
      </header>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <img
          src="/bg.jpg"
          className="w-full h-full object-cover opacity-10"
          alt="background pattern"
        />
      </div>
      <main className="flex-grow flex flex-col justify-center items-center p-8 z-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-teal-800 mb-3">
            Welcome to Smart Homes!
          </h1>
          <p className="text-teal-600 text-sm">
            Your intelligent living space
          </p>
        </div>
        <div className="w-full space-y-6">
          <button
            onClick={() => navigate("/ai-insights")}
            className="w-full !rounded-button bg-gradient-to-r from-teal-600 to-teal-500 text-white p-5 flex items-center justify-center space-x-4 shadow-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
          >
            <i className="fas fa-brain text-2xl"></i>
            <span className="text-lg font-medium tracking-wide">
              AI Insights
            </span>
          </button>
          <button
            onClick={() => navigate("/chat")}
            className="w-full !rounded-button bg-white border-2 border-teal-500 text-teal-600 p-5 flex items-center justify-center space-x-4 shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
          >
            <i className="fas fa-comments text-2xl"></i>
            <span className="text-lg font-medium tracking-wide">
              Chat with Assistant
            </span>
          </button>
        </div>
      </main>
    </div>
  );
  return <div>Query id: {id}</div>;
};

export default HomePage;
