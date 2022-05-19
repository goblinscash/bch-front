import { Networks } from "../../constants/blockchain";
import { ProBond } from "./stable-bond";

import FusdIcon from "../../assets/tokens/FLEXUSD.png";
import GobIcon from "../../assets/tokens/GOB.png";
import GbchIcon from "../../assets/tokens/GBCH.png";
// import tokens from '../../helpers/tokens';

import { StableReserveContract, AmpleBond, OracleContract } from "../../abi";

// Pro Bonds
export const proGbchFusd = new ProBond({
    name: "r_gbch_fusd-bond",
    displayName: "FlexUSD",
    bondToken: "flexUSD",
    payoutToken: "gBCH",
    bondIconSvg: FusdIcon,
    bondContractABI: AmpleBond,
    oracleContractABI: OracleContract,
    reserveContractAbi: StableReserveContract,
    networkAddrs: {
        [Networks.smartBCH]: {
            bondAddress: "0x624dA24fDEC642d4789acA9fD7FAc4C90b05De2c",
            reserveAddress: "0x7b2B3C5308ab5b2a1d9a94d20D35CCDf61e05b72",
            oracleAddress: "0xA0ce258356Aa1d4A914CD4B86f5E8CCca7903d67",
            proTreasuryAddress: "0x7517943B4303D5F43Bfd97Fb07289376Ab73b6D4",
        },
    },
});

export const proGbchGbch = new ProBond({
    name: "r_gbch_bond",
    displayName: "gBCH",
    bondToken: "gBCH",
    payoutToken: "gBCH",
    bondIconSvg: GbchIcon,
    bondContractABI: AmpleBond,
    // bondContractABI: LpBondContract,
    oracleContractABI: OracleContract,
    reserveContractAbi: StableReserveContract,
    networkAddrs: {
        [Networks.smartBCH]: {
            bondAddress: "0x533Ae18bA0783E0DAFE4F7d4eD2e7d7E6cCD29C8",
            reserveAddress: "0x009dC89aC501a62C4FaaF7196aeE90CF79B6fC7c",
            oracleAddress: "0xA0ce258356Aa1d4A914CD4B86f5E8CCca7903d67",
            proTreasuryAddress: "0x7517943B4303D5F43Bfd97Fb07289376Ab73b6D4",
        },
    },
});

export const proGbchGob = new ProBond({
    name: "r_gob-bond",
    displayName: "GOB",
    bondToken: "GOB",
    payoutToken: "gBCH",
    bondIconSvg: GobIcon,
    bondContractABI: AmpleBond,
    oracleContractABI: OracleContract,
    reserveContractAbi: StableReserveContract,
    networkAddrs: {
        [Networks.smartBCH]: {
            bondAddress: "0x301fCF5A50a662EC941Ea836C019467DC265941c",
            reserveAddress: "0x56381cB87C8990971f3e9d948939e1a95eA113a3",
            oracleAddress: "0x92977982718E6B193ed2aB56865153C3bF053dF5",
            proTreasuryAddress: "0x7517943B4303D5F43Bfd97Fb07289376Ab73b6D4",
        },
    },
});

export default [proGbchFusd, proGbchGob, proGbchGbch];
