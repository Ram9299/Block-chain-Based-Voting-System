// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract VotingSystem {
    struct Candidate {
        string name;
        uint voteCount;
    }

    struct Voter {
        string name;
        uint age;
        string uniqueId;
        bool registered;
        bool hasVoted;
    }

    address public admin;
    bool public electionActive;
    string[] public voterIds;

    mapping(string => Voter) public voters; // ✅ key = uniqueId
    Candidate[] public candidates;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this.");
        _;
    }

    modifier onlyWhenActive() {
        require(electionActive, "Election is not active.");
        _;
    }

    // ✅ Register voter by uniqueId
    function registerVoter(string memory _name, uint _age, string memory _uniqueId) public {
        require(_age >= 18, "Must be 18 or older to vote.");
        require(!voters[_uniqueId].registered, "Already registered.");

        voters[_uniqueId] = Voter({
            name: _name,
            age: _age,
            uniqueId: _uniqueId,
            registered: true,
            hasVoted: false
        });

        voterIds.push(_uniqueId);
    }

    // ✅ Fetch voter details by unique ID
    function getVoterByUniqueId(string memory _uniqueId)
        public
        view
        returns (string memory name, uint age, bool registered, bool hasVoted)
    {
        require(voters[_uniqueId].registered, "Voter not found");
        Voter memory v = voters[_uniqueId];
        return (v.name, v.age, v.registered, v.hasVoted);
    }

    // ✅ Return all voters
    function getAllVoters() public view returns (Voter[] memory) {
        Voter[] memory allVoters = new Voter[](voterIds.length);
        for (uint i = 0; i < voterIds.length; i++) {
            allVoters[i] = voters[voterIds[i]];
        }
        return allVoters;
    }

    // ✅ Add candidate
    function addCandidate(string memory _name) public onlyAdmin {
        candidates.push(Candidate({ name: _name, voteCount: 0 }));
    }

    // ✅ Toggle election on/off
    function toggleElectionStatus() public onlyAdmin {
        electionActive = !electionActive;
    }

    // ✅ Vote using uniqueId
    function vote(string memory _uniqueId, uint _candidateId) public onlyWhenActive {
        Voter storage sender = voters[_uniqueId];
        require(sender.registered, "Not registered");
        require(!sender.hasVoted, "Already voted");
        require(_candidateId < candidates.length, "Invalid candidate");

        sender.hasVoted = true;
        candidates[_candidateId].voteCount += 1;
    }

    function getCandidateCount() public view returns (uint) {
        return candidates.length;
    }

    function getCandidate(uint index) public view returns (string memory, uint) {
        require(index < candidates.length, "Invalid candidate index");
        Candidate memory c = candidates[index];
        return (c.name, c.voteCount);
    }

    function getAllCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }
}
