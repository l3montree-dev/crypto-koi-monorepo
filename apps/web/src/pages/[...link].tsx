import { HydrationState } from '@crypto-koi/common/lib/mobx/RootStore'
import { GetServerSidePropsContext, GetStaticPropsResult } from 'next'
import React, { FunctionComponent } from 'react'
import { cmsApi } from '../cms/api'
import { IMenu } from '../cms/menu'
import { IFooter, IPage } from '../cms/page'
import Page from '../components/Page'
import CookieStorage from '../CookieStorage'
import { AppStateProvider } from '../hooks/AppStateContext'
import pageBuilder from '../pagebuilder/page-builder'
import { buildServiceLayer, fetchHydrationState } from '../service-layer'
interface Props {
    page: IPage
    footer: IFooter
    menu: IMenu
    hydrationState?: HydrationState | null
}
const DynamicPage: FunctionComponent<Props> = (props) => {
    return (
        <AppStateProvider hydrationState={props.hydrationState}>
            <Page
                addHeaderPadding={true}
                animateHeader={false}
                menu={props.menu}
                footer={props.footer}
                seo={props.page?.attributes.SEO}
            >
                <div className="px-4 py-20">
                    {pageBuilder(props.page.attributes.Pagebuilder, props.menu)}
                </div>
            </Page>
        </AppStateProvider>
    )
}

export async function getServerSideProps(
    ctx: GetServerSidePropsContext<{ link: string[] }>
): Promise<GetStaticPropsResult<Props>> {
    if (!ctx.params?.link) {
        return {
            notFound: true,
        }
    }

    const services = buildServiceLayer(new CookieStorage(ctx.req.cookies))

    const link = '/' + (ctx.params.link as string[]).join('/')
    const [pageData, footer, menu, hydrationState] = await Promise.all([
        cmsApi<{ data: IPage[] }>(
            `pages?filters[Link][$eq]=${link}&populate=deep`
        ),
        cmsApi<{ data: { attributes: IFooter } }>(`footer?populate=deep`),
        cmsApi<{ data: { attributes: IMenu } }>(`menu?populate=deep`),
        fetchHydrationState(services),
    ])

    if (pageData.data.length === 0) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            page: pageData.data[0],
            footer: footer.data.attributes,
            menu: menu.data.attributes,
            hydrationState,
        },
    }
}

export default DynamicPage
