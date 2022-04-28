import { HydrationState } from '@crypto-koi/common/lib/mobx/RootStore'
import {
    GetServerSidePropsContext,
    GetServerSidePropsResult,
    NextPage,
} from 'next'
import React from 'react'
import { cmsApi } from '../cms/api'
import { IMenu } from '../cms/menu'
import { IFooter, IPage } from '../cms/page'
import LoginForm from '../components/LoginForm'
import Page from '../components/Page'
import CookieStorage from '../CookieStorage'
import { AppStateProvider } from '../hooks/AppStateContext'
import { buildServiceLayer, fetchHydrationState } from '../service-layer'

interface Props {
    page: IPage
    footer: IFooter
    menu: IMenu
    hydrationState?: HydrationState | null
}

const Login: NextPage<Props> = (props) => {
    return (
        <AppStateProvider hydrationState={props.hydrationState}>
            <Page
                addHeaderPadding={true}
                seo={props.page.attributes.SEO}
                menu={props.menu}
                footer={props.footer}
                animateHeader={false}
            >
                <div className="md:py-20 pt-5 sticky-footer-height pb-10 md:bg-slate-200 px-4">
                    <LoginForm />
                </div>
            </Page>
        </AppStateProvider>
    )
}

export async function getServerSideProps(
    context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> {
    const services = buildServiceLayer(new CookieStorage(context.req.cookies))

    const [page, footer, menu, hydrationState] = await Promise.all([
        cmsApi<{ data: IPage[] }>(
            `pages?filters[Link][$eq]=/register&populate=deep`
        ),
        cmsApi<{ data: { attributes: IFooter } }>(`footer?populate=deep`),
        cmsApi<{ data: { attributes: IMenu } }>(`menu?populate=deep`),
        fetchHydrationState(services),
    ])

    if (hydrationState) {
        // this means the user does already exists and he has an access token.
        // we redirect him to the home page.
        return {
            redirect: {
                permanent: false,
                destination: '/users/' + hydrationState.id,
            },
        }
    }

    return {
        props: {
            page: page.data[0],
            footer: footer.data.attributes,
            menu: menu.data.attributes,
            hydrationState,
        },
    }
}

export default Login
