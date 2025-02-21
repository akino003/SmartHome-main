
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import ChatPage from "./ChatPage";
import AIInsightsPage from "./AIInsightsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/ai-insights" element={<AIInsightsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
