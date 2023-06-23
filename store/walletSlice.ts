import axios from "axios";
import { createSlice, createAsyncThunk ,PayloadAction} from "@reduxjs/toolkit";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import {fetchTotalMint} from "../hooks/Totalsupply"
interface PoolsState {
isRender:boolean,
totalSupply:number
  }


const initialState: PoolsState = {
    isRender:false,
    totalSupply:0
  };

  // Define the slice for pools data and token prices
 const walletSlice = createSlice({
    name: "pools",
    initialState,
    reducers: {
      setRender: (state) => {
     state.isRender = true;
      },
    },
    extraReducers: (builder) => {
      builder.addCase(fetchTotalMint.fulfilled, (state, action) => {
        state.totalSupply = action.payload;
      })
        }
    
  });


  export const { setRender} = walletSlice.actions;
  export default walletSlice.reducer;




