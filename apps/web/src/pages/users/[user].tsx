import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button,
} from '@chakra-ui/react'
import { GetUser_user } from '@crypto-koi/common/lib/graphql/queries/__generated__/GetUser'
import { HydrationState } from '@crypto-koi/common/lib/mobx/RootStore'
import { selectCurrentUser } from '@crypto-koi/common/lib/mobx/selectors'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import {
    GetServerSidePropsContext,
    GetServerSidePropsResult,
    NextPage,
} from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FunctionComponent, useContext } from 'react'
import { cmsApi } from '../../cms/api'
import { IMenu } from '../../cms/menu'
import { IFooter, IPage } from '../../cms/page'
import Koi from '../../components/Koi'
import Page from '../../components/Page'
import CookieStorage from '../../CookieStorage'
import {
    AppStateContext,
    AppStateProvider,
    useAppState,
} from '../../hooks/AppStateContext'
import { buildServiceLayer, fetchHydrationState } from '../../service-layer'

const UserContent: FunctionComponent<GetUser_user> = observer((props) => {
    const currentUser = useAppState(selectCurrentUser)

    const { services, store } = useContext(AppStateContext)
    const router = useRouter()
    return (
        <div className="max-w-screen-xl mx-auto">
            <h2 className="font-bold font-poppins text-2xl mb-2">
                {props.name}
            </h2>
            <div className="flex flex-row text-sm">
                <div className="flex-col bg-slate-100 p-3 rounded-lg flex mb-5">
                    <span>Wallet Address: {props.walletAddress}</span>
                    <span>
                        Joined at:{' '}
                        {moment(props.createdAt).format('DD.MM.YYYY')}
                    </span>
                </div>
            </div>
            {props.id === currentUser?.id && (
                <div className="mb-5">
                    <Button
                        onClick={async () => {
                            store.authStore.setCurrentUser(null)
                            await services.userService.logout()
                            router.push('/')
                        }}
                        colorScheme={'sea'}
                    >
                        Logout
                    </Button>
                </div>
            )}
            <h3 className="font-bold font-poppins text-2xl mb-2">CryptoKois</h3>
            <div className="flex-row justify-start flex">
                {props.cryptogotchies.map((c) => {
                    return (
                        <Link href={'/kois/' + c.id} key={c.id}>
                            <a className="mx-2">
                                <Koi {...c} />{' '}
                            </a>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
})

interface Props {
    page: IPage
    footer: IFooter
    menu: IMenu
    // will be defined - otherwise 404
    user: GetUser_user
    hydrationState?: HydrationState | null
}

const UserPage: NextPage<Props> = observer((props) => {
    const { user } = props
    return (
        <AppStateProvider hydrationState={props.hydrationState}>
            <Page
                addHeaderPadding={true}
                seo={{
                    id: 0,
                    Meta_Title: 'CryptoKoi - ' + user.name,
                    Meta_Description: "CryptoKoi's from " + user.name,
                }}
                menu={props.menu}
                footer={props.footer}
                animateHeader={false}
            >
                <div className="border-b-1 py-2 border-t-0 border">
                    <div className="px-4 max-w-screen-2xl mx-auto">
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">
                                    <span className="text-cherry">Home</span>
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbItem isCurrentPage>
                                <BreadcrumbLink href="#">
                                    {props.user.name}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                </div>
                <div className="md:py-20 pt-5 pb-10 bg-slate-200 px-4">
                    <UserContent {...props.user} />
                </div>
            </Page>
        </AppStateProvider>
    )
})

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
        (async () => {
            try {
                return await services.userService.findById(userId)
            } catch (e) {
                return null
            }
        })(),
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

export default UserPage
