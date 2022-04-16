import { commonConfig } from '@crypto-koi/common/lib/commonConfig'
import CryptoKoiSmartContract from '@crypto-koi/common/lib/contracts/CryptoKoiSmartContract'
import {
    newProvider,
    switchOrAddNetworkFactory,
} from '@crypto-koi/common/lib/web3'
import { Web3Provider } from '@ethersproject/providers'
import WalletConnect from '@walletconnect/client'
import QRCodeModal from '@walletconnect/qrcode-modal'
import { ethers } from 'ethers'

export type WalletDescriptor = { iconUrl: string; name: string; color: string }
declare const window: any
// Create a connector
const connector = new WalletConnect({
    bridge: 'https://bridge.walletconnect.org', // Required
    qrcodeModal: QRCodeModal,
    clientMeta: {
        description: 'CryptoKoi. A digital Art project.',
        url: 'https://crypto-koi.io',
        icons: ['https://crypto-koi.io/assets/crypto-koi-logo.svg'],
        name: 'CryptoKoi',
    },
})

// use a 5 min timeout for the user to complete the request.
const switchOrAddNetwork = switchOrAddNetworkFactory(console, 5 * 60 * 1000)

/**
 * Returns either a metamask or a wallet connect provider.
 * this depends on the browser.
 */
const getFittingWeb3Provider = async (): Promise<Web3Provider> => {
    // check if the browser is running metamask
    let provider: Web3Provider
    if (window.ethereum) {
        // connect to the provider
        provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send('eth_requestAccounts', [])
    } else {
        const p = newProvider(connector, commonConfig.chain)
        await p.enable()
        provider = new ethers.providers.Web3Provider(p)
    }

    await switchOrAddNetwork(provider, commonConfig.chain)

    return provider
}

export const makeNft = async (
    getNftSignature: (
        userAddress: string
    ) => Promise<{ tokenId: string; signature: string }>
) => {
    const provider = await getFittingWeb3Provider()

    const cryptoKoiContract = new CryptoKoiSmartContract(
        await provider.getSigner().getAddress(),
        provider
    )

    const result = await getNftSignature(cryptoKoiContract.getUserAddress())
    if (!result) {
        return
    }

    return cryptoKoiContract.redeem(result.tokenId, result.signature)
}

export const connectToWallet = async (): Promise<
    [string, WalletDescriptor]
> => {
    const provider = await getFittingWeb3Provider()
    const signer = provider.getSigner()

    return [
        await signer.getAddress(),
        connectionUrlToProvider(provider.connection.url),
    ]
}

export const connectionUrlToProvider = (url: string): WalletDescriptor => {
    switch (url) {
        case 'metamask':
            return {
                name: 'MetaMask',
                iconUrl: '/assets/metamask.svg',
                color: '#F5841F',
            }
        default:
            return {
                name: 'WalletConnect',
                iconUrl: '/assets/walletconnect.svg',
                color: '#3B99FC',
            }
    }
}
