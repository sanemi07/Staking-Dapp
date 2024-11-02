export const handleChainChange=async (setState)=>{
    const hexChainId=await window.ethereum.request({
        method:"eth_chainId"
    })
    const chainId=parseInt(hexChainId,16);
    setState(prevState=>({...prevState,chainId}))
}