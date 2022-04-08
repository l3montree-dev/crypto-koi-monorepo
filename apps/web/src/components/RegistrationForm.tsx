import {
    FormControl,
    FormLabel,
    FormHelperText,
    FormErrorMessage,
    Button,
    Input,
} from '@chakra-ui/react'
import { validEmail, notEmpty } from '@crypto-koi/common/lib/validators'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { AppStateContext } from '../hooks/AppStateContext'
import useInput from '../hooks/useInput'
import { WalletDescriptor, connectToWallet } from '../web3'

const RegistrationForm = () => {
    const { services, store } = useContext(AppStateContext)

    const email = useInput({ validator: validEmail, initialState: '' })
    const name = useInput({ validator: notEmpty, initialState: '' })
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

    const handleRegister = async () => {
        store.authStore.setCurrentUser(
            await services.userService.registerUsingWalletAddress({
                email: email.value,
                name: name.value,
                walletAddress: wallet?.address,
            })
        )
    }

    return (
        <form className="md:max-w-lg mx-auto bg-white md:p-4 rounded-lg md:border">
            <h2 className="font-bold text-2xl font-poppins">Registration</h2>

            <FormControl isInvalid={name.isInvalid} className="pt-5">
                <FormLabel htmlFor="name">Username</FormLabel>
                <Input
                    autoFocus
                    errorBorderColor="cherry.500"
                    id="name"
                    type="string"
                    variant="filled"
                    {...name}
                />
                <FormHelperText>
                    This name will be visible to other users.
                </FormHelperText>
                <FormErrorMessage>Name is required.</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={email.isInvalid} className="pt-5">
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
                    errorBorderColor="cherry.500"
                    placeholder="user@example.com"
                    id="email"
                    type="email"
                    isRequired
                    variant="filled"
                    {...email}
                />
                <FormHelperText>
                    We&apos;ll never share your email.
                </FormHelperText>
                <FormErrorMessage>Invalid Email.</FormErrorMessage>
            </FormControl>
            <div className="pt-5 flex-row flex">
                <div className="flex-1">
                    {wallet === null ? (
                        <Button onClick={handleConnectWallet} isFullWidth>
                            Connect Wallet
                        </Button>
                    ) : (
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
                    )}
                </div>
            </div>
            <div className="pt-3">
                <Button
                    disabled={
                        wallet === null || email.isInvalid || name.isInvalid
                    }
                    onClick={handleRegister}
                    isFullWidth
                    colorScheme={'cherry'}
                >
                    Get your CryptoKoi
                </Button>
            </div>
        </form>
    )
}

export default RegistrationForm
