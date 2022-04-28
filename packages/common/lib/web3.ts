import { useWalletConnectResult } from '@walletconnect/react-native-dapp/dist/hooks/useWalletConnect'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { ethers } from 'ethers'
import { commonConfig } from './commonConfig'
import { Logger } from './logger'

export function newProvider(
    connector: useWalletConnectResult['connector'],
    network: typeof commonConfig.chain
): WalletConnectProvider {
    const params = {
        rpc: {
            [hexChainId2Number(network.chainId)]: network.rpcUrls[0],
        },
        chainId: hexChainId2Number(network.chainId),
        connector,
    }
    return new WalletConnectProvider(params)
}

export const hexChainId2Number = (chainId: string): number => {
    // example chain id = "0x1683"
    return parseInt(chainId.substring(2), 16)
}

export const chainId2Hex = (chainId: number): string => {
    // example chain id = "80001"
    return '0x' + chainId.toString(16)
}

export const switchOrAddNetworkFactory =
    (log: Logger, timeout = 5000) =>
    (
        provider: ethers.providers.Web3Provider,
        network: typeof commonConfig.chain
    ) => {
        return new Promise<void>(async (resolve, reject) => {
            // resolve after 5 seconds automatically.
            const timeoutId = setTimeout(() => {
                log.warn(
                    'Timeout reached. Switching to network:',
                    network.chainName
                )
                reject()
            }, timeout)

            const providerChainId = (await provider.getNetwork()).chainId

            if (hexChainId2Number(network.chainId) === providerChainId) {
                log.info('chain ID matches - early return')
                resolve()
                return
            }

            await provider.send('wallet_addEthereumChain', [network])
            log.info(
                'chain ID mismatch - sending wallet_switchEthereumChain request with chain id: ' +
                    network.chainId +
                    ', provider chainId: ' +
                    providerChainId
            )

            provider
                .send('wallet_switchEthereumChain', [
                    { chainId: network.chainId },
                ])
                .then(() => {
                    log.info('wallet_switchEthereumChain request successful')
                    clearTimeout(timeoutId)
                    resolve()
                })
                .catch(async (switchErr: any) => {
                    // it did respond - therefore clear the timeout.
                    clearTimeout(timeoutId)

                    if (
                        typeof switchErr === 'object' &&
                        switchErr != null &&
                        'code' in switchErr &&
                        (switchErr as { code: number }).code === 4902
                    ) {
                        log.info(
                            'switch failed with error code 4902 (chain does not exist) - sending wallet_addEthereumChain request'
                        )
                        // try again...
                        await provider.send('wallet_addEthereumChain', [
                            network,
                        ])

                        // wait for the chain to be added
                        await provider.send('wallet_switchEthereumChain', [
                            { chainId: network.chainId },
                        ])
                        resolve()
                    } else {
                        log.error(
                            'switchOrAddNetwork failed with error: ' + switchErr
                        )
                        // rethrow the error.
                        throw switchErr
                    }
                })
        })
    }
