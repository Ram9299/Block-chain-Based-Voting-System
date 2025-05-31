import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage";
import VotePage from "./pages/VotePage";
import StatusPage from "./pages/StatusPage";
import ResultsPage from "./pages/ResultsPage";
import VoterListPage from "./pages/VoterListPage";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/vote" element={<VotePage />} />
          <Route path="/status" element={<StatusPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/voters" element={<VoterListPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
