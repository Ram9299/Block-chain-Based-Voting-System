// src/components/AdminPanel.js
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import ABI from "../utils/contractABI.json";
import { CONTRACT_ADDRESS } from "../utils/config";

const AdminPanel = () => {
  const [candidateName, setCandidateName] = useState("");
  const [message, setMessage] = useState("");
  const [electionActive, setElectionActive] = useState(false);

  // ✅ Fetch current election status
  const fetchElectionStatus = async () => {
    try {
      if (!window.ethereum) {
        setMessage("❌ Please install MetaMask.");
        return;
      }
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
      const status = await contract.electionActive();
      setElectionActive(status);
    } catch (error) {
      console.error("Error fetching election status:", error);
      setMessage("❌ Failed to fetch election status.");
    }
  };

  useEffect(() => {
    fetchElectionStatus();
  }, []);

  // ✅ Add candidate
  const handleAddCandidate = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (!candidateName.trim()) {
        return setMessage("❌ Candidate name cannot be empty.");
      }

      if (!window.ethereum) {
        return setMessage("❌ Please install MetaMask.");
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const tx = await contract.addCandidate(candidateName);
      await tx.wait();

      setCandidateName("");
      setMessage("✅ Candidate added successfully!");
    } catch (error) {
      console.error("Add candidate error:", error);
      setMessage(`❌ Error: ${error.reason || error.message}`);
    }
  };

  // ✅ Toggle election status
  const handleToggleElection = async () => {
    try {
      if (!window.ethereum) {
        return setMessage("❌ Please install MetaMask.");
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const tx = await contract.toggleElectionStatus();
      await tx.wait();

      const updatedStatus = await contract.electionActive();
      setElectionActive(updatedStatus);

      setMessage(updatedStatus ? "✅ Election started!" : "🛑 Election stopped.");
    } catch (error) {
      console.error("Toggle error:", error);
      setMessage(`❌ Error: ${error.reason || error.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Admin Panel</h2>

      {message && <p className="text-center mb-4 text-blue-600">{message}</p>}

      <form onSubmit={handleAddCandidate} className="space-y-4">
        <input
          type="text"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
          placeholder="Candidate Name"
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Add Candidate
        </button>
      </form>

      <button
        onClick={handleToggleElection}
        className={`w-full mt-4 py-2 rounded text-white ${
          electionActive ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {electionActive ? "Stop Election" : "Start Election"}
      </button>
    </div>
  );
};

export default AdminPanel;
