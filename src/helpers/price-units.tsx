import { SvgIcon } from "@material-ui/core";
//import { ReactComponent as FlexUsdImg } from "../assets/tokens/MIM.svg";
import { IAllBondData } from "../hooks/bonds";
import { fusd } from "../helpers/bond";

export const priceUnits = (bond: IAllBondData) => {
    //if (bond.name === flexusd.name) return <SvgIcon component={FlexUsdImg} viewBox="0 0 32 32" style={{ height: "15px", width: "15px" }} />;

    return "$";
};
