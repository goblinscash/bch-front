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
            bondAddress: "0xbd7f846D09F3F52a4208F498071b72a913a1C838",
            reserveAddress: "0x96917995f030f8fC3D8fDF40F3a6422547c877c1",
        },
    },
});

export const gob = new StableBond({
    name: "gob",
    displayName: "Gob",
    bondToken: "Gob",
    bondIconSvg: FusdIcon,
    bondContractABI: StableBondContract,
    reserveContractAbi: StableReserveContract,
    networkAddrs: {
        [Networks.AMBER]: {
            bondAddress: "",
            reserveAddress: "",
        },
    },
});

export const wbch = new CustomBond({
    name: "wbch",
    displayName: "wBCH",
    bondToken: "wBCH",
    bondIconSvg: BchIcon,
    bondContractABI: WbchBondContract,
    reserveContractAbi: StableReserveContract,
    networkAddrs: {
        [Networks.AMBER]: {
            bondAddress: "",
            reserveAddress: "",
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
            bondAddress: "0x5c023544A2e97305c4E94DAC3D46A4a2be2b8035",
            reserveAddress: "0x216393077abF0518933DA341ee6E9538A454a225",
        },
    },
    lpUrl: "https://app.mistswap.fi/add/0x363A28937aF13194b233108F1f1D3212532c7c6C/0x96917995f030f8fC3D8fDF40F3a6422547c877c1",
});

export const wbchGob = new CustomLPBond({
    name: "bch_gob_lp",
    displayName: "GOB-BCH LP",
    bondToken: "wBCH",
    bondIconSvg: BchGobIcon,
    bondContractABI: LpBondContract,
    reserveContractAbi: LpReserveContract,
    networkAddrs: {
        [Networks.AMBER]: {
            bondAddress: "0xf36F279dE02c81Ed8a261507f6EDC2E54C88FC29",
            reserveAddress: "0xa77fb8E8Fe6DE5591D441289a96Cb25851792F20",
        },
    },
    lpUrl: "",
});

export const fusdBch = new CustomLPBond({
    name: "fusd_bch_lp",
    displayName: "flexUSD-BCH LP",
    bondToken: "wBCH",
    bondIconSvg: BchGobIcon,
    bondContractABI: LpBondContract,
    reserveContractAbi: LpReserveContract,
    networkAddrs: {
        [Networks.AMBER]: {
            bondAddress: "0xdd3EcE865500143a4d2741B868D976558861CA0d",
            reserveAddress: "0x62fA57883b8050C38A68A5CaD4c6Ae1ba87baFe9",
        },
    },
    lpUrl: "",
});

export default [fusd, fusdGob];
