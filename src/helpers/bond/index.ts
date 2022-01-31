import { Networks } from "../../constants/blockchain";
import { LPBond, CustomLPBond } from "./lp-bond";
import { StableBond, CustomBond } from "./stable-bond";

import FusdIcon from "../../assets/tokens/FLEXUSD.png";
import BchIcon from "../../assets/tokens/BCH.png";
import FusdGobIcon from "../../assets/tokens/GOB-FLEX.png";
import BchGobIcon from "../../assets/tokens/GOB-BCH.png";

import { StableBondContract, LpBondContract, WbchBondContract, StableReserveContract, LpReserveContract } from "../../abi";

export const fusd = new StableBond({
    name: "fusd",
    displayName: "flexUSD",
    bondToken: "flexUSD",
    bondIconSvg: FusdIcon,
    bondContractABI: StableBondContract,
    reserveContractAbi: StableReserveContract,
    networkAddrs: {
        [Networks.AMBER]: {
            bondAddress: "0x87f571461310ab5973E24A7F4AD418179b9e82bf",
            reserveAddress: "0x96917995f030f8fC3D8fDF40F3a6422547c877c1",
        },
    },
});

export const fusdGob = new LPBond({
    name: "fusd_gob_lp",
    displayName: "GOB-flexUSD LP",
    bondToken: "fUSD",
    bondIconSvg: FusdGobIcon,
    bondContractABI: LpBondContract,
    reserveContractAbi: LpReserveContract,
    networkAddrs: {
        [Networks.AMBER]: {
            bondAddress: "0x9C122F45aE24767Df7cfAC347Cd96cF3d3655Bea",
            reserveAddress: "0x9b9190C5392116a865Ceef53b57b0bb758256f74",
        },
    },
    lpUrl: "https://app.mistswap.fi/add/0xEA48ca36933873507636e4aFD72a74f612aAf8CD/0x96917995f030f8fC3D8fDF40F3a6422547c877c1",
});

export default [fusd, fusdGob];
