import { ethers } from "ethers";
import abi from "../artifacts/contracts/VotingSystem.sol/VotingSystem.json";

export const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
export const contractABI = abi.abi;

export const getContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  return contract;
};
