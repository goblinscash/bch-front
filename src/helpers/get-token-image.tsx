import GobImg from "../assets/tokens/GOB.png";
import SGobImg from "../assets/tokens/SGOB.png";

function toUrl(tokenPath: string): string {
    const host = window.location.origin;
    return `${host}/${tokenPath}`;
}

export function getTokenUrl(name: string) {
    if (name === "gob") {
        return toUrl(GobImg);
    }

    if (name === "sgob") {
        return toUrl(SGobImg);
    }

    throw Error(`Token url doesn't support: ${name}`);
}
