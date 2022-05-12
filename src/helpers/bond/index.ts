import { Networks } from "../../constants/blockchain";
import { LPBond, CustomLPBond } from "./lp-bond";
import { StableBond, CustomBond, ProBond } from "./stable-bond";

import FusdIcon from "../../assets/tokens/FLEXUSD.png";
import BchIcon from "../../assets/tokens/BCH.png";
import FusdGobIcon from "../../assets/tokens/GOB-FLEX.png";
import BchGobIcon from "../../assets/tokens/GOB-BCH.png";
import GobIcon from "../../assets/tokens/GOB.png";
import GbchIcon from "../../assets/tokens/GBCH.png";
// import tokens from '../../helpers/tokens';

import { StableBondContract, LpBondContract, WbchBondContract, StableReserveContract, LpReserveContract, TimeReserveContract, AmpleBond, OracleContract } from "../../abi";

//Minting Bonds
{
    /*export const fusd = new StableBond({
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
});*/
}

/*export const Gob = new StableBond({
    name: "gob",
    displayName: "GOB",
    bondToken: "GOB",
    payoutToken: "GOB",
    bondIconSvg: GobIcon,
    bondContractABI: StableBondContract,
    reserveContractAbi: StableReserveContract,
    networkAddrs: {
        [Networks.smartBCH]: {
            bondAddress: "0xce85dB655a78A7cBBD21208d7ad2737B3b475b74",
            reserveAddress: "0x56381cB87C8990971f3e9d948939e1a95eA113a3",
        },
    },
});*/

export const fusdGob = new LPBond({
    name: "fusd_gob_lp",
    displayName: "GOB-flexUSD",
    bondToken: "LP",
    payoutToken: "GOB",
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

//Pro Bonds
export const proGbchFusd = new ProBond({
    name: "gbch_fusd-bond",
    displayName: "FlexUSD",
    bondToken: "flexUSD",
    payoutToken: "GBCH",
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
    name: "gbch_bond",
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
    name: "gob-bond",
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

export const proGobGbch = new ProBond({
    name: "gob-gbch-bond",
    displayName: "gBCH",
    bondToken: "gBCH",
    payoutToken: "GOB",
    bondIconSvg: GbchIcon,
    bondContractABI: AmpleBond,
    oracleContractABI: OracleContract,
    reserveContractAbi: StableReserveContract,
    networkAddrs: {
        [Networks.smartBCH]: {
            bondAddress: "0xE671aBcf3995cF7E5809e3a06f8a6292C240b510",
            reserveAddress: "0x009dC89aC501a62C4FaaF7196aeE90CF79B6fC7c",
            oracleAddress: "0x92977982718E6B193ed2aB56865153C3bF053dF5",
            proTreasuryAddress: "0x5d51B1aC5DaE47c4Eede9b79223B8b4E1D3B9f74",
        },
    },
});

export const proWgbchGbch = new ProBond({
    name: "wgbch-gbch-bond",
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
            bondAddress: "0x0BC92185ef66f68f4fa8989766A915D298Ca178D",
            reserveAddress: "0x009dC89aC501a62C4FaaF7196aeE90CF79B6fC7c",
            oracleAddress: "0xA0ce258356Aa1d4A914CD4B86f5E8CCca7903d67",
            proTreasuryAddress: "0x6e8e8102e0400F6C42EdD5AC920976DdC003A60b",
        },
    },
});

//export default [fusdGob, proGbchFusd, proGbchGbch, proGbchGob, proGobGbch, proWgbchGbch];
export default [fusdGob, proWgbchGbch];
