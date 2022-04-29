import { Button } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { WalletDescriptor } from '../web3'
import Image from 'next/image'

interface Props {
    onClick: () => void

    wallet: { descriptor: WalletDescriptor; address: string } | null
}
const WalletButton: FunctionComponent<Props> = (props) => {
    const { wallet } = props
    if (wallet === null) {
        return (
            <Button onClick={props.onClick} isFullWidth>
                Connect Wallet
            </Button>
        )
    }
    return (
        <>
            <Button
                leftIcon={
                    <Image
                        width={30}
                        height={30}
                        alt={wallet.descriptor.name}
                        src={wallet.descriptor.iconUrl}
                    />
                }
                isFullWidth
                className="rounded-lg"
            >
                <span>Connected with {wallet.descriptor.name}</span>
            </Button>
            <small className="flex flex-row pt-2 justify-end text-right w-full">
                {wallet.address}
            </small>
        </>
    )
}

export default WalletButton
