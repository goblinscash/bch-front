import { useSelector } from "react-redux";
import { Typography, Paper, Grid, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Zoom } from "@material-ui/core";
import { BondTableData, BondDataCard } from "./BondRow";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { trim } from "../../helpers";
import { gob, gbch } from "../../helpers/tokens";
import useBonds from "../../hooks/bonds";
import "./choosebond.scss";
import { Skeleton } from "@material-ui/lab";
import { IReduxState } from "../../store/slices/state.interface";

import { useTranslation } from "react-i18next";

function ChooseBond() {
    const { t } = useTranslation();

    const { bonds } = useBonds();
    const isSmallScreen = useMediaQuery("(max-width: 733px)"); // change to breakpoint query

    const isAppLoading = useSelector<IReduxState, boolean>(state => state.app.loading);
    const marketPrice = useSelector<IReduxState, number>(state => {
        return state.app.marketPrice;
    });
    const gbchMarketPrice = useSelector<IReduxState, number>(state => {
        return state.app.gbchMarketPrice;
    });

    const treasuryBalance = useSelector<IReduxState, number>(state => {
        return state.app.treasuryBalance;
    });
    const treasuryProBalance = useSelector<IReduxState, number>(state => {
        return state.app.treasuryProBalance;
    });

    return (
        <>
            <div className="choose-bond-view">
                <Zoom in={true}>
                    <div className="choose-bond-view-card">
                        <Grid container item xs={12} spacing={2} className="choose-bond-view-card-metrics">
                            <Grid item xs={6} sm={2}>
                                <img src={gob.img} alt="GOB" style={{ width: "36px", top: "-8px", position: "relative", float: "right" }} />
                            </Grid>
                            <Grid item xs={6} sm={2}>
                                <div className="choose-bond-view-card-metrics-value" style={{ textAlign: "left" }}>
                                    <text>GOB</text>
                                </div>
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <div className="choose-bond-view-card-metrics-value">
                                    <span>Treasury: </span>
                                    {isAppLoading ? (
                                        <Skeleton width="180px" />
                                    ) : (
                                        new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                            maximumFractionDigits: 0,
                                            minimumFractionDigits: 0,
                                        }).format(treasuryBalance + 46000)
                                    )}
                                </div>
                            </Grid>

                            <Grid item xs={6} sm={4}>
                                <Box textAlign="center">
                                    <div className="choose-bond-view-card-metrics-value">
                                        {t("GOBPrice")}: {isAppLoading ? <Skeleton width="100px" /> : `$${trim(marketPrice, 2)}`}
                                    </div>
                                </Box>
                            </Grid>
                        </Grid>

                        {!isSmallScreen && (
                            <Grid container item>
                                <TableContainer className="choose-bond-view-card-table">
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">
                                                    <p className="choose-bond-view-card-table-title">{t("bond:Mint")}</p>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <p className="choose-bond-view-card-table-title">{t("Price")}</p>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <p className="choose-bond-view-card-table-title">{t("ROI")}</p>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <p className="choose-bond-view-card-table-title">{t("bond:Purchased")}</p>
                                                </TableCell>
                                                <TableCell align="right"></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {bonds
                                                .filter(bond => bond.payoutToken === "GOB")
                                                .map(bond => (
                                                    <BondTableData key={bond.name} bond={bond} />
                                                ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        )}
                    </div>
                </Zoom>

                {isSmallScreen && (
                    <div className="choose-bond-view-card-container">
                        <Grid container item spacing={2}>
                            {bonds
                                .filter(bond => bond.payoutToken === "GOB")
                                .map(bond => (
                                    <Grid item xs={12} key={bond.name}>
                                        <BondDataCard key={bond.name} bond={bond} />
                                    </Grid>
                                ))}
                        </Grid>
                    </div>
                )}
            </div>
            <div className="choose-bond-view" style={{ marginTop: "10px" }}>
                <Zoom in={true}>
                    <Paper className="choose-bond-view-card">
                        <Grid container item xs={12} spacing={2} className="choose-bond-view-card-metrics">
                            <Grid item xs={6} sm={2}>
                                <img src={gbch.img} alt="GOB" style={{ width: "36px", top: "-8px", position: "relative", float: "right" }} />
                            </Grid>
                            <Grid item xs={6} sm={2}>
                                <div className="choose-bond-view-card-metrics-value" style={{ textAlign: "left" }}>
                                    <text>GBCH</text>
                                </div>
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <div className="choose-bond-view-card-metrics-value">
                                    <span>Treasury: </span>
                                    {isAppLoading ? (
                                        <Skeleton width="180px" />
                                    ) : (
                                        new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                            maximumFractionDigits: 0,
                                            minimumFractionDigits: 0,
                                        }).format(treasuryProBalance)
                                    )}
                                </div>
                            </Grid>

                            <Grid item xs={6} sm={4}>
                                <Box textAlign="center">
                                    <div className="choose-bond-view-card-metrics-value">
                                        {t("GBCH Price")}: {isAppLoading ? <Skeleton width="100px" /> : `$${trim(gbchMarketPrice, 2)}`}
                                    </div>
                                </Box>
                            </Grid>
                        </Grid>
                        {!isSmallScreen && (
                            <Grid container item>
                                <TableContainer className="choose-bond-view-card-table">
                                    <Table aria-label="Available bonds">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">
                                                    <p className="choose-bond-view-card-table-title">{t("bond:Bond")}</p>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <p className="choose-bond-view-card-table-title">{t("Price")}</p>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <p className="choose-bond-view-card-table-title">{t("ROI")}</p>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <p className="choose-bond-view-card-table-title">{t("bond:Purchased")}</p>
                                                </TableCell>
                                                <TableCell align="right"></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {bonds
                                                .filter(bond => bond.payoutToken === "gBCH")
                                                .map(bond => (
                                                    <BondTableData key={bond.name} bond={bond} />
                                                ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        )}
                    </Paper>
                </Zoom>

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

export default ChooseBond;
