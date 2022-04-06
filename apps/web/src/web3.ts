import WalletConnect from '@walletconnect/client'
import QRCodeModal from '@walletconnect/qrcode-modal'
import { ethers } from 'ethers'
import { commonConfig } from '@crypto-koi/common/lib/commonConfig'
import { switchOrAddNetworkFactory } from '@crypto-koi/common/lib/web3'

declare const window: any
// Create a connector
const connector = new WalletConnect({
    bridge: 'https://bridge.walletconnect.org', // Required
    qrcodeModal: QRCodeModal,
})

// use a 5 min timeout for the user to complete the request.
const switchOrAddNetwork = switchOrAddNetworkFactory(console, 5 * 60 * 1000)

export const connectToWallet = async (): Promise<string> => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    await provider.send('eth_requestAccounts', [])

    await switchOrAddNetwork(window.ethereum, commonConfig.chain)

    const signer = provider.getSigner()

    return signer.getAddress()
}
