
import {useAppSelector,useAppdispatch} from "../hooks/redux"
import { useEffect } from 'react';
//wagmi hook
import { useAccount } from 'wagmi'
//wallet slice 
import {setRender} from "../store/walletSlice"
import { fetchTotalMint } from "../hooks/Totalsupply";
//components..
import { Header } from '../components/Header/Header';
import { ethers } from "ethers";
import {NFT_CONTRACT} from "../config/index";
import ercabi from "../config/ABI/erc721.json";
import {provider} from "../utils/providerweb3"
const  Layout = (props:any)=> {

  const { address, isConnecting, isDisconnected ,isConnected} = useAccount();
  const dispatch = useAppdispatch();


    useEffect(() => {
     dispatch(fetchTotalMint())
    }, [])
  



    return (
   <div className="relative" id="main_content">
     <div id="overlay" ></div> 
   <Header/>
   {props.children}
   </div>
    )
  }
  
  
  export default Layout