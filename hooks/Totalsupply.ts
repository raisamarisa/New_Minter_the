import { createAsyncThunk } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import ercabi from '../config/ABI/erc721.json';
import {provider} from "../utils/providerweb3"
import { NFT_CONTRACT } from '../config';

export const fetchTotalMint = createAsyncThunk(
  'nft/fetchTotalMint',
  async () => {

    const instance = new ethers.Contract(NFT_CONTRACT, ercabi.abi, provider)
    const GetMintInfo = await instance.totalSupply();
    return GetMintInfo.toString();
  }
);