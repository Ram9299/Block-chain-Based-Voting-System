// src/pages/Register.js
import React, { useState } from "react";
import { ethers } from "ethers";
import ABI from "../utils/contractABI.json";
import { CONTRACT_ADDRESS } from "../utils/config";

const Register = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [uniqueId, setUniqueId] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (!window.ethereum) {
        return alert("Please install MetaMask to use this feature.");
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const tx = await contract.registerVoter(name, parseInt(age), uniqueId);
      await tx.wait();

      setMessage("✅ Registered successfully!");
      setName("");
      setAge("");
      setUniqueId("");
    } catch (err) {
      console.error(err);
      setMessage("❌ Registration failed. Maybe already registered or invalid data.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded-lg mt-10">
      <h2 className="text-xl font-bold mb-4">Register as a Voter</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="number"
          value={age}
          placeholder="Age"
          onChange={(e) => setAge(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          value={uniqueId}
          placeholder="Unique ID"
          onChange={(e) => setUniqueId(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default Register;
