import { Contract, ContractInterface } from "ethers";
import { Bond, BondOpts } from "./bond";
import { BondType, ProBondAddresses, ProNetworkAddresses } from "./constants";
import { Networks } from "../../constants/blockchain";
import { JsonRpcSigner, StaticJsonRpcProvider } from "@ethersproject/providers";
import { getAddresses } from "../../constants/addresses";

export interface StableBondOpts extends BondOpts {
    readonly reserveContractAbi: ContractInterface;
}

export class StableBond extends Bond {
    readonly isLP = false;
    readonly isPro = false;
    readonly reserveContractAbi: ContractInterface;
    readonly displayUnits: string;

    constructor(stableBondOpts: StableBondOpts) {
        super(BondType.StableAsset, stableBondOpts);

        // For stable bonds the display units are the same as the actual token
        this.displayUnits = stableBondOpts.displayName;
        this.reserveContractAbi = stableBondOpts.reserveContractAbi;
    }

    public async getTreasuryBalance(networkID: Networks, provider: StaticJsonRpcProvider) {
        const addresses = getAddresses(networkID);
        const token = this.getContractForReserve(networkID, provider);
        const tokenAmount = await token.balanceOf(addresses.TREASURY_ADDRESS);
        return tokenAmount / Math.pow(10, 18);
    }

    public async getTokenAmount(networkID: Networks, provider: StaticJsonRpcProvider) {
        return this.getTreasuryBalance(networkID, provider);
    }

    public getGobAmount(networkID: Networks, provider: StaticJsonRpcProvider) {
        return new Promise<number>(reserve => reserve(0));
    }
}

// These are special bonds that have different valuation methods
export interface CustomBondOpts extends StableBondOpts {}

export class CustomBond extends StableBond {
    constructor(customBondOpts: CustomBondOpts) {
        super(customBondOpts);

        this.getTreasuryBalance = async (networkID: Networks, provider: StaticJsonRpcProvider) => {
            const tokenAmount = await super.getTreasuryBalance(networkID, provider);
            const tokenPrice = this.getTokenPrice();

            return tokenAmount * tokenPrice;
        };
    }
}

export interface ProBondOpts extends BondOpts {
    readonly reserveContractAbi: ContractInterface;
    readonly oracleContractABI: ContractInterface;
    readonly networkAddrs: ProNetworkAddresses;
}

export class ProBond extends Bond {
    readonly isLP = false;
    readonly isPro = true;
    readonly networkAddrs: ProNetworkAddresses;
    readonly oracleContractABI: ContractInterface;
    readonly reserveContractAbi: ContractInterface;
    readonly displayUnits: string;

    constructor(proBondOpts: ProBondOpts) {
        super(BondType.StableAsset, proBondOpts);
        this.networkAddrs = proBondOpts.networkAddrs;
        this.oracleContractABI = proBondOpts.oracleContractABI;
        // For stable bonds the display units are the same as the actual token
        this.displayUnits = proBondOpts.displayName;
        this.reserveContractAbi = proBondOpts.reserveContractAbi;
    }

    public async getTreasuryBalance(networkID: Networks, provider: StaticJsonRpcProvider) {
        const addresses = getAddresses(networkID);
        const token = this.getContractForReserve(networkID, provider);
        const treasuryAddress = this.networkAddrs[networkID].proTreasuryAddress;
        const tokenAmount = await token.balanceOf(treasuryAddress);
        if (this.name === "gob-bond") {
            return tokenAmount / Math.pow(10, 9);
        }
        return tokenAmount / Math.pow(10, 18);
    }

    public async getTokenAmount(networkID: Networks, provider: StaticJsonRpcProvider) {
        return this.getTreasuryBalance(networkID, provider);
    }

    public getGobAmount(networkID: Networks, provider: StaticJsonRpcProvider) {
        return new Promise<number>(reserve => reserve(0));
    }
    public getOracleAddress(networkID: Networks) {
        return this.networkAddrs[networkID].oracleAddress;
    }

    public getOracleContract(networkID: Networks, provider: StaticJsonRpcProvider | JsonRpcSigner) {
        const oracleAddress = this.getOracleAddress(networkID);
        return new Contract(oracleAddress, this.oracleContractABI, provider);
    }
    public getProTreasuryAddress(networkID: Networks) {
        return this.networkAddrs[networkID].proTreasuryAddress;
    }
}
