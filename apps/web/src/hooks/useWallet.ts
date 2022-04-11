import { useState } from 'react'
import { WalletDescriptor, connectToWallet } from '../web3'

export function useWallet() {
    const [wallet, setWallet] = useState<{
        address: string
        descriptor: WalletDescriptor
    } | null>(null)

    const handleConnectWallet = async () => {
        try {
            const [address, descriptor] = await connectToWallet()
            setWallet({ address, descriptor })
        } catch (e) {
            // TODO: Handle error
            console.error(e)
        }
    }

    return {
        wallet,
        handleConnectWallet,
    }
}
