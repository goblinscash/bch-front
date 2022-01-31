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
        [Networks.smartBCH]: {
            bondAddress: "0xdD99706034a6645ABc7ab5226ec5B1D023DeEA7b",
            reserveAddress: "0x7b2B3C5308ab5b2a1d9a94d20D35CCDf61e05b72",
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
        [Networks.smartBCH]: {
            bondAddress: "0x22D7E43D565e898a64203B593A89dAF69e112741",
            reserveAddress: "0xC20A4f3012bA2Df47544d4926B19604Fa777FB01",
        },
    },
    lpUrl: "https://app.mistswap.fi/add/0x56381cB87C8990971f3e9d948939e1a95eA113a3/0x7b2B3C5308ab5b2a1d9a94d20D35CCDf61e05b72",
});

export default [fusd, fusdGob];
