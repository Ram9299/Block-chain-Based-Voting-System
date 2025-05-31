// src/components/Results.js
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import ABI from "../utils/contractABI.json";
import { CONTRACT_ADDRESS } from "../utils/config";

const Results = () => {
  const [candidates, setCandidates] = useState([]);
  const [message, setMessage] = useState("");

  const fetchResults = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const candidateList = await contract.getAllCandidates();
      setCandidates(candidateList);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to fetch results.");
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">Election Results</h2>

      {message && <p className="text-center text-red-500">{message}</p>}

      {candidates.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {candidates.map((candidate, index) => (
            <li key={index} className="py-2">
              <div className="flex justify-between">
                <span className="font-medium">{candidate.name}</span>
                <span className="text-blue-700">{candidate.voteCount.toString()} votes</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        !message && <p className="text-center">No candidates found.</p>
      )}
    </div>
  );
};

export default Results;
