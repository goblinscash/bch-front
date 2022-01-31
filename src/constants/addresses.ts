import { Networks } from "./blockchain";

const AMBER_MAINNET = {
    GOB_ADDRESS: "0x6Fed572554e726261E2E91951867D0b1C1A8665E",
    SGOB_ADDRESS: "0x6b9339FEa70dE30CBF04ccA8987e44C719Bdab5E",
    TREASURY_ADDRESS: "0xf5633d3603E18FCEb26841872Af0133484f9ecf6",
    STAKING_ADDRESS: "0xa4092B05d52C047a1dAbD09FCC72434a45Fd790D",
    STAKING_HELPER_ADDRESS: "0xdCCe707fd9Bbc1B62b83C455f42241adC142589C",
    GOB_BONDING_CALC_ADDRESS: "0x667f6c439C9BE3d39A1936489075d1a1c6BcE25e",
    FUSD_ADDRESS: "0x96917995f030f8fC3D8fDF40F3a6422547c877c1",
    DAO_ADDRESS: "0x624ff995Ea50F88778b96c16b650ED1CbF9A5860",
};

export const getAddresses = (networkID: number) => {
    if (networkID === Networks.AMBER) return AMBER_MAINNET;

    throw Error("Network not supported");
};
