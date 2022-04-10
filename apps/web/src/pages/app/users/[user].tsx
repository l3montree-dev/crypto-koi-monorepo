import { GetUser_user } from '@crypto-koi/common/lib/graphql/queries/__generated__/GetUser'
import { HydrationState } from '@crypto-koi/common/lib/mobx/RootStore'
import {
    GetServerSidePropsContext,
    GetServerSidePropsResult,
    NextPage,
} from 'next'
import React, { FunctionComponent } from 'react'
import { cmsApi } from '../../../cms/api'
import { IMenu } from '../../../cms/menu'
import { IFooter, IPage } from '../../../cms/page'
import { CryptogotchiView } from '../../../components/CryptogotchiView'
import Page from '../../../components/Page'
import CookieStorage from '../../../CookieStorage'
import { AppStateProvider } from '../../../hooks/AppStateContext'
import { buildServiceLayer, fetchHydrationState } from '../../../service-layer'

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

const UserPage: NextPage<Props> = (props) => {
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

export default UserPage
