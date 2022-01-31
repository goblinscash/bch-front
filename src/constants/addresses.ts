import { Networks } from "./blockchain";

const AMBER_MAINNET = {
    GOB_ADDRESS: "0xABe86f711aa50ACcB4eB62f09Ce0768bEe749664",
    SGOB_ADDRESS: "0x9f345F9278765856d266242501201Ccd07Bb2B6a",
    TREASURY_ADDRESS: "0x2CB6EB57dEA52cB4e1273e86eC5fa736223B381A",
    STAKING_ADDRESS: "0xc3955b994be4bB911fA37CA25E5C6786eC312084",
    STAKING_HELPER_ADDRESS: "0xfB2A241704766024687E7FFfd62eeb42ccEeC7B7",
    GOB_BONDING_CALC_ADDRESS: "0x40891B90790fA565dDeb4f7C9776A713708FB0f8",
    FUSD_ADDRESS: "0x96917995f030f8fC3D8fDF40F3a6422547c877c1",
    DAO_ADDRESS: "0x223e9DC15f2714170667d8d2d2Ae1Fecee250624",
};

export const getAddresses = (networkID: number) => {
    if (networkID === Networks.AMBER) return AMBER_MAINNET;

    throw Error("Network not supported");
};
