// src/components/RegisteredVoters.js
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import ABI from "../utils/contractABI.json";
import { CONTRACT_ADDRESS } from "../utils/config";

const RegisteredVoters = () => {
  const [voters, setVoters] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVoters = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const voterList = await contract.getAllVoters();
      setVoters(voterList);
    } catch (err) {
      console.error("Failed to fetch voters:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVoters();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Registered Voters</h2>
      {loading ? (
        <p className="text-center">Loading voters...</p>
      ) : voters.length === 0 ? (
        <p className="text-center">No voters registered yet.</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Age</th>
              <th className="border px-4 py-2">Unique ID</th>
              <th className="border px-4 py-2">Registered</th>
              <th className="border px-4 py-2">Voted</th>
            </tr>
          </thead>
          <tbody>
            {voters.map((voter, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{voter.name}</td>
                <td className="border px-4 py-2">{voter.age.toString()}</td>
                <td className="border px-4 py-2">{voter.uniqueId}</td>
                <td className="border px-4 py-2">
                  {voter.registered ? (
                    <span className="text-green-600 font-semibold">Yes</span>
                  ) : (
                    "No"
                  )}
                </td>
                <td className="border px-4 py-2">
                  {voter.hasVoted ? (
                    <span className="text-blue-600 font-semibold">Yes</span>
                  ) : (
                    "No"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RegisteredVoters;
