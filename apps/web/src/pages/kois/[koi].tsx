import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { FIND_CRYPTOGOTCHI } from '@crypto-koi/common/lib/graphql/queries/cryptogotchi'
import {
    FindCryptogotchi,
    FindCryptogotchiVariables,
    FindCryptogotchi_cryptogotchi,
} from '@crypto-koi/common/lib/graphql/queries/__generated__/FindCryptogotchi'
import { GetUser_user } from '@crypto-koi/common/lib/graphql/queries/__generated__/GetUser'
import Cryptogotchi from '@crypto-koi/common/lib/mobx/Cryptogotchi'
import { HydrationState } from '@crypto-koi/common/lib/mobx/RootStore'
import { selectCurrentUser } from '@crypto-koi/common/lib/mobx/selectors'
import { observer } from 'mobx-react-lite'
import {
    GetServerSidePropsContext,
    GetServerSidePropsResult,
    NextPage,
} from 'next'
import React, { FunctionComponent, useMemo } from 'react'
import { cmsApi } from '../../cms/api'
import { IMenu } from '../../cms/menu'
import { IFooter, IPage } from '../../cms/page'
import { CryptogotchiView } from '../../components/CryptogotchiView'
import Page from '../../components/Page'
import CookieStorage from '../../CookieStorage'
import { AppStateProvider, useAppState } from '../../hooks/AppStateContext'
import { buildServiceLayer, fetchHydrationState } from '../../service-layer'

const KoiPageContent: FunctionComponent<FindCryptogotchi_cryptogotchi> =
    observer((props) => {
        const currentUser = useAppState(selectCurrentUser)

        const cryptogotchi = useMemo(() => {
            if (props.ownerId === currentUser?.id) {
                return (
                    currentUser?.cryptogotchies.find(
                        (gotchi) => gotchi.id === props.id
                    ) ?? new Cryptogotchi(props)
                )
            } else {
                return new Cryptogotchi(props)
            }
        }, [props, currentUser?.id, currentUser?.cryptogotchies])
        return (
            <div className="max-w-screen-xl mx-auto">
                <CryptogotchiView cryptogotchi={cryptogotchi} />
            </div>
        )
    })

interface Props {
    page: IPage
    footer: IFooter
    menu: IMenu
    // will be defined - otherwise 404
    crypt: FindCryptogotchi_cryptogotchi
    hydrationState?: HydrationState | null
}

const KoiPage: NextPage<Props> = observer((props) => {
    const { crypt } = props
    return (
        <AppStateProvider hydrationState={props.hydrationState}>
            <Page
                addHeaderPadding={true}
                seo={{
                    id: 0,
                    Meta_Title: 'CryptoKoi - ' + crypt.name,
                    Meta_Description: 'CryptoKoi ' + crypt.name,
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

                            <BreadcrumbItem>
                                <BreadcrumbLink href="/kois">
                                    <span className="text-cherry">
                                        CryptoKois
                                    </span>
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbItem isCurrentPage>
                                <BreadcrumbLink href="#">
                                    {crypt.name}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                </div>
                <div className="md:py-20 pt-5 pb-10 bg-slate-200 px-4">
                    <KoiPageContent {...props.crypt} />
                </div>
            </Page>
        </AppStateProvider>
    )
})

export async function getServerSideProps(
    context: GetServerSidePropsContext<{ koi: string }>
): Promise<GetServerSidePropsResult<Props>> {
    const koiId = context.params?.koi
    if (!koiId) {
        return {
            notFound: true,
        }
    }

    const services = buildServiceLayer(new CookieStorage(context.req.cookies))

    const [page, footer, menu, hydrationState, crypt] = await Promise.all([
        cmsApi<{ data: IPage[] }>(
            `pages?filters[Link][$eq]=/register&populate=deep`
        ),
        cmsApi<{ data: { attributes: IFooter } }>(`footer?populate=deep`),
        cmsApi<{ data: { attributes: IMenu } }>(`menu?populate=deep`),
        fetchHydrationState(services),
        (async () => {
            try {
                return await services.apolloClient.query<
                    FindCryptogotchi,
                    FindCryptogotchiVariables
                >({
                    query: FIND_CRYPTOGOTCHI,
                    variables: {
                        id: koiId,
                    },
                })
            } catch (e) {
                console.error(e)
                return null
            }
        })(),
    ])

    if (!crypt || !crypt.data.cryptogotchi) {
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
            crypt: crypt.data.cryptogotchi,
        },
    }
}

export default KoiPage
