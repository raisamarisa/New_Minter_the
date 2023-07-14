import { Contract } from '@ethersproject/contracts';
import TokenABI from "../config/ABI/erc721.json"

//hook for Read/write all kind of function for main core contract 
export const getContractInstance = (signer:any,MARKET_CONTRACT:string) => {
	var contract = new Contract(MARKET_CONTRACT, TokenABI, signer);
	return contract;
};