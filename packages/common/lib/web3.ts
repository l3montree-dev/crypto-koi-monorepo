import { useWalletConnectResult } from "@walletconnect/react-native-dapp/dist/hooks/useWalletConnect";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { commonConfig } from "./commonConfig";

export function newProvider(
    connector: useWalletConnectResult["connector"],
    network: typeof commonConfig.chain
): WalletConnectProvider {
    return new WalletConnectProvider({
        rpc: {
            [parseInt(network.chainId.substring(2), 16)]: network.rpcUrls[0],
        },
        chainId: parseInt(network.chainId.substring(2), 16),
        connector: connector,
    });
}


type LogFn = (...args: Array<string | number>) => void;
export const switchOrAddNetworkFactory = (log: {warn: LogFn, info: LogFn, error: LogFn}, timeout = 5000) => (
    provider: WalletConnectProvider,
    network: typeof commonConfig.chain
) => {
    return new Promise<void>((resolve, reject) => {
        // resolve after 5 seconds automatically.
        const timeoutId = setTimeout(() => {
            log.warn("Timeout reached. Switching to network:", network.chainName);
            reject();
        }, timeout);

        log.info(
            "chain ID mismatch - sending wallet_switchEthereumChain request with chain id: " +
                network.chainId
        );
        provider
            .request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: network.chainId }],
            })
            .then(() => {
                log.info("wallet_switchEthereumChain request successful");
                clearTimeout(timeoutId);
                resolve();
            })
            .catch(async (switchErr) => {
                // it did respond - therefore clear the timeout.
                clearTimeout(timeoutId);

                if (
                    typeof switchErr === "object" &&
                    switchErr != null &&
                    "code" in switchErr &&
                    (switchErr as { code: number }).code === 4902
                ) {
                    log.info(
                        "switch failed with error code 4902 (chain does not exist) - sending wallet_addEthereumChain request"
                    );
                    await provider.request({
                        method: "wallet_addEthereumChain",
                        params: [network],
                    });

                    // wait for the chain to be added
                    await provider.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: network.chainId }],
                    })
                    resolve();
                } else {
                    log.error(
                        "switchOrAddNetwork failed with error: " + switchErr
                    );
                    // rethrow the error.
                    throw switchErr;
                }
            });
    });
}