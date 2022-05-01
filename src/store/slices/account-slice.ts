import { ethers } from "ethers";
import { getAddresses } from "../../constants";
import { TimeTokenContract, MemoTokenContract, MimTokenContract } from "../../abi";
import { setAll } from "../../helpers";

import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { Bond } from "../../helpers/bond/bond";
import { Networks } from "../../constants/blockchain";
import React from "react";
import { RootState } from "../store";
import { IToken } from "../../helpers/tokens";

interface IGetBalances {
    address: string;
    networkID: Networks;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
}

interface IAccountBalances {
    balances: {
        sgob: string;
        gob: string;
    };
}

export const getBalances = createAsyncThunk("account/getBalances", async ({ address, networkID, provider }: IGetBalances): Promise<IAccountBalances> => {
    const addresses = getAddresses(networkID);

    const sgobContract = new ethers.Contract(addresses.SGOB_ADDRESS, MemoTokenContract, provider);
    const sgobBalance = await sgobContract.balanceOf(address);
    const gobContract = new ethers.Contract(addresses.GOB_ADDRESS, TimeTokenContract, provider);
    const gobBalance = await gobContract.balanceOf(address);

    return {
        balances: {
            sgob: ethers.utils.formatUnits(sgobBalance, "gwei"),
            gob: ethers.utils.formatUnits(gobBalance, "gwei"),
        },
    };
});

interface ILoadAccountDetails {
    address: string;
    networkID: Networks;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
}

interface IUserAccountDetails {
    balances: {
        gob: string;
        sgob: string;
    };
    staking: {
        gob: number;
        sgob: number;
    };
}

export const loadAccountDetails = createAsyncThunk("account/loadAccountDetails", async ({ networkID, provider, address }: ILoadAccountDetails): Promise<IUserAccountDetails> => {
    let gobBalance = 0;
    let sgobBalance = 0;
    let stakeAllowance = 0;
    let unstakeAllowance = 0;

    const addresses = getAddresses(networkID);

    if (addresses.GOB_ADDRESS) {
        const gobContract = new ethers.Contract(addresses.GOB_ADDRESS, TimeTokenContract, provider);
        gobBalance = await gobContract.balanceOf(address);
        stakeAllowance = await gobContract.allowance(address, addresses.STAKING_HELPER_ADDRESS);
    }

    if (addresses.SGOB_ADDRESS) {
        const sgobContract = new ethers.Contract(addresses.SGOB_ADDRESS, MemoTokenContract, provider);
        sgobBalance = await sgobContract.balanceOf(address);
        unstakeAllowance = await sgobContract.allowance(address, addresses.STAKING_ADDRESS);
    }

    return {
        balances: {
            sgob: ethers.utils.formatUnits(sgobBalance, "gwei"),
            gob: ethers.utils.formatUnits(gobBalance, "gwei"),
        },
        staking: {
            gob: Number(stakeAllowance),
            sgob: Number(unstakeAllowance),
        },
    };
});

interface ICalcUserBondDetails {
    address: string;
    bond: Bond;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    networkID: Networks;
}

export interface IUserBondDetails {
    allowance: number;
    balance: number;
    bchBalance: number;
    interestDue: number;
    bondMaturationBlock: number;
    pendingPayout: number; //Payout formatted in gwei.
}

export const calculateUserBondDetails = createAsyncThunk("account/calculateUserBondDetails", async ({ address, bond, networkID, provider }: ICalcUserBondDetails) => {
    if (!address) {
        return new Promise<any>(resevle => {
            resevle({
                bond: "",
                displayName: "",
                bondIconSvg: "",
                isLP: false,
                allowance: 0,
                balance: 0,
                interestDue: 0,
                bondMaturationBlock: 0,
                pendingPayout: "",
                bchBalance: 0,
            });
        });
    }

    const bondContract = bond.getContractForBond(networkID, provider);
    const reserveContract = bond.getContractForReserve(networkID, provider);

    let interestDue, pendingPayout, bondMaturationBlock;

    const bondDetails = await bondContract.bondInfo(address);

    if (bond.isPro) {
        if (bond.name === "gob-gbch-bond") {
            interestDue = bondDetails.payout / Math.pow(10, 9);
        } else {
            interestDue = bondDetails.payout / Math.pow(10, 18);
        }
        bondMaturationBlock = Number(bondDetails.vesting) + Number(bondDetails.lastBlockTimestamp);
        pendingPayout = await bondContract.pendingPayoutFor(address);
    } else {
        interestDue = bondDetails.payout / Math.pow(10, 9);
        bondMaturationBlock = Number(bondDetails.vesting) + Number(bondDetails.lastTime);
        pendingPayout = await bondContract.pendingPayoutFor(address);
    }

    let allowance,
        balance = "0";

    allowance = await reserveContract.allowance(address, bond.getAddressForBond(networkID));
    balance = await reserveContract.balanceOf(address);
    let balanceVal: any = ethers.utils.formatEther(balance);
    if (bond.name === "gob-bond") {
        balanceVal = Number(balanceVal) * Math.pow(10, 9);
    }

    const bchBalance = await provider.getSigner().getBalance();
    const bchVal = ethers.utils.formatEther(bchBalance);

    let pendingPayoutVal: any = ethers.utils.formatUnits(pendingPayout, "gwei");
    if (bond.isPro) {
        if (bond.name !== "gob-gbch-bond") {
            pendingPayoutVal = pendingPayoutVal / Math.pow(10, 9);
        }
    }
    return {
        bond: bond.name,
        displayName: bond.displayName,
        bondIconSvg: bond.bondIconSvg,
        isLP: bond.isLP,
        allowance: Number(allowance),
        balance: Number(balanceVal),
        bchBalance: Number(bchVal),
        interestDue,
        bondMaturationBlock,
        pendingPayout: Number(pendingPayoutVal),
    };
});

interface ICalcUserTokenDetails {
    address: string;
    token: IToken;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    networkID: Networks;
}

export interface IUserTokenDetails {
    allowance: number;
    balance: number;
    isBch?: boolean;
}

export const calculateUserTokenDetails = createAsyncThunk("account/calculateUserTokenDetails", async ({ address, token, networkID, provider }: ICalcUserTokenDetails) => {
    if (!address) {
        return new Promise<any>(resevle => {
            resevle({
                token: "",
                address: "",
                img: "",
                allowance: 0,
                balance: 0,
            });
        });
    }

    if (token.isBch) {
        const bchBalance = await provider.getSigner().getBalance();
        const bchVal = ethers.utils.formatEther(bchBalance);

        return {
            token: token.name,
            tokenIcon: token.img,
            balance: Number(bchVal),
            isBch: true,
        };
    }

    const addresses = getAddresses(networkID);

    const tokenContract = new ethers.Contract(token.address, MimTokenContract, provider);

    let allowance,
        balance = "0";

    allowance = await tokenContract.allowance(address, address);
    balance = await tokenContract.balanceOf(address);

    const balanceVal = Number(balance) / Math.pow(10, token.decimals);

    return {
        token: token.name,
        address: token.address,
        img: token.img,
        allowance: Number(allowance),
        balance: Number(balanceVal),
    };
});

export interface IAccountSlice {
    bonds: { [key: string]: IUserBondDetails };
    balances: {
        sgob: string;
        gob: string;
    };
    loading: boolean;
    staking: {
        gob: number;
        sgob: number;
    };
    tokens: { [key: string]: IUserTokenDetails };
}

const initialState: IAccountSlice = {
    loading: true,
    bonds: {},
    balances: { sgob: "", gob: "" },
    staking: { gob: 0, sgob: 0 },
    tokens: {},
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        fetchAccountSuccess(state, action) {
            setAll(state, action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loadAccountDetails.pending, state => {
                state.loading = true;
            })
            .addCase(loadAccountDetails.fulfilled, (state, action) => {
                setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(loadAccountDetails.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            })
            .addCase(getBalances.pending, state => {
                state.loading = true;
            })
            .addCase(getBalances.fulfilled, (state, action) => {
                setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(getBalances.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            })
            .addCase(calculateUserBondDetails.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(calculateUserBondDetails.fulfilled, (state, action) => {
                if (!action.payload) return;
                const bond = action.payload.bond;
                state.bonds[bond] = action.payload;
                state.loading = false;
            })
            .addCase(calculateUserBondDetails.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            })
            .addCase(calculateUserTokenDetails.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(calculateUserTokenDetails.fulfilled, (state, action) => {
                if (!action.payload) return;
                const token = action.payload.token;
                state.tokens[token] = action.payload;
                state.loading = false;
            })
            .addCase(calculateUserTokenDetails.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            });
    },
});

export default accountSlice.reducer;

export const { fetchAccountSuccess } = accountSlice.actions;

const baseInfo = (state: RootState) => state.account;

export const getAccountState = createSelector(baseInfo, account => account);
