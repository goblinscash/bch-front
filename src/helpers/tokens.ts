import GobIcon from "../assets/tokens/GOB.png";
import BchIcon from "../assets/tokens/BCH.png";
import FusdIcon from "../assets/tokens/FLEXUSD.png";

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

const gob: IToken = {
    name: "GOB",
    address: "0x363A28937aF13194b233108F1f1D3212532c7c6C",
    img: GobIcon,
    decimals: 9,
};

const fusd: IToken = {
    name: "fUSD",
    address: "0x96917995f030f8fC3D8fDF40F3a6422547c877c1",
    img: FusdIcon,
    decimals: 18,
};
export default [fusd, gob];
