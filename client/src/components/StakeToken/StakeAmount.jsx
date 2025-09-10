import { useContext, useRef } from "react";
import { ethers } from "ethers";
import Web3Context from "../../context/Web3Context";
import Button from "../Button/Button";
import StakingContext from "../../context/StakingContext";
import { toast } from "react-hot-toast";
import "./StakeToken.css";

const StakeAmount = () => {
  const { stakingContract, stakeTokenContract, account } = useContext(Web3Context);
  const { isReload, setIsReload } = useContext(StakingContext);
  const stakeAmountRef = useRef();

  const stakeToken = async (e) => {
    e.preventDefault();
    const amount = stakeAmountRef.current.value.trim();
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid positive number.");
      return;
    }

    const amountToStake = ethers.parseUnits(amount, 18).toString();

    try {
      // 1) Approve first
      const approveTx = await stakeTokenContract.approve(stakingContract.target, amountToStake);
      await toast.promise(approveTx.wait(), {
        loading: "Approving tokens...",
        success: "Approval successful ✅",
        error: "Approval failed ❌",
      });

      // 2) Stake tokens
      const stakeTx = await stakingContract.stake(amountToStake);
      await toast.promise(stakeTx.wait(), {
        loading: "Staking in progress...",
        success: "Staking successful 🎉",
        error: "Staking failed ❌",
      });

      stakeAmountRef.current.value = "";
      setIsReload(!isReload);
    } catch (error) {
      console.error(error);
      toast.error("Staking failed. Check console for details.");
    }
  };

  return (
    <form onSubmit={stakeToken} className="stake-amount-form">
      <label className="stake-input-label">Enter Staked Amount:</label>
      <input type="text" ref={stakeAmountRef} />
      <Button type="submit" label="Stake Token" />
    </form>
  );
};

export default StakeAmount;
