import { Button } from '@chakra-ui/react'
import { ClientCryptogotchi } from '@crypto-koi/common/lib/graphql/queries/__generated__/ClientCryptogotchi'
import { GetUser_user } from '@crypto-koi/common/lib/graphql/queries/__generated__/GetUser'
import { HydrationState } from '@crypto-koi/common/lib/mobx/RootStore'
import Transformer from '@crypto-koi/common/lib/Transformer'
import {
    GetServerSidePropsContext,
    GetServerSidePropsResult,
    NextPage,
} from 'next'
import Image from 'next/image'
import React, { FunctionComponent, useContext } from 'react'
import { cmsApi } from '../../../cms/api'
import { IMenu } from '../../../cms/menu'
import { IFooter, IPage } from '../../../cms/page'
import Page from '../../../components/Page'
import { config } from '../../../config'
import CookieStorage from '../../../CookieStorage'
import {
    AppStateContext,
    AppStateProvider,
} from '../../../hooks/AppStateContext'
import { BsShieldFillCheck, BsFillShieldSlashFill } from 'react-icons/bs'
import { MdInfoOutline } from 'react-icons/md'
import { buildServiceLayer, fetchHydrationState } from '../../../service-layer'
import Clock from '../../../components/Clock'
import moment from 'moment'
import Lifetime from '../../../components/Lifetime'
const Attributes: FunctionComponent<ClientCryptogotchi['attributes']> = (
    props
) => {
    return (
        <div className="flex flex-wrap flex-row">
            {Object.entries(props)
                .filter(([attr, value]) => {
                    return typeof value === 'string' && value.startsWith('#')
                })
                .map(([attr, value]) => (
                    <div
                        key={attr}
                        className="bg-sea-600 mr-2 mb-2 text-white rounded-lg p-4 flex flex-col items-center justify-center"
                    >
                        <div
                            className="w-10 h-10 border-2 rounded-lg"
                            style={{
                                backgroundColor: value,
                            }}
                        />
                        <span className="mt-2">{value}</span>
                    </div>
                ))}
            <div className="bg-sea-600 text-white rounded-lg p-4 mb-2 flex flex-col items-center justify-center">
                <div className="w-10 flex-row flex items-center justify-center font-bold h-10 border-2 rounded-lg">
                    {props.patternQuantity}
                </div>
                <span className="mt-2">Patterns</span>
            </div>
        </div>
    )
}

const CryptogotchiView: FunctionComponent<ClientCryptogotchi> = (props) => {
    const { store } = useContext(AppStateContext)

    return (
        <div>
            <div className="text-white flex flex-row justify-center rounded-lg">
                <div className="relative pt-2">
                    <Lifetime {...props} />
                    <Image
                        width={500}
                        height={500}
                        alt={props.name ?? 'CryptoKoi'}
                        src={
                            config.api +
                            '/images/' +
                            Transformer.uuidToUint256(props.id) +
                            '?size=500'
                        }
                    />
                </div>
            </div>

            <div className="mt-10">
                <h2 className="font-bold mb-2 text-white text-2xl font-poppins">
                    {props.name}
                </h2>
                <div>
                    {props.isValidNft ? (
                        <div className="opacity-75 flex-row items-center flex text-white">
                            <BsShieldFillCheck />
                            <span className="ml-2">Valid NFT</span>
                        </div>
                    ) : (
                        <div className="opacity-75 flex-row items-center flex text-white">
                            <BsFillShieldSlashFill />
                            <span className="ml-2">No NFT</span>
                        </div>
                    )}
                    <div className="flex flex-row text-white opacity-75 items-center mt-2">
                        <MdInfoOutline />
                        <div className="ml-2">
                            Age:{' '}
                            <Clock
                                id={props.id + '-age'}
                                date={moment(props.createdAt)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-10">
                <h2 className="font-bold text-white mb-5 text-2xl font-poppins">
                    Attributes
                </h2>
                <Attributes {...props.attributes} />
            </div>
            {store.authStore.currentUser?.id === props.ownerId && (
                <div className="mt-5">
                    <Button colorScheme={'cherry'}>Feed</Button>
                </div>
            )}
        </div>
    )
}
const UserContent: FunctionComponent<GetUser_user> = (props) => {
    return (
        <div className="max-w-screen-md mx-auto">
            {props.cryptogotchies.map((c) => (
                <CryptogotchiView {...c} key={c.id} />
            ))}
        </div>
    )
}

interface Props {
    page: IPage
    footer: IFooter
    menu: IMenu
    // will be defined - otherwise 404
    user: GetUser_user
    hydrationState?: HydrationState | null
}

const Register: NextPage<Props> = (props) => {
    return (
        <AppStateProvider hydrationState={props.hydrationState}>
            <Page
                addHeaderPadding={true}
                seo={props.page.attributes.SEO}
                menu={props.menu}
                footer={props.footer}
                animateHeader={false}
            >
                <div className="md:py-20 koi-gradient pt-5 pb-10 md:bg-slate-200 px-4">
                    <UserContent {...props.user} />
                </div>
            </Page>
        </AppStateProvider>
    )
}

export async function getServerSideProps(
    context: GetServerSidePropsContext<{ user: string }>
): Promise<GetServerSidePropsResult<Props>> {
    const userId = context.params?.user
    if (!userId) {
        return {
            notFound: true,
        }
    }

    const services = buildServiceLayer(new CookieStorage(context.req.cookies))

    const [page, footer, menu, hydrationState, user] = await Promise.all([
        cmsApi<{ data: IPage[] }>(
            `pages?filters[Link][$eq]=/register&populate=deep`
        ),
        cmsApi<{ data: { attributes: IFooter } }>(`footer?populate=deep`),
        cmsApi<{ data: { attributes: IMenu } }>(`menu?populate=deep`),
        fetchHydrationState(services),
        services.userService.findById(userId),
    ])

    if (!user) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            page: page.data[0],
            footer: footer.data.attributes,
            menu: menu.data.attributes,
            hydrationState,
            user,
        },
    }
}

export default Register
