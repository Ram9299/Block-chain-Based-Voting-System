// src/components/Vote.js
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import ABI from "../utils/contractABI.json";
import { CONTRACT_ADDRESS } from "../utils/config";

const Vote = () => {
  const [uniqueId, setUniqueId] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      if (!window.ethereum) return alert("Please install MetaMask.");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const count = await contract.getCandidateCount();
      const list = [];

      for (let i = 0; i < count; i++) {
        const candidate = await contract.getCandidate(i);
        list.push({ id: i, name: candidate[0], voteCount: candidate[1] });
      }

      setCandidates(list);
    } catch (err) {
      console.error("Error fetching candidates:", err);
    }
  };

  const handleVote = async () => {
    try {
      setMessage("");

      if (!uniqueId || selectedCandidate === null) {
        return setMessage("❌ Please enter your Unique ID and select a candidate.");
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const tx = await contract.vote(uniqueId, selectedCandidate);
      await tx.wait();

      setMessage("✅ Vote cast successfully!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to vote. Make sure you are registered and haven't voted already.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow mt-10">
      <h2 className="text-xl font-semibold mb-4">Cast Your Vote</h2>

      <input
        type="text"
        placeholder="Enter Unique ID"
        value={uniqueId}
        onChange={(e) => setUniqueId(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-4"
      />

      <select
        value={selectedCandidate ?? ""}
        onChange={(e) => setSelectedCandidate(parseInt(e.target.value))}
        className="w-full border px-3 py-2 rounded mb-4"
      >
        <option value="" disabled>
          Select a candidate
        </option>
        {candidates.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <button
        onClick={handleVote}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Vote
      </button>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default Vote;
