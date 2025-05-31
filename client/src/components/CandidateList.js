// src/components/CandidateList.js
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import ABI from "../utils/contractABI.json";
import { CONTRACT_ADDRESS } from "../utils/config";

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [message, setMessage] = useState("");

  const fetchCandidates = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const allCandidates = await contract.getAllCandidates();
      setCandidates(allCandidates);
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to load candidates.");
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Candidate List</h2>

      {message && <p className="text-red-500 text-center">{message}</p>}

      {candidates.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {candidates.map((candidate, index) => (
            <li key={index} className="py-2 flex justify-between">
              <span>{candidate.name}</span>
              <span className="text-sm text-gray-500">
                {candidate.voteCount.toString()} votes
              </span>
            </li>
          ))}
        </ul>
      ) : (
        !message && <p className="text-center">No candidates available.</p>
      )}
    </div>
  );
};

export default CandidateList;
