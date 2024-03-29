import { ethers, constants } from "ethers";
import { getMarketPrice, getProbondMarketPrice, getTokenPrice } from "../../helpers";
import { calculateUserBondDetails, getBalances } from "./account-slice";
import { getAddresses } from "../../constants";
import { fetchPendingTxns, clearPendingTxn } from "./pending-txns-slice";
import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { fetchAccountSuccess } from "./account-slice";
import { Bond } from "../../helpers/bond/bond";
import { Networks } from "../../constants/blockchain";
import { getBondCalculator } from "../../helpers/bond-calculator";
import { RootState } from "../store";
import { fusdGob } from "../../helpers/bond";
import { error, warning, success, info } from "../slices/messages-slice";
import { messages } from "../../constants/messages";
import { getGasPrice } from "../../helpers/get-gas-price";
import { metamaskErrorWrap } from "../../helpers/metamask-error-wrap";
import { sleep } from "../../helpers";
import i18n from "../../i18n";
import { ProBond } from "../../helpers/bond/stable-bond";
import { convertUndertoWrapper, convertWrappertoUnder } from "../../helpers/token-price";

interface IChangeApproval {
    bond: Bond;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    networkID: Networks;
    address: string;
}

export const changeApproval = createAsyncThunk("bonding/changeApproval", async ({ bond, provider, networkID, address }: IChangeApproval, { dispatch }) => {
    if (!provider) {
        dispatch(warning({ text: messages.please_connect_wallet }));
        return;
    }

    const signer = provider.getSigner();
    const reserveContract = bond.getContractForReserve(networkID, signer);

    let approveTx;
    try {
        const gasPrice = await getGasPrice(provider);
        const bondAddr = bond.getAddressForBond(networkID);
        approveTx = await reserveContract.approve(bondAddr, constants.MaxUint256, { gasPrice });
        dispatch(
            fetchPendingTxns({
                txnHash: approveTx.hash,
                text: i18n.t("bond:ApprovingBond", { bond: bond.displayName }),
                type: "approve_" + bond.name,
            }),
        );
        await approveTx.wait();
        dispatch(success({ text: messages.tx_successfully_sent }));
    } catch (err: any) {
        metamaskErrorWrap(err, dispatch);
    } finally {
        if (approveTx) {
            dispatch(clearPendingTxn(approveTx.hash));
        }
    }

    await sleep(2);

    let allowance = "0";

    allowance = await reserveContract.allowance(address, bond.getAddressForBond(networkID));

    return dispatch(
        fetchAccountSuccess({
            bonds: {
                [bond.name]: {
                    allowance: Number(allowance),
                },
            },
        }),
    );
});

interface ICalcBondDetails {
    bond: Bond;
    value: string | null;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    networkID: Networks;
}

export interface IBondDetails {
    bond: string;
    bondDiscount: number;
    bondQuote: number;
    purchased: number;
    vestingTerm: number;
    maxBondPrice: number;
    bondPrice: number;
    marketPrice: number;
    maxBondPriceToken: number;
}

export const calcBondDetails = createAsyncThunk("bonding/calcBondDetails", async ({ bond, value, provider, networkID }: ICalcBondDetails, { dispatch }) => {
    if (!value) {
        value = "0";
    }

    const amountInWei = ethers.utils.parseEther(value);

    let bondPrice = 0,
        bondDiscount = 0,
        valuation = 0,
        bondQuote = 0,
        marketPrice = 0;

    const addresses = getAddresses(networkID);

    const bondContract = bond.getContractForBond(networkID, provider);
    const bondCalcContract = getBondCalculator(networkID, provider);

    const terms = await bondContract.terms();
    let maxBondPrice = (await bondContract.maxPayout()) / Math.pow(10, 9);
    // debugger;
    marketPrice = await getMarketPrice(networkID, provider);
    const fusdPrice = getTokenPrice("fUSD");
    marketPrice = (marketPrice / Math.pow(10, 9)) * fusdPrice;
    let gbchMarketPrice = 0;
    let gbchBondRatio = 0;
    if (bond.isPro) {
        // var mPrice = await getPairPrice();
        // gbchBondRatio = mPrice.token0Price;
        // gbchMarketPrice = marketPrice / mPrice.token0Price;
        gbchMarketPrice = await getProbondMarketPrice(bond, networkID, provider);
        gbchMarketPrice = gbchMarketPrice * fusdPrice;
    }

    const bondName = bond.name.replace("r_", "");

    try {
        if (bond.isPro) {
            const bondPriceHex = await bondContract.bondPrice();
            let quote = 0;
            if (bond.name.startsWith("r_") || bond.name === "gob-gbch-bond") {
                quote = bondPriceHex;
            } else {
                quote = await convertUndertoWrapper(bondPriceHex, provider);
            }

            if (["gbch_bond", "gob-gbch-bond", "wgbch-gbch-bond"].includes(bondName)) {
                // bondPrice = (bondPriceHex / 10000000) * gbchMarketPrice;
                bondPrice = (quote / 10000000) * gbchMarketPrice;
            } else if (bondName === "gbch_fusd-bond") {
                // bondPrice = (bondPriceHex / 10000000) * fusdPrice;
                bondPrice = (quote / 10000000) * fusdPrice;
            } else if (bondName === "gob-bond") {
                // bondPrice = (bondPriceHex / 10000000) * fusdPrice;
                bondPrice = (quote / 10000000) * marketPrice;
            } else if (bondName === "gob-sidx-bond") {
                bondPrice = (bondPriceHex / 1000000) * marketPrice;
            } else {
                bondPrice = (bondPriceHex / 10000000) * marketPrice;
            }
            if (bondName === "gob-gbch-bond") {
                bondDiscount = (marketPrice - bondPrice) / bondPrice;
            } else {
                bondDiscount = (gbchMarketPrice - bondPrice) / bondPrice;
            }
            if (bondName !== "gob-gbch-bond") {
                maxBondPrice = maxBondPrice / Math.pow(10, 9);
            }
        } else {
            bondPrice = await bondContract.bondPriceInUSD();
            if (bondName === fusdGob.name) {
                const bchPrice = getTokenPrice("fUSD");
                bondPrice = bondPrice * bchPrice;
            }
            bondDiscount = (marketPrice * Math.pow(10, 18) - bondPrice) / bondPrice;
            bondPrice = bondPrice / Math.pow(10, 18);
        }
    } catch (e) {
        console.log("error getting bondPriceInUSD", e);
    }

    let maxBondPriceToken = 0;
    const maxBodValue = ethers.utils.parseEther("1");

    if (bond.isLP) {
        valuation = await bondCalcContract.valuation(bond.getAddressForReserve(networkID), amountInWei);
        bondQuote = await bondContract.payoutFor(valuation);
        bondQuote = bondQuote / Math.pow(10, 9);

        const maxValuation = await bondCalcContract.valuation(bond.getAddressForReserve(networkID), maxBodValue);
        const maxBondQuote = await bondContract.payoutFor(maxValuation);
        maxBondPriceToken = maxBondPrice / (maxBondQuote * Math.pow(10, -9));
    } else if (bond.isPro) {
        // debugger;
        const bondQuoteObj: any = await bondContract.payoutFor(amountInWei);
        const maxBondQuoteObj = await bondContract.payoutFor(maxBodValue);
        if (bondName === "gob-bond") {
            if (bond.name.startsWith("r_")) {
                bondQuote = bondQuoteObj._payout * Math.pow(10, -27);
            } else {
                bondQuote = bondQuoteObj._payout; // * Math.pow(10, -27);
                const quote = await convertWrappertoUnder(bondQuote, provider);
                bondQuote = quote * Math.pow(10, -27);
            }
            maxBondPriceToken = maxBondPrice / (maxBondQuoteObj._payout * Math.pow(10, -27));
        } else if (bond.name === "wgbch-gbch-bond" || bond.name === "gbch_fusd-bond") {
            // wgbch-fusd
            if (bond.name.startsWith("r_")) {
                bondQuote = bondQuoteObj._payout * Math.pow(10, -27);
            } else {
                bondQuote = bondQuoteObj._payout; // * Math.pow(10, -27);
                const quote = await convertWrappertoUnder(bondQuote, provider);
                bondQuote = quote * Math.pow(10, -18);
            }
            maxBondPriceToken = maxBondPrice / (maxBondQuoteObj._payout * Math.pow(10, -18));
        } else if (bondName === "gob-gbch-bond") {
            bondQuote = bondQuoteObj._payout * Math.pow(10, -9);
            maxBondPriceToken = maxBondPrice / (maxBondQuoteObj._payout * Math.pow(10, -9));
        } else {
            bondQuote = bondQuoteObj._payout / Math.pow(10, 18);
            maxBondPriceToken = maxBondPrice / (maxBondQuoteObj._payout * Math.pow(10, -18));
        }
    } else {
        bondQuote = await bondContract.payoutFor(amountInWei);
        bondQuote = bondQuote / Math.pow(10, 18);

        const maxBondQuote = await bondContract.payoutFor(maxBodValue);
        maxBondPriceToken = maxBondPrice / (maxBondQuote * Math.pow(10, -18));
    }

    if (!!value && bondQuote > maxBondPrice) {
        dispatch(error({ text: messages.try_mint_more(maxBondPrice.toFixed(2).toString()) }));
    }

    // Calculate bonds purchased
    const token = bond.getContractForReserve(networkID, provider);
    let purchased = 0;

    if (bond.isLP) {
        purchased = await token.balanceOf(addresses.TREASURY_ADDRESS);
        const assetAddress = bond.getAddressForReserve(networkID);
        const markdown = await bondCalcContract.markdown(assetAddress);

        purchased = await bondCalcContract.valuation(assetAddress, purchased);
        purchased = (markdown / Math.pow(10, 18)) * (purchased / Math.pow(10, 9));

        if (bond.name === fusdGob.name) {
            const fusdPrice = getTokenPrice("fUSD");
            purchased = purchased * fusdPrice;
        }
        //} else if (bond.name === fusd.name) {
        //   purchased = purchased / Math.pow(10, 18);
        //   const fusdPrice = getTokenPrice("fUSD");
        //   purchased = purchased * fusdPrice;
    } else if (bondName === "gob-bond") {
        let proTreasuryAddress = (bond as ProBond).getProTreasuryAddress(networkID);
        purchased = await token.balanceOf(proTreasuryAddress);
        purchased = (purchased / Math.pow(10, 9)) * marketPrice;
    } else if (bondName === "gbch_bond") {
        let proTreasuryAddress = (bond as ProBond).getProTreasuryAddress(networkID);
        purchased = await token.balanceOf(proTreasuryAddress);
        purchased = (purchased / Math.pow(10, 19)) * gbchMarketPrice;
    } else if (bondName === "gob-gbch-bond" || bond.name === "wgbch-gbch-bond") {
        let proTreasuryAddress = (bond as ProBond).getProTreasuryAddress(networkID);
        purchased = await token.balanceOf(proTreasuryAddress);
        purchased = (purchased / Math.pow(10, 18)) * gbchMarketPrice;
    } else if (bondName === "gbch_fusd-bond") {
        let proTreasuryAddress = (bond as ProBond).getProTreasuryAddress(networkID);
        purchased = await token.balanceOf(proTreasuryAddress);
        purchased = purchased / Math.pow(10, 18) + 5200;
    } else if (bond.isPro) {
        let proTreasuryAddress = (bond as ProBond).getProTreasuryAddress(networkID);
        purchased = await token.balanceOf(proTreasuryAddress);
        purchased = purchased / Math.pow(10, 18);
    } else {
        await token.balanceOf(addresses.TREASURY_ADDRESS);
        purchased = purchased / Math.pow(10, 18);
    }

    return {
        bond: bond.name,
        bondDiscount,
        bondQuote,
        purchased,
        vestingTerm: Number(terms.vestingTerm),
        maxBondPrice,
        // bondPrice: bondPrice / Math.pow(10, 18),
        bondPrice,
        marketPrice,
        maxBondPriceToken,
    };
});
interface IBondAsset {
    value: string;
    address: string;
    bond: Bond;
    networkID: Networks;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    slippage: number;
    useBch: boolean;
}
export const bondAsset = createAsyncThunk("bonding/bondAsset", async ({ value, address, bond, networkID, provider, slippage, useBch }: IBondAsset, { dispatch }) => {
    const depositorAddress = address;
    const acceptedSlippage = slippage / 100 || 0.005;
    console.log("VALUE", value);
    const valueInWei = ethers.utils.parseUnits(value, "ether");
    console.error("Value in WEI", valueInWei);
    const signer = provider.getSigner();
    const bondContract = bond.getContractForBond(networkID, signer);

    const calculatePremium = await bondContract.bondPrice();
    const maxPremium = Math.round(calculatePremium * (1 + acceptedSlippage));

    let bondTx;
    try {
        const gasPrice = await getGasPrice(provider);

        if (useBch) {
            bondTx = await bondContract.deposit(valueInWei, maxPremium, depositorAddress, { value: valueInWei, gasPrice });
        } else {
            bondTx = await bondContract.deposit(valueInWei, maxPremium, depositorAddress, { gasPrice });
        }
        dispatch(
            fetchPendingTxns({
                txnHash: bondTx.hash,
                text: i18n.t("bond:BondingBond", { bond: bond.displayName }),
                type: "bond_" + bond.name,
            }),
        );
        await bondTx.wait();
        dispatch(success({ text: messages.tx_successfully_sent }));
        dispatch(info({ text: messages.your_balance_update_soon }));
        await sleep(10);
        await dispatch(calculateUserBondDetails({ address, bond, networkID, provider }));
        dispatch(info({ text: messages.your_balance_updated }));
        return;
    } catch (err: any) {
        return metamaskErrorWrap(err, dispatch);
    } finally {
        if (bondTx) {
            dispatch(clearPendingTxn(bondTx.hash));
        }
    }
});

interface IRedeemBond {
    address: string;
    bond: Bond;
    networkID: Networks;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    autostake: boolean;
}

export const redeemBond = createAsyncThunk("bonding/redeemBond", async ({ address, bond, networkID, provider, autostake }: IRedeemBond, { dispatch }) => {
    if (!provider) {
        dispatch(warning({ text: messages.please_connect_wallet }));
        return;
    }

    const signer = provider.getSigner();
    const bondContract = bond.getContractForBond(networkID, signer);

    let redeemTx;
    try {
        const gasPrice = await getGasPrice(provider);
        if (bond.isPro) {
            redeemTx = await bondContract.redeem(address);
        } else {
            redeemTx = await bondContract.redeem(address, autostake === true, { gasPrice });
        }
        const pendingTxnType = "redeem_bond_" + bond.name + (autostake === true ? "_autostake" : "");
        dispatch(
            fetchPendingTxns({
                txnHash: redeemTx.hash,
                text: i18n.t("bond:RedeemingBond", { bond: bond.displayName }),
                type: pendingTxnType,
            }),
        );
        await redeemTx.wait();
        dispatch(success({ text: messages.tx_successfully_sent }));
        await sleep(0.01);
        dispatch(info({ text: messages.your_balance_update_soon }));
        await sleep(10);
        await dispatch(calculateUserBondDetails({ address, bond, networkID, provider }));
        await dispatch(getBalances({ address, networkID, provider }));
        dispatch(info({ text: messages.your_balance_updated }));
        return;
    } catch (err: any) {
        metamaskErrorWrap(err, dispatch);
    } finally {
        if (redeemTx) {
            dispatch(clearPendingTxn(redeemTx.hash));
        }
    }
});

export interface IBondSlice {
    loading: boolean;
    [key: string]: any;
}

const initialState: IBondSlice = {
    loading: true,
};

const setBondState = (state: IBondSlice, payload: any) => {
    const bond = payload.bond;
    const newState = { ...state[bond], ...payload };
    state[bond] = newState;
    state.loading = false;
};

const bondingSlice = createSlice({
    name: "bonding",
    initialState,
    reducers: {
        fetchBondSuccess(state, action) {
            state[action.payload.bond] = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(calcBondDetails.pending, state => {
                state.loading = true;
            })
            .addCase(calcBondDetails.fulfilled, (state, action) => {
                setBondState(state, action.payload);
                state.loading = false;
            })
            .addCase(calcBondDetails.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            });
    },
});

export default bondingSlice.reducer;

export const { fetchBondSuccess } = bondingSlice.actions;

const baseInfo = (state: RootState) => state.bonding;

export const getBondingState = createSelector(baseInfo, bonding => bonding);
