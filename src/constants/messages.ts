import i18n from "../i18n";

export const messages = {
    please_connect: i18n.t("messages.PleaseConnect"),
    please_connect_wallet: i18n.t("messages.PleaseConnectWallet"),
    try_mint_more: (value: string) => i18n.t("messages.TryMintMore", { value: value }),
    before_minting: i18n.t("messages.BeforeMinting"),
    existing_mint: i18n.t("messages.ExistingMint"),
    before_stake: i18n.t("messages.BeforeStake"),
    before_unstake: i18n.t("messages.BeforeUnstake"),
    tx_successfully_sent: i18n.t("messages.TxSuccessfullySent"),
    your_balance_updated: i18n.t("messages.YourBalanceUpdated"),
    nothing_to_claim: i18n.t("messages.NothingToClaim"),
    something_wrong: i18n.t("messages.SomethingWrong"),
    switch_to_mainnet: i18n.t("messages.SwitchToSmartbch"),
    slippage_too_small: i18n.t("messages.SlippageTooSmall"),
    slippage_too_big: i18n.t("messages.SlippageTooBig"),
    your_balance_update_soon: i18n.t("messages.YourBalanceUpdateSoon"),
};
