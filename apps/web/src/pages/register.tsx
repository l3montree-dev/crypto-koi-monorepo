import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { GetStaticPropsResult, NextPage } from 'next'
import React from 'react'
import { api } from '../cms/api'
import { IMenu } from '../cms/menu'
import { IFooter, IPage } from '../cms/page'
import Page from '../components/Page'
import { connectToWallet } from '../web3'

interface Props {
    page: IPage
    footer: IFooter
    menu: IMenu
}

const Register: NextPage<Props> = (props) => {
    const handleConnectWallet = async () => {
        try {
            console.log('ADDRESS', await connectToWallet())
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <Page
            addHeaderPadding={true}
            seo={props.page.attributes.SEO}
            menu={props.menu}
            footer={props.footer}
            animateHeader={false}
        >
            <div className="md:py-20 py-4 md:bg-slate-200 px-4">
                <form className="md:max-w-lg mx-auto bg-white md:p-4 rounded-lg md:border">
                    <h2 className="font-bold text-2xl font-poppins">
                        Registration
                    </h2>

                    <FormControl className="pt-5">
                        <FormLabel htmlFor="email">Email address</FormLabel>
                        <Input
                            placeholder="user@example.com"
                            id="email"
                            type="email"
                            variant="filled"
                        />
                    </FormControl>
                    <div className="pt-5 flex-row flex">
                        <div className="flex-1">
                            <Button onClick={handleConnectWallet} isFullWidth>
                                Connect Wallet
                            </Button>
                        </div>

                        <div className="flex-row text-sm pl-2 text-cherry flex items-center">
                            <div className="h-2 mr-2 w-2 bg-cherry rounded-full" />
                            <span>Wallet not connected</span>
                        </div>
                    </div>
                    <div className="pt-5">
                        <Button isFullWidth colorScheme={'cherry'}>
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
