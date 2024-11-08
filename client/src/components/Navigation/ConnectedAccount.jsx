import { useContext } from "react";
import Web3Context from "../../context/Web3Context";

 const ConnectedAccount = () => {
    const { account } = useContext(Web3Context); // Changed from selectedaccount to account
    console.log(account);
    return (
        <p>Connected Account: {account}</p>
    );
};
export default ConnectedAccount
