
import { useState, useContext, useEffect } from "react";
import { ethers } from "ethers";
import web3Context from "../../context/Web3Context";
import { toast } from "react-hot-toast";
import "./DisplayPannel.css";

const EarnedReward = () => {
  const { stakingContract, account } = useContext(web3Context);
  const [rewardVal, setRewardVal] = useState("0");

  const fetchStakeRewardInfo = async () => {
    if (!stakingContract || !account) return; // Ensure contract and account are loaded
    try {
      const rewardValueWei = await stakingContract.earned(account);
      const rewardValueEth = ethers.formatUnits(rewardValueWei, 18).toString();
      const roundedReward = parseFloat(rewardValueEth).toFixed(2);
      setRewardVal(roundedReward);
    } catch (error) {
      toast.error("Error fetching the reward.");
      console.error("Reward fetch error:", error.message);
    }
  };

  useEffect(() => {
    // Fetch immediately on mount
    fetchStakeRewardInfo();
    
    // Set up interval-based fetching
    const interval = setInterval(() => {
      stakingContract && fetchStakeRewardInfo();
    }, 20000);
    
    return () => clearInterval(interval); // Clear interval on unmount
  }, [stakingContract, account]);

  return (
    <div className="earned-reward">
      <p>Earned Reward:</p>
      <span>{rewardVal}</span>
      
    </div>
  );
};

export default EarnedReward;
