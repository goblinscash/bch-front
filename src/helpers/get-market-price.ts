import { ethers } from "ethers";
import { LpReserveContract } from "../abi";
import { fusdGob } from "../helpers/bond";
import { Networks } from "../constants/blockchain";
import { Bond } from "./bond/bond";

export async function getMarketPrice(networkID: Networks, provider: ethers.Signer | ethers.providers.Provider): Promise<number> {
    const fusdGobAddress = fusdGob.getAddressForReserve(networkID);
    const pairContract = new ethers.Contract(fusdGobAddress, LpReserveContract, provider);
    const reserves = await pairContract.getReserves();
    const marketPrice = reserves[1] / reserves[0];
    return marketPrice;
}
// get probond marketprice
export async function getProbondMarketPrice(bond: Bond | null, networkID: Networks, provider: ethers.Signer | ethers.providers.Provider): Promise<number> {
    const bondAddress = "0xd45d971c09d966adbc7064e4ca05e2edaa3721c1"; //bond.getAddressForReserve(networkID);
    // const bondAddress = "0x1326E072b412FDF591562807657D48300CA21b1F";
    const pairContract = new ethers.Contract(bondAddress, LpReserveContract, provider);
    const reserves = await pairContract.getReserves();
    const marketPrice = reserves[1] / reserves[0];
    return marketPrice;
}
