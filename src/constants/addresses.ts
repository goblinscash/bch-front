import { Networks } from "./blockchain";

const smartBCH_MAINNET = {
    DAO_ADDRESS: "0x624ff995Ea50F88778b96c16b650ED1CbF9A5860",
    SGOB_ADDRESS: "0x47c61F29B1458d234409Ebbe4B6a70F3b16528EF",
    GOB_ADDRESS: "0x56381cB87C8990971f3e9d948939e1a95eA113a3",
    FUSD_ADDRESS: "0x96917995f030f8fC3D8fDF40F3a6422547c877c1",
    STAKING_ADDRESS: "0x48B8aCe692ad8BD2E3139C65bFf7d28c048F8f00",
    STAKING_HELPER_ADDRESS: "0x9851c1175A26c8656441bc2cAE0Cd21AddB80dBa",
    GOB_BONDING_CALC_ADDRESS: "0x3f81eeD47504683F386010652B8dB21eb79A0d9C",
    TREASURY_ADDRESS: "0x259D4CBA522A15AA5Db641D0E06d6f7Aa040D89f",
};

export const getAddresses = (networkID: number) => {
    if (networkID === Networks.smartBCH) return smartBCH_MAINNET;

    throw Error("Network not supported");
};
