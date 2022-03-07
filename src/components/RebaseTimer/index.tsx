import { useSelector } from "react-redux";
import { secondsUntilBlock, prettifySeconds } from "../../helpers";
import { Box } from "@material-ui/core";
import "./rebasetimer.scss";
import { Skeleton } from "@material-ui/lab";
import { useEffect, useMemo, useState } from "react";
import { IReduxState } from "../../store/slices/state.interface";

import { useTranslation } from "react-i18next";
import { clearTimeout, setTimeout } from "timers";

function RebaseTimer() {
    const { t } = useTranslation();

    const currentBlockTime = useSelector<IReduxState, number>(state => {
        return state.app.currentBlockTime;
    });

    const nextRebase = useSelector<IReduxState, number>(state => {
        return state.app.nextRebase;
    });

    const SECONDS_TO_REFRESH = 1;
    const [secondsToRebase, setSecondsToRebase] = useState(0);
    const [rebaseString, setRebaseString] = useState("");

    function initializeTimer() {
        const rebaseBlock = nextRebase;
        const seconds = secondsUntilBlock(currentBlockTime, rebaseBlock);
        setSecondsToRebase(seconds);
        const prettified = prettifySeconds(seconds);
        setRebaseString(prettified !== "" ? prettified : "Less than a minute");
    }
    useMemo(() => {
        if (currentBlockTime) {
            initializeTimer();
        }
    }, [currentBlockTime]);

    useEffect(() => {
        let timeout = setTimeout(() => {
            setRebaseString(prettifySeconds(secondsToRebase));
            setSecondsToRebase(s => s - 1);
        }, 1000);
        return () => clearTimeout(timeout);
    }, [secondsToRebase]);

    return (
        <Box className="rebase-timer">
            <p>{currentBlockTime ? rebaseString ? <>{t("TimeToNextRebase", { time: rebaseString })}</> : <span>{t("Rebasing")}</span> : <Skeleton width="200px" />}</p>
        </Box>
    );
}

export default RebaseTimer;
