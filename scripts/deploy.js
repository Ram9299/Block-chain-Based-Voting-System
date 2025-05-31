const hre = require("hardhat");

async function main() {
  // Compile contracts
  await hre.run("compile");

  // Get the contract factory
  const VotingSystem = await hre.ethers.getContractFactory("VotingSystem");

  // Deploy the contract
  const voting = await VotingSystem.deploy();

  // Wait for deployment to finish
  await voting.waitForDeployment();

  // Get contract address
  console.log("✅ VotingSystem deployed to:", voting.target);
}

main().catch((error) => {
  console.error("❌ Error during deployment:", error);
  process.exitCode = 1;
});
