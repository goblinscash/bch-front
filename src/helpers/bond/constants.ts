import { Networks } from "../../constants/blockchain";

export enum BondType {
    StableAsset,
    LP,
    Pro,
}

export interface BondAddresses {
    bondAddress: any;
    reserveAddress: string;
}

export interface NetworkAddresses {
    [Networks.smartBCH]: BondAddresses;
}
export interface ProBondAddresses {
    reserveAddress: string;
    bondAddress: string;
    oracleAddress: string;
    proTreasuryAddress: string;
}
export interface ProNetworkAddresses {
    [Networks.smartBCH]: ProBondAddresses;
}
