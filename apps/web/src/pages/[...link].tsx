import {
    GetStaticPaths,
    GetStaticPropsContext,
    GetStaticPropsResult,
} from 'next'
import React, { FunctionComponent } from 'react'
import { cmsApi } from '../cms/api'
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
            addHeaderPadding={true}
            animateHeader={false}
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

const alreadyDefinedPages = ['/register', '/login', '/users', '/kois', '/']

export const getStaticPaths: GetStaticPaths = async () => {
    const pages = (await cmsApi<{ data: IPage[] }>(`pages`)).data
        .filter((p) => !alreadyDefinedPages.includes(p.attributes.Link))
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
        cmsApi<{ data: IPage[] }>(
            `pages?filters[Link][$eq]=${link}&populate=deep`
        ),
        cmsApi<{ data: { attributes: IFooter } }>(`footer?populate=deep`),
        cmsApi<{ data: { attributes: IMenu } }>(`menu?populate=deep`),
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
