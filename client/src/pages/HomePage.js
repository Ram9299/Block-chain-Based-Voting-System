// src/pages/HomePage.js
import React from "react";
import { motion } from "framer-motion";
import { FaVoteYea } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col items-center justify-center px-4">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex justify-center mb-6">
          <FaVoteYea size={64} className="text-blue-500 animate-pulse drop-shadow-lg" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Decentralized Voting System
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto mb-8">
          Secure. Transparent. Powered by Blockchain. Register, Vote, and View Results with confidence.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/register">
            <button className="btn btn-primary px-6 py-3 rounded-full text-lg shadow-lg transition hover:scale-105">
              Register
            </button>
          </Link>

          <Link to="/vote">
            <button className="btn btn-accent px-6 py-3 rounded-full text-lg shadow-lg transition hover:scale-105">
              Vote
            </button>
          </Link>

          <Link to="/results">
            <button className="btn btn-secondary px-6 py-3 rounded-full text-lg shadow-lg transition hover:scale-105">
              Results
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;
