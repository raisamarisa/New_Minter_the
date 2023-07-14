import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import useDirectCall from "../../hooks/useTransation";
import { useAppSelector, useAppdispatch } from "../../hooks/redux";
import { ConnectButtonwagmi, ExampleButton } from "../Header/connect";
import { NFT_CONTRACT, NFT_PRICE } from "../../config";
import { useAccount, useSignMessage, useSendTransaction } from "wagmi";
import { useContractWrite, useWalletClient, useContractRead } from 'wagmi'
import ercabi from "../../config/ABI/erc721.json";

import { fetchTotalMint } from "../../hooks/Totalsupply";
import { toast } from "react-hot-toast";
import axios from "axios"
import {provider} from '../../utils/providerweb3'
export function Mint() {
  const dispatch = useAppdispatch();
  const { signMessageAsync, signMessage } = useSignMessage();
  const { data: walletClient, isError, isLoading } = useWalletClient()
  const {sendTransaction} = useSendTransaction();
  const contract = new ethers.Contract(NFT_CONTRACT, ercabi, provider);
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const { BuyToken, loading } = useDirectCall({}, NFT_CONTRACT);
  const supply = useAppSelector((state) => state.wallet.totalSupply);
  const [load, setload] = useState(false);
  useEffect(() => {
    setload(true);
    }, []);


  const Mintnft = async () => {

    if (!address) return toast.error("Connect your wallet");
    let checkUserLimit = await contract.checkUserLimit(address)
    if(checkUserLimit){
      const nonce = address.toString();
      let res = axios.post('/api/verify', {
        msg: nonce
      })

      const signature = res.then(async (e) => {
        let tx = await contract.populateTransaction.mint(1, e.data.result, nonce);
        console.log(await provider.estimateGas(tx));
        let sent = await walletClient?.sendTransaction(tx as any);
        console.log(sent, tx)
        toast.success("Minted")
//        BuyToken('mint',[1,e.data.result,nonce], contract)
      }).catch(err => {
        if (err.response && err.response.data)
            toast.error(err.response.data)
        else if (err.message){
          let msg = /"message\\":\\"execution reverted:(.*)\\"},/.exec(err.message)
          if (msg[1]) {

          toast.error(msg[1])
          } else {
            toast.error(err.message)

          }
          }
        else {
          toast.error("Failed")
        }
        console.log(err)

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
