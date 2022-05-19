import { useDispatch, useSelector } from "react-redux";
import { Paper, Grid, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Zoom } from "@material-ui/core";
import { BondTableData, BondDataCard } from "./BondRow";
import { useAddress, useWeb3Context } from "../../hooks";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useRetiredBonds from "../../hooks/retiredbonds";
import "./choosebond.scss";
import { IReduxState } from "../../store/slices/state.interface";
import { calculateUserBondDetails } from "../../store/slices/account-slice";
import { calcBondDetails } from "../../store/slices/bond-slice";

import { useTranslation } from "react-i18next";
import { useEffect } from "react";

function ChooseRetiredBond() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { connect, provider, hasCachedProvider, chainID, connected } = useWeb3Context();
    const address = useAddress();
    const { retiredBonds: bonds } = useRetiredBonds();

    useEffect(() => {
        if (connected) {
            bonds.map(bond => {
                dispatch(calculateUserBondDetails({ address, bond, provider, networkID: chainID }));
            });
        }
    }, [connected]);
    const isSmallScreen = useMediaQuery("(max-width: 733px)"); // change to breakpoint query

    const isAppLoading = useSelector<IReduxState, boolean>(state => state.app.loading);

    return (
        <>
            <div className="choose-bond-view" style={{ marginTop: "10px" }}>
                {!isSmallScreen && (
                    <Zoom in={true}>
                        <Paper className="choose-bond-view-card">
                            <Grid container item>
                                <TableContainer className="choose-bond-view-card-table">
                                    <Table aria-label="Available bonds">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">
                                                    <p className="choose-bond-view-card-table-title">{t("bond:Bond")}</p>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <p className="choose-bond-view-card-table-title">{t("bond:PendingRewards")}</p>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <p className="choose-bond-view-card-table-title">{t("bond:ClaimableRewards")}</p>
                                                </TableCell>
                                                <TableCell align="right"></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {bonds
                                                // .filter(bond => bond.payoutToken === "gBCH")
                                                .map(bond => (
                                                    <BondTableData key={bond.name} bond={bond} />
                                                ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Paper>
                    </Zoom>
                )}

                {isSmallScreen && (
                    <Box className="choose-bond-view-card-container">
                        <Grid container item spacing={2}>
                            {bonds
                                .filter(bond => bond.payoutToken === "gBCH")
                                .map(bond => (
                                    <Grid item xs={12} key={bond.name}>
                                        <BondDataCard key={bond.name} bond={bond} />
                                    </Grid>
                                ))}
                        </Grid>
                    </Box>
                )}
            </div>
        </>
    );
}

export default ChooseRetiredBond;
