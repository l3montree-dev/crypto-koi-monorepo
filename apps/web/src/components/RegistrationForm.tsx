import {
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
} from '@chakra-ui/react'
import { notEmpty, validEmail } from '@crypto-koi/common/lib/validators'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { AppStateContext } from '../hooks/AppStateContext'
import useInput from '../hooks/useInput'
import { useWallet } from '../hooks/useWallet'
import WalletButton from './WalletButton'

const RegistrationForm = () => {
    const { services, store } = useContext(AppStateContext)

    const router = useRouter()
    const email = useInput({ validator: validEmail, initialState: '' })
    const name = useInput({ validator: notEmpty, initialState: '' })

    const { handleConnectWallet, wallet } = useWallet()

    const handleRegister = async () => {
        const user = await services.userService.registerUsingWalletAddress({
            email: email.value,
            name: name.value,
            walletAddress: wallet?.address,
        })
        if (user) {
            store.authStore.setCurrentUser(user)
            // redirect to app page.

            router.push('/users/' + user.id)
        } else {
            // TODO: Show error to the user
        }
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
                    <WalletButton
                        onClick={handleConnectWallet}
                        wallet={wallet}
                    />
                </div>
            </div>
            <div className="pt-3 mb-3">
                <Button
                    disabled={
                        wallet === null || email.isInvalid || name.isInvalid
                    }
                    type="submit"
                    onClick={handleRegister}
                    isFullWidth
                    colorScheme={'cherry'}
                >
                    Get your CryptoKoi
                </Button>
            </div>
            <Link href="/login">
                <a className="text-cherry text-center w-full flex justify-center">
                    Already have an account? Go to login
                </a>
            </Link>
        </form>
    )
}

export default RegistrationForm
