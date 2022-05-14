import { Contract } from "ethers";
import axios from "axios";
import { JsonRpcSigner, StaticJsonRpcProvider } from "@ethersproject/providers";
import { WgbchContract } from "../abi";

const cache: { [key: string]: number } = {};

export const loadTokenPrices = async () => {
    const url = "https://api.coingecko.com/api/v3/simple/price?ids=flex-usd,bitcoin-cash,&vs_currencies=usd";
    const { data } = await axios.get(url);

    cache["BCH"] = data["bitcoin-cash"].usd;
    cache["fUSD"] = data["flex-usd"].usd;
    cache["wBCH"] = data["bitcoin-cash"].usd;
    cache["gBCH"] = data["bitcoin-cash"].usd;
};

export const getTokenPrice = (symbol: string): number => {
    return Number(cache[symbol]);
};

export const getPairPrice = async () => {
    const url = "https://thegraph.mistswap.fi/subgraphs/name/mistswap/exchange";
    const { data } = await axios.post(url, {
        query: '{ pair (id: "0x0fc299bb7c81dba894de4fa80d85943a5561d27a") { id    token0 { id } token1 {      id    }    token0Price    token1Price    volumeUSD    untrackedVolumeUSD    reserve0    reserve1    reserveUSD    reserveETH    trackedReserveETH  }}',
    });
    const pair = data.data.pair;
    return { token0Price: pair.token0Price, token1Price: pair.token1Price };
};

export const convertUndertoWrapper = (amount: number, provider: StaticJsonRpcProvider | JsonRpcSigner) => {
    const address = "0xA8b17927e726177d1D243815193e3Fc88e770dA7";
    var contract = new Contract(address, WgbchContract, provider);
    // return contract.wrapperToUnderlying(amount);
    return contract.underlyingToWrapper(amount);
};

export const convertWrappertoUnder = (amount: number, provider: StaticJsonRpcProvider | JsonRpcSigner) => {
    const address = "0xA8b17927e726177d1D243815193e3Fc88e770dA7";
    var contract = new Contract(address, WgbchContract, provider);
    return contract.wrapperToUnderlying(amount);
};
