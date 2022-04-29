import {
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    useToast,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { AppStateContext } from '../hooks/AppStateContext'
import { useWallet } from '../hooks/useWallet'
import Toast from './Toast'
import WalletButton from './WalletButton'

const LoginForm = () => {
    const { services, store } = useContext(AppStateContext)
    const router = useRouter()

    const { handleConnectWallet, wallet } = useWallet()
    const toast = useToast()
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
            toast({
                title:
                    'Could not login. Are you sure you used the wallet: ' +
                    wallet.address +
                    ' during registration?',
                render: () => {
                    return (
                        <Toast
                            msg={
                                'Could not login. Are you sure you used the wallet: ' +
                                wallet.address +
                                ' during registration?'
                            }
                        />
                    )
                },
            })
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
