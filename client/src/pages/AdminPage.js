import React from "react";
import AdminPanel from "../components/AdminPanel";
import CandidateList from "../components/CandidateList";
import RegisteredVoters from "../components/RegisteredVoters";

const AdminPage = () => (
  <div className="space-y-6">
    <AdminPanel />
    <CandidateList />
    <RegisteredVoters />
  </div>
);

export default AdminPage;
