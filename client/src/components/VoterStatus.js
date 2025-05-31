// src/components/VoterStatus.js
import React, { useState } from "react";
import { ethers } from "ethers";
import ABI from "../utils/contractABI.json";
import { CONTRACT_ADDRESS } from "../utils/config";

const VoterStatus = () => {
  const [uniqueId, setUniqueId] = useState("");
  const [voterInfo, setVoterInfo] = useState(null);
  const [message, setMessage] = useState("");

  const checkStatus = async () => {
    setMessage("");
    setVoterInfo(null);

    if (!uniqueId) {
      return setMessage("❌ Please enter a Unique ID.");
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const [name, age, registered, hasVoted] = await contract.getVoterByUniqueId(uniqueId);

      setVoterInfo({
        name,
        age: age.toString(),
        registered,
        hasVoted,
      });
    } catch (err) {
      console.error(err);
      setMessage("❌ Unable to fetch voter details. Make sure the Unique ID is correct.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow mt-10">
      <h2 className="text-xl font-semibold mb-4">Check Voter Status</h2>

      <input
        type="text"
        placeholder="Enter Unique ID"
        value={uniqueId}
        onChange={(e) => setUniqueId(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-4"
      />

      <button
        onClick={checkStatus}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Check Status
      </button>

      {message && <p className="mt-4 text-center">{message}</p>}

      {voterInfo && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <p><strong>Name:</strong> {voterInfo.name}</p>
          <p><strong>Age:</strong> {voterInfo.age}</p>
          <p><strong>Registered:</strong> {voterInfo.registered ? "Yes" : "No"}</p>
          <p><strong>Voted:</strong> {voterInfo.hasVoted ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
};

export default VoterStatus;
