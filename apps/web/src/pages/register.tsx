import AuthStore from '@crypto-koi/common/lib/mobx/AuthStore'
import RootStore, {
    HydrationState,
} from '@crypto-koi/common/lib/mobx/RootStore'
import ThemeStore from '@crypto-koi/common/lib/mobx/ThemeStore'
import {
    GetServerSidePropsContext,
    GetServerSidePropsResult,
    NextPage,
} from 'next'
import React from 'react'
import { api } from '../cms/api'
import { IMenu } from '../cms/menu'
import { IFooter, IPage } from '../cms/page'
import Page from '../components/Page'
import RegistrationForm from '../components/RegistrationForm'
import CookieStorage from '../CookieStorage'
import { AppStateProvider } from '../hooks/AppStateContext'
import { buildServiceLayer } from '../service-layer'

interface Props {
    page: IPage
    footer: IFooter
    menu: IMenu
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
                <div className="md:py-20 pt-5 pb-10 md:bg-slate-200 px-4">
                    <RegistrationForm />
                </div>
            </Page>
        </AppStateProvider>
    )
}

export async function getServerSideProps(
    context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> {
    const rootStore = new RootStore(new AuthStore(), new ThemeStore())

    const services = buildServiceLayer(new CookieStorage(context.req.cookies))

    const [page, footer, menu, hydrationState] = await Promise.all([
        api<{ data: IPage[] }>(
            `pages?filters[Link][$eq]=/register&populate=deep`
        ),
        api<{ data: { attributes: IFooter } }>(`footer?populate=deep`),
        api<{ data: { attributes: IMenu } }>(`menu?populate=deep`),
        services.authService
            .waitForTokenLoad()
            .then(() => services.userService.sync())
            .catch(() => null),
    ])

    return {
        props: {
            page: page.data[0],
            footer: footer.data.attributes,
            menu: menu.data.attributes,
            hydrationState,
        },
    }
}

export default Register
