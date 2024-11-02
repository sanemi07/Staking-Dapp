import { ethers, Contract } from "ethers";
import stakingAbi from "../ABI/stakingAbi.json";
import stakeTokenAbi from "../ABI/stateTokenAbi.json";

export const connectWallet = async () => {
    try {
        if (!window.ethereum) {
            throw new Error("MetaMask is not installed. Please install it to continue.");
        }

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const selectedAccount = accounts[0];
        
        const chainIdHex = await window.ethereum.request({ method: 'eth_chainId' });
        const chainId = parseInt(chainIdHex, 16);

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const stakingContractAddress = "0xc635bf012060fdfaa13832c2299f722eda65c84a";
        const stakeTokenContractAddress = "0xb4e2a799abaae46f05a2706eb101661275b55570";

        const stakingContract = new Contract(stakingContractAddress, stakingAbi, signer);
        const stakeTokenContract = new Contract(stakeTokenContractAddress, stakeTokenAbi, signer);

        return { provider, account: selectedAccount, stakingContract, stakeTokenContract, chainId };
    } catch (error) {
        console.error("Error connecting wallet:", error.message);
        throw error;
    }
};
