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


gob 	0x6Fed572554e726261E2E91951867D0b1C1A8665E
sgob 	0x6b9339FEa70dE30CBF04ccA8987e44C719Bdab5E
flexusd 	0x96917995f030f8fC3D8fDF40F3a6422547c877c1
gob/flex lp	0xbd5277D22663D48855C4e87445D263110EeF153a
flex bond	0x13E0b1aC83565eaeF6DAC2abA9fe5cFa4Cf10814
gob flex bond	0x2313bD17e12AC095E3665517cc8c2b50f1f9E791
treasury 	0xf5633d3603E18FCEb26841872Af0133484f9ecf6
staking 	0xa4092B05d52C047a1dAbD09FCC72434a45Fd790D
staking helper 	0xdCCe707fd9Bbc1B62b83C455f42241adC142589C
staking warmup 	0xdF4863Bf089A03b25F13F7e6755e4eCD67D2D1d3
staking distributor	0xBAE8AaBb95125148dD33937faaFe082999619Dd1
bonding calculator 	0x667f6c439C9BE3d39A1936489075d1a1c6BcE25e
dao multisig 	0x624ff995Ea50F88778b96c16b650ED1CbF9A5860