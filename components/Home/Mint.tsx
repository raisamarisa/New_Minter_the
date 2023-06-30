import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import useDirectCall from "../../hooks/useTransation";
import { useAppSelector, useAppdispatch } from "../../hooks/redux";
import { ConnectButtonwagmi, ExampleButton } from "../Header/connect";
import { NFT_CONTRACT, NFT_PRICE } from "../../config";
import { useAccount, useSigner, useSignMessage } from "wagmi";
import { fetchTotalMint } from "../../hooks/Totalsupply";
import { toast } from "react-hot-toast";
import { HiPlus, HiMinus } from "react-icons/hi";
import { provider } from "../../utils/providerweb3";
export function Mint() {
  const dispatch = useAppdispatch();
  const { signMessageAsync, signMessage } = useSignMessage();
  const { data: signer } = useSigner();
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const { BuyToken, loading, Checklimit } = useDirectCall(signer, NFT_CONTRACT);
  const supply = useAppSelector((state) => state.wallet.totalSupply);
  const [load, setload] = useState(false);
  useEffect(() => {
    setload(true);
  }, []);

  const Mintnft = async () => {
  
    if (!address) return toast.error("Connect your wallet");
    const CheckLimitnft = await Checklimit("checkUserLimit",[address]);
    if(CheckLimitnft){
      const nonce = await fetch("/api/web3/nonce");
      const nonceRes = await nonce.text();
      const message = ethers.utils.solidityKeccak256(["string"], [nonceRes]);
      const arrayifyMessage = await ethers.utils.arrayify(message);
      const res = signMessageAsync({
        message: arrayifyMessage,
      });
  
      const signature = res.then((e) => {
        // mint nere...
         BuyToken('mint',[1,e,nonceRes]);
      });
    }else{
      toast.error("You already minted!")
    }
    
  };
//bg-[#29064e]
  useEffect(() => {
    dispatch(fetchTotalMint());
  }, [loading]);

  return (
    <div className="w-full flex flex-col justify-center  ">
      <div className=" text-center">
        <h2 className="text-4xl text-white font-extrabold">{supply}/345</h2>
        {/* <h2 className='text-lg uppercase py-2 text-white dark:text-white'>Price  {price?.toFixed(3)} ETH</h2> */}
      </div>

      <div className="flex flex-row justify-center gap-3 items-center py-2 mb-1"></div>

      {load ? (
        <div className="text-center">
          <button
            disabled={loading}
            onClick={() => Mintnft()}
            className="border-[2px] border-[#29064e] text-[#29064e] bg-white  font-bold py-2 px-10  tracking-[2px] font-Montserrat uppercase "
          >
            {loading ? "Minting.." : "Mint"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
