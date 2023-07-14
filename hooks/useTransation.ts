import React, { useState, useEffect } from 'react';
import { Toast, toast } from 'react-hot-toast';
import { ethers, } from "ethers";
import ercabi from "../config/ABI/erc721.json";
import {provider} from "../utils/providerweb3"
import {NFT_CONTRACT} from "../config";
import {useContractRead, useContractWrite} from "wagmi";

const useDirectCall = (signer:any,contractaddress:string) => {
  const [loading, setSellTokenLoading] = useState(false);









  const BuyToken = async ( fname: string,args: Array<any>, myContract: any) => {
    const name = String(fname);
    setSellTokenLoading(true);
    
    //coming from hook
    try {
      
      const tx = await myContract.mint(
        ...args,
    );
      provider.estimateGas(tx)
      let signed = signer.signTransaction(tx);


      const receipt = await response.wait();
      toast.success("Nft mint successfully");
      setSellTokenLoading(false);
    } catch (error) {
      setSellTokenLoading(false);
      console.log(error);
      toast.error("Mint hasn't started")

    }
  };





  return { loading ,BuyToken};
};

export default useDirectCall;