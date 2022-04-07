import {
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
} from '@chakra-ui/react'
import { GetStaticPropsResult, NextPage } from 'next'
import React, { useState } from 'react'
import { api } from '../cms/api'
import { IMenu } from '../cms/menu'
import { IFooter, IPage } from '../cms/page'
import Page from '../components/Page'
import useInput from '../hooks/useInput'
import { connectToWallet, WalletDescriptor } from '../web3'
import Image from 'next/image'
import { notEmpty, validEmail } from '@crypto-koi/common/lib/validators'
import { userService } from '../services'

interface Props {
    page: IPage
    footer: IFooter
    menu: IMenu
}

const Register: NextPage<Props> = (props) => {
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
        console.log(
            await userService.registerUsingWalletAddress({
                email: email.value,
                name: name.value,
                walletAddress: wallet?.address,
            })
        )
    }

    return (
        <Page
            addHeaderPadding={true}
            seo={props.page.attributes.SEO}
            menu={props.menu}
            footer={props.footer}
            animateHeader={false}
        >
            <div className="md:py-20 pt-5 pb-10 md:bg-slate-200 px-4">
                <form className="md:max-w-lg mx-auto bg-white md:p-4 rounded-lg md:border">
                    <h2 className="font-bold text-2xl font-poppins">
                        Registration
                    </h2>

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
                                <Button
                                    onClick={handleConnectWallet}
                                    isFullWidth
                                >
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
                                    <span>
                                        Connected with {wallet.descriptor.name}
                                    </span>
                                </Button>
                            )}
                        </div>
                    </div>
                    <div className="pt-3">
                        <Button
                            disabled={
                                wallet === null ||
                                email.isInvalid ||
                                name.isInvalid
                            }
                            isFullWidth
                            colorScheme={'cherry'}
                        >
                            Get your CryptoKoi
                        </Button>
                    </div>
                </form>
            </div>
        </Page>
    )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
    const [page, footer, menu] = await Promise.all([
        api<{ data: IPage[] }>(
            `pages?filters[Link][$eq]=/register&populate=deep`
        ),
        api<{ data: { attributes: IFooter } }>(`footer?populate=deep`),
        api<{ data: { attributes: IMenu } }>(`menu?populate=deep`),
    ])

    return {
        props: {
            page: page.data[0],
            footer: footer.data.attributes,
            menu: menu.data.attributes,
        },
        revalidate: 60,
    }
}

export default Register
