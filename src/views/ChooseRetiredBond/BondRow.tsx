import { useSelector, useDispatch } from "react-redux";

import BondLogo from "../../components/BondLogo";
import { useWeb3Context } from "../../hooks";

import { Paper, TableRow, TableCell, Slide, Link } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { priceUnits, trim, prettifySeconds, prettyVestingPeriod } from "../../helpers";
import { IPendingTxn, isPendingTxn, txnButtonText } from "../../store/slices/pending-txns-slice";
import { IReduxState } from "../../store/slices/state.interface";
import "./choosebond.scss";
import { Skeleton } from "@material-ui/lab";
import { IAllBondData } from "../../hooks/bonds";
import { IUserBondDetails } from "../../store/slices/account-slice";
import { IBondDetails, redeemBond } from "../../store/slices/bond-slice";
import { messages } from "../../constants/messages";
import { warning } from "../../store/slices/messages-slice";
import { useTranslation } from "react-i18next";

interface IBondProps {
    bond: IAllBondData;
}

export function BondDataCard({ bond }: IBondProps) {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const { provider, address, chainID, checkWrongNetwork } = useWeb3Context();

    const isBondLoading = useSelector<IReduxState, boolean>(state => state.bonding.loading ?? true);

    const currentBlockTime = useSelector<IReduxState, number>(state => {
        return state.app.currentBlockTime;
    });

    const pendingTransactions = useSelector<IReduxState, IPendingTxn[]>(state => {
        return state.pendingTransactions;
    });

    const bondingState = useSelector<IReduxState, IBondDetails>(state => {
        return state.bonding && state.bonding[bond.name];
    });

    const bondDetails = useSelector<IReduxState, IUserBondDetails>(state => {
        return state.account.bonds && state.account.bonds[bond.name];
    });

    async function onRedeem(autostake: boolean) {
        if (await checkWrongNetwork()) return;

        if (bond.interestDue === 0 || bond.pendingPayout === 0) {
            dispatch(warning({ text: messages.nothing_to_claim }));
            return;
        }

        await dispatch(redeemBond({ address, bond, networkID: chainID, provider, autostake }));
    }

    const vestingTime = () => {
        if (!bondDetails) {
            return "";
        }
        return prettyVestingPeriod(currentBlockTime, bondDetails.bondMaturationBlock);
    };

    const vestingPeriod = () => {
        return prettifySeconds(bondingState.vestingTerm, "day");
    };

    return (
        <Slide direction="up" in={true}>
            <Paper className="bond-data-card">
                <div className="bond-pair">
                    <BondLogo bond={bond} />
                    <div className="bond-name">
                        <p className="bond-name-title">{bond.displayName}</p>
                        {bond.isLP && (
                            <div>
                                <Link href={bond.lpUrl} target="_blank">
                                    <p className="bond-name-title">{t("bond:ViewContract")}</p>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                <div className="data-row">
                    <p className="bond-name-title">{t("bond:PendingRewards")}</p>
                    <p className="bond-name-title">{isBondLoading ? <Skeleton width="100px" /> : `${trim(bond.interestDue, 4)} ${bond.payoutToken}`}</p>
                </div>
                <div className="data-row">
                    <p className="bond-name-title">{t("bond:ClaimableRewards")}</p>
                    <p className="bond-name-title">{isBondLoading ? <Skeleton width="100px" /> : `${trim(bond.pendingPayout, 4)} ${bond.payoutToken}`}</p>
                </div>

                <div
                    className="bond-table-btn"
                    onClick={() => {
                        if (isPendingTxn(pendingTransactions, "redeem_bond_" + bond.name)) return;
                        onRedeem(false);
                    }}
                >
                    <p>{txnButtonText(pendingTransactions, "redeem_bond_" + bond.name, t("bond:Claim"))}</p>
                </div>
            </Paper>
        </Slide>
    );
}

export function BondTableData({ bond }: IBondProps) {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const { provider, address, chainID, checkWrongNetwork } = useWeb3Context();

    const isBondLoading = useSelector<IReduxState, boolean>(state => state.bonding.loading ?? true);

    const currentBlockTime = useSelector<IReduxState, number>(state => {
        return state.app.currentBlockTime;
    });

    const pendingTransactions = useSelector<IReduxState, IPendingTxn[]>(state => {
        return state.pendingTransactions;
    });

    const bondingState = useSelector<IReduxState, IBondDetails>(state => {
        return state.bonding && state.bonding[bond.name];
    });

    const bondDetails = useSelector<IReduxState, IUserBondDetails>(state => {
        return state.account.bonds && state.account.bonds[bond.name];
    });

    async function onRedeem(autostake: boolean) {
        if (await checkWrongNetwork()) return;

        if (bond.interestDue === 0 || bond.pendingPayout === 0) {
            dispatch(warning({ text: messages.nothing_to_claim }));
            return;
        }

        await dispatch(redeemBond({ address, bond, networkID: chainID, provider, autostake }));
    }

    const vestingTime = () => {
        if (!bondDetails) {
            return "";
        }
        return prettyVestingPeriod(currentBlockTime, bondDetails.bondMaturationBlock);
    };

    const vestingPeriod = () => {
        return prettifySeconds(bondingState.vestingTerm, "day");
    };

    return (
        <TableRow>
            <TableCell align="left">
                <BondLogo bond={bond} />
                <div className="bond-name">
                    <p className="bond-name-title">{bond.displayName}</p>
                    {bond.isLP && (
                        <Link color="primary" href={bond.lpUrl} target="_blank">
                            <p className="bond-name-title">{t("bond:ViewContract")}</p>
                        </Link>
                    )}
                </div>
            </TableCell>

            <TableCell align="right">
                <p className="bond-name-title">{isBondLoading ? <Skeleton width="100px" /> : `${trim(bond.interestDue, 4)} ${bond.payoutToken}`}</p>
            </TableCell>
            <TableCell align="right">
                <p className="bond-name-title">{isBondLoading ? <Skeleton width="100px" /> : `${trim(bond.pendingPayout, 4)} ${bond.payoutToken}`}</p>
            </TableCell>
            <TableCell>
                <button
                    className="transaction-button bond-approve-btn bond-table-btn"
                    onClick={() => {
                        if (isPendingTxn(pendingTransactions, "redeem_bond_" + bond.name)) return;
                        onRedeem(false);
                    }}
                >
                    <p>{txnButtonText(pendingTransactions, "redeem_bond_" + bond.name, t("bond:Claim"))}</p>
                </button>
            </TableCell>
        </TableRow>
    );
}
