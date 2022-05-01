import GobIcon from "../assets/tokens/GOB.png";
import BchIcon from "../assets/tokens/BCH.png";
import FusdIcon from "../assets/tokens/FLEXUSD.png";
import GbchIcon from "../assets/tokens/GBCH.png";

export interface IToken {
    name: string;
    address: string;
    img: string;
    isBch?: boolean;
    decimals: number;
}

export const bch: IToken = {
    name: "BCH",
    isBch: true,
    img: BchIcon,
    address: "",
    decimals: 18,
};

export const wbch: IToken = {
    name: "wBCH",
    img: BchIcon,
    address: "0x17F4FCF5b6E0A95D4eE331c8529041896A073F9b",
    decimals: 18,
};

export const gob: IToken = {
    name: "GOB",
    address: "0x56381cB87C8990971f3e9d948939e1a95eA113a3",
    img: GobIcon,
    decimals: 9,
};

export const fusd: IToken = {
    name: "FUSD",
    address: "0x7b2B3C5308ab5b2a1d9a94d20D35CCDf61e05b72",
    img: FusdIcon,
    decimals: 18,
};

export const gbch: IToken = {
    name: "GBCH",
    address: "0x009dC89aC501a62C4FaaF7196aeE90CF79B6fC7c",
    img: GbchIcon,
    decimals: 18,
};
export default [fusd, gob, gbch];
