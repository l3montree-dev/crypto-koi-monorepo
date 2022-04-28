import {
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { AppStateContext } from '../hooks/AppStateContext'
import { useWallet } from '../hooks/useWallet'
import WalletButton from './WalletButton'

const LoginForm = () => {
    const { services, store } = useContext(AppStateContext)
    const router = useRouter()

    const { handleConnectWallet, wallet } = useWallet()

    const handleLogin = async () => {
        if (!wallet) {
            return
        }
        const user = await services.userService.loginUsingWalletAddress(
            wallet.address
        )
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
            <div className="flex flex-row justify-between items-center">
                <h2 className="font-bold text-2xl font-poppins">Login</h2>
                <Link href="/register">
                    <a className="text-cherry text-right">Go to registration</a>
                </Link>
            </div>
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
                    disabled={wallet === null}
                    onClick={handleLogin}
                    isFullWidth
                    colorScheme={'cherry'}
                >
                    Login
                </Button>
            </div>
        </form>
    )
}

export default LoginForm
