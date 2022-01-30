import { Networks } from "./blockchain";

const AMBER_MAINNET = {
    GOB_ADDRESS: "0xF2009bdc8b86F8d29D4225a4C13577De9c35b24F",
    SGOB_ADDRESS: "0x862F17a624f29f8034e55E407945be2e1f302Ef0",
    TREASURY_ADDRESS: "0x3AcE03c37A8b57731654B816C40f601443049614",
    STAKING_ADDRESS: "0x6f9c910427b999CfAa530E998Da9E7B1C5f4e920",
    STAKING_HELPER_ADDRESS: "0xDF5FA01ac340AD622e6c4cc92429494D38047835",
    GOB_BONDING_CALC_ADDRESS: "0x71Fc2d33e28E51FCeDf8894e73FB104777923b72",
    FUSD_ADDRESS: "0x96917995f030f8fC3D8fDF40F3a6422547c877c1",
    DAO_ADDRESS: "0x223e9DC15f2714170667d8d2d2Ae1Fecee250624",
};

export const getAddresses = (networkID: number) => {
    if (networkID === Networks.AMBER) return AMBER_MAINNET;

    throw Error("Network not supported");
};
