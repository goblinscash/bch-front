import { NavLink } from "react-router-dom";
import Social from "./social";
import StakeIcon from "../../../assets/icons/stake.svg";
import BondIcon from "../../../assets/icons/bond.svg";
import BuyIcon from "../../../assets/icons/buy.svg";
import CaretIcon from "../../../assets/icons/governance.svg";
import BorrowIcon from "../../../assets/icons/borrow.svg";
import Snowglobe from "../../../assets/icons/snowglobe.svg";
import DocsIcon from "../../../assets/icons/docs.svg";
import SbchIcon from "../../../assets/smartbch-logo.png";

import ProIcon from "../../../assets/icons/pro.svg";
import GoblinIcon from "../../../assets/icons/goblin-logo-warp-1.png";
import DashboardIcon from "../../../assets/icons/dashboard.svg";
import { trim, shorten } from "../../../helpers";
import { useAddress } from "../../../hooks";
import useBonds from "../../../hooks/bonds";
import { Link } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import "./drawer-content.scss";

import { useTranslation } from "react-i18next";

function NavContent() {
    const { t } = useTranslation();

    const address = useAddress();
    const { bonds } = useBonds();

    return (
        <div className="dapp-sidebar">
            <div className="branding-header">
                <Link href="https://goblins.cash" target="_blank">
                    <img alt="" src={GoblinIcon} />
                </Link>

                {address && (
                    <div className="wallet-link">
                        <Link href={`https://www.smartscan.cash/address/${address}`} target="_blank">
                            <p>{shorten(address)}</p>
                        </Link>
                    </div>
                )}
            </div>

            <div className="dapp-menu-links">
                <div className="dapp-nav">
                    <Link component={NavLink} to="/dashboard" className="button-dapp-menu">
                        <div className="dapp-menu-item">
                            <img alt="" src={DashboardIcon} />
                            <p>{t("Dashboard")}</p>
                        </div>
                    </Link>

                    <Link component={NavLink} to="/stake" className="button-dapp-menu">
                        <div className="dapp-menu-item">
                            <img alt="" src={StakeIcon} />
                            <p>{t("Stake")}</p>
                        </div>
                    </Link>

                    <Link component={NavLink} id="bond-nav" to="/mints" className="button-dapp-menu">
                        <div className="dapp-menu-item">
                            <img alt="" src={BondIcon} />
                            <p>{t("Bond")}</p>
                        </div>
                    </Link>

                    <div className="bond-discounts">
                        <p className="bond-discounts-title">{t("MintDiscounts")}</p>
                        {bonds.map((bond, i) => (
                            <Link component={NavLink} to={`/mints/${bond.name}`} key={i} className={"bond"}>
                                {!bond.bondDiscount ? (
                                    <Skeleton variant="text" width={"150px"} />
                                ) : (
                                    <p>
                                        {bond.displayName}
                                        <span className="bond-pair-roi">{bond.bondDiscount && trim(bond.bondDiscount * 100, 2)}%</span>
                                    </p>
                                )}
                            </Link>
                        ))}
                    </div>

                    <Link
                       href="https://app.mistswap.fi/swap?inputCurrency=0x7b2B3C5308ab5b2a1d9a94d20D35CCDf61e05b72&outputCurrency=0x56381cB87C8990971f3e9d948939e1a95eA113a3"
                       target="_blank"
                    >
                        <div className="button-dapp-menu">
                            <div className="dapp-menu-item">
                                <img alt="" src={BuyIcon} />
                                <p>{t("Buy")}</p>
                            </div>
                        </div>
                    </Link>

                    <Link href="https://app.mistswap.fi/bridge" target="_blank">
                        <div className="button-dapp-menu">
                            <div className="dapp-menu-item">
                                <img alt="" src={BorrowIcon} />
                                <p>{t("Bridge")}</p>
                            </div>
                        </div>
                    </Link>

                    <Link href="#" target="_blank">
                        <div className="button-dapp-menu">
                            <div className="dapp-menu-item">
                                <img alt="" src={DocsIcon} />
                                <p>{t("Docs")}</p>
                            </div>
                        </div>
                    </Link>

                    {/*  <Link component={NavLink} to="/snowglobe" className="button-dapp-menu">
                        <div className="button-dapp-menu">
                            <div className="dapp-menu-item">
                                <img alt="" src={Snowglobe} />
                                <p>{t("Snowglobe")}</p>
                            </div>
                        </div>
                    </Link>
                    */}

                    {/* <Link component={NavLink} id="bond-nav" to="#" className="button-dapp-menu">
                        <div className="dapp-menu-item">
                            <img alt="" src={BorrowIcon} />
                            <p>{t("Borrow")}</p>
                            <span>{t("ComingSoon")}</span>
                        </div>
                    </Link> */}
                </div>
            </div>
            <div className="sbch-icon-wrapper">
                <a href="https://helpme.cash/" target="_blank">
                    <img alt="" className="sbch-icon" src={SbchIcon} width="150px" />
                </a>
            </div>
            <Social />
        </div>
    );
}

export default NavContent;
