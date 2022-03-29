import {
    GetStaticPaths,
    GetStaticPropsContext,
    GetStaticPropsResult,
} from 'next'
import React, { FunctionComponent } from 'react'
import { api } from '../cms/api'
import { IMenu } from '../cms/menu'
import { IFooter, IPage } from '../cms/page'
import Page from '../components/Page'
import pageBuilder from '../pagebuilder/page-builder'

interface Props {
    page: IPage
    footer: IFooter
    menu: IMenu
}
const DynamicPage: FunctionComponent<Props> = (props) => {
    return (
        <Page
            // just set it to be scrolled - otherwise the buttons and icons wont be visible.
            initialHeaderClass="scrolled"
            menu={props.menu}
            footer={props.footer}
            seo={props.page.attributes.SEO}
        >
            <div className="px-4 py-20">
                {pageBuilder(props.page.attributes.Pagebuilder, props.menu)}
            </div>
        </Page>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const pages = (await api<{ data: IPage[] }>(`pages`)).data
        .filter((p) => p.attributes.Link !== '/')
        .map((p) => ({
            params: { link: p.attributes.Link.substring(1).split('/') },
        }))

    return {
        paths: pages,
        fallback: 'blocking',
    }
}

export async function getStaticProps({
    params,
}: GetStaticPropsContext): Promise<GetStaticPropsResult<Props>> {
    if (!params) {
        return {
            notFound: true,
        }
    }
    const link = '/' + (params.link as string[]).join('/')
    const [pageData, footer, menu] = await Promise.all([
        api<{ data: IPage[] }>(
            `pages?filters[Link][$eq]=${link}&populate=deep`
        ),
        api<{ data: { attributes: IFooter } }>(`footer?populate=deep`),
        api<{ data: { attributes: IMenu } }>(`menu?populate=deep`),
    ])

    return {
        props: {
            page: pageData.data[0],
            footer: footer.data.attributes,
            menu: menu.data.attributes,
        },
        revalidate: 60,
    }
}

export default DynamicPage
