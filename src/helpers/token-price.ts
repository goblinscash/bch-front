import axios from "axios";

const cache: { [key: string]: number } = {};

export const loadTokenPrices = async () => {
    const url = "https://api.coingecko.com/api/v3/simple/price?ids=flex-usd,bitcoin-cash,&vs_currencies=usd";
    const { data } = await axios.get(url);

    cache["BCH"] = data["bitcoin-cash"].usd;
    cache["fUSD"] = data["flex-usd"].usd;
    cache["wBCH"] = data["bitcoin-cash"].usd;
};

export const getTokenPrice = (symbol: string): number => {
    return Number(cache[symbol]);
};
