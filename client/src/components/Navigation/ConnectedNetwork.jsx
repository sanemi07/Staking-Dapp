import { useContext } from "react";
import Web3Context from "../../context/Web3Context";
 const ConnectedNetwork=()=>{
    const {chainId}=useContext(Web3Context);
    if(chainId===11155111){
        return(
            <p>ConnectedNetwork:Sepolia</p>
        )
    }
    else{
        return(
            <p>ConnectedNetwork:Unsupported Network</p>
        )
    }
}
export default ConnectedNetwork