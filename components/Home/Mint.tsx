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
import { provider, validationSigner } from "../../utils/providerweb3";
import { generateNonce } from "siwe";
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
      const nonce = address.toString();
      const message = ethers.utils.solidityKeccak256(["string"], [nonce]);
      const arrayifyMessage = await ethers.utils.arrayify(message);
      const res = validationSigner.signMessage(arrayifyMessage)

      const signature = res.then((e) => {
        BuyToken('mint',[1,e,nonce]);
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
    <div className="w-full flex flex-col justify-center mb-6 md:mb-0">
      <div className=" text-center">
        <h2 className="text-4xl text-white font-extrabold">{supply}/1950</h2>
        {/* <h2 className='text-lg uppercase py-2 text-white dark:text-white'>Price  {price?.toFixed(3)} ETH</h2> */}
      </div>


      {load ? (
        <div className="text-center">
          <button
            disabled={loading}
            onClick={() => Mintnft()}
            className="border-[2px] border-[#29064e] rounded-2xl text-[#29064e] bg-white  font-bold py-2 px-10  tracking-[2px] font-Montserrat uppercase "
            >
            {loading ? "Minting.." : "Mint"}
          </button>
        </div>
        ) : null}
    </div>
    );
}
