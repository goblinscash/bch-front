import { SvgIcon, Link } from "@material-ui/core";
import { ReactComponent as GitHub } from "../../../assets/icons/github.svg";
import { ReactComponent as Twitter } from "../../../assets/icons/twitter.svg";
import { ReactComponent as Telegram } from "../../../assets/icons/telegram.svg";
import { ReactComponent as Discord } from "../../../assets/icons/discord.svg";
import DocsIcon from "../../../assets/icons/docs.svg";
import { ReactComponent as Medium } from "../../../assets/icons/medium.svg";
import Youtube from "../../../assets/icons/youtube.png";

export default function Social() {
    return (
        <div className="social-row">
            <Link href="https://github.com/goblinscash" target="_blank">
                <SvgIcon color="primary" component={GitHub} />
            </Link>

            <Link href="https://twitter.com/GoblinsCash" target="_blank">
                <SvgIcon color="primary" component={Twitter} />
            </Link>

            <Link href="https://t.co/YupLbprFkk" target="_blank">
                <SvgIcon viewBox="0 0 32 32" color="primary" component={Telegram} />
            </Link>

            <Link href="https://docs.goblins.cash/" target="_blank">
                <img alt="" src={DocsIcon} />
            </Link>

            <Link href="https://medium.com/@GoblinsCash" target="_blank">
                <SvgIcon color="primary" component={Medium} />
            </Link>

            <Link href="https://www.youtube.com/channel/UCCzhdunwglLryMW8hj4G3zQ" target="_blank">
                <img alt="Goblins Cash Videos" src={Youtube} />
            </Link>
        </div>
    );
}
