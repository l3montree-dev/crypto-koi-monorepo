import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { FETCH_LEADERBOARD } from '@crypto-koi/common/lib/graphql/queries/cryptogotchi'
import {
    FetchLeaderBoard,
    FetchLeaderBoardVariables,
} from '@crypto-koi/common/lib/graphql/queries/__generated__/FetchLeaderBoard'
import { HydrationState } from '@crypto-koi/common/lib/mobx/RootStore'
import {
    GetServerSidePropsContext,
    GetServerSidePropsResult,
    NextPage,
} from 'next'
import Link from 'next/link'
import React from 'react'
import { cmsApi } from '../../cms/api'
import { IMenu } from '../../cms/menu'
import { IFooter, IPage } from '../../cms/page'
import Koi from '../../components/Koi'
import Page from '../../components/Page'
import CookieStorage from '../../CookieStorage'
import { AppStateProvider } from '../../hooks/AppStateContext'
import { buildServiceLayer, fetchHydrationState } from '../../service-layer'

interface Props extends FetchLeaderBoard {
    page: IPage
    footer: IFooter
    menu: IMenu
    hydrationState?: HydrationState | null
}

const Kois: NextPage<Props> = (props) => {
    return (
        <AppStateProvider hydrationState={props.hydrationState}>
            <Page
                addHeaderPadding={true}
                seo={props.page.attributes.SEO}
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
                                <BreadcrumbLink href="#">Kois</BreadcrumbLink>
                            </BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                </div>
                <div className="md:py-20 pt-5 pb-10 md:bg-slate-200 px-4">
                    <div className="max-w-screen-xl mx-auto">
                        <h2 className="font-poppins mb-2 font-bold text-2xl">
                            Leaderboard
                        </h2>
                        <p className="bg-slate-100 rounded-lg p-4 mb-5">
                            The leaderboard shows the top 48 users with the
                            oldest kois
                        </p>
                        <div className="flex-row flex flex-wrap justify-between">
                            {props.leaderboard.map((leader) => (
                                <Link
                                    key={leader.id}
                                    href={'/kois/' + leader.id}
                                >
                                    <a className="block md:w-1/4 w-full mb-2 md:px-2">
                                        <Koi hideAttributes {...leader} />
                                    </a>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </Page>
        </AppStateProvider>
    )
}

export async function getServerSideProps(
    context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> {
    const services = buildServiceLayer(new CookieStorage(context.req.cookies))

    const [page, footer, menu, hydrationState, leaderboard] = await Promise.all(
        [
            cmsApi<{ data: IPage[] }>(
                `pages?filters[Link][$eq]=/kois&populate=deep`
            ),
            cmsApi<{ data: { attributes: IFooter } }>(`footer?populate=deep`),
            cmsApi<{ data: { attributes: IMenu } }>(`menu?populate=deep`),
            fetchHydrationState(services),
            services.apolloClient.query<
                FetchLeaderBoard,
                FetchLeaderBoardVariables
            >({
                query: FETCH_LEADERBOARD,
                variables: {
                    offset: 0,
                    limit: 48,
                },
            }),
        ]
    )

    return {
        props: {
            page: page.data[0],
            footer: footer.data.attributes,
            menu: menu.data.attributes,
            hydrationState,
            leaderboard: leaderboard.data.leaderboard,
        },
    }
}

export default Kois
