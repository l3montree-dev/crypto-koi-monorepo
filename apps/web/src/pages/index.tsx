import type {
    GetStaticPropsContext,
    GetStaticPropsResult,
    NextPage,
} from 'next'
import { api } from '../cms/api'
import { IMenu } from '../cms/menu'
import { IFooter, IPage } from '../cms/page'
import Page from '../components/Page'
import pageBuilder from '../pagebuilder/page-builder'
import { commonTest } from '@crypto-koi/common'

interface Props {
    page: IPage
    footer: IFooter
    menu: IMenu
}
const Home: NextPage<Props> = (props) => {
    commonTest()
    return (
        <Page
            initialHeaderClass=""
            menu={props.menu}
            footer={props.footer}
            seo={props.page.attributes.SEO}
        >
            {pageBuilder(props.page.attributes.Pagebuilder, props.menu)}
        </Page>
    )
}

export async function getStaticProps(
    context: GetStaticPropsContext
): Promise<GetStaticPropsResult<Props>> {
    const [startPage, footer, menu] = await Promise.all([
        api<{ data: IPage[] }>(`pages?filters[Link][$eq]=/&populate=deep`),
        api<{ data: { attributes: IFooter } }>(`footer?populate=deep`),
        api<{ data: { attributes: IMenu } }>(`menu?populate=deep`),
    ])

    return {
        props: {
            page: startPage.data[0],
            footer: footer.data.attributes,
            menu: menu.data.attributes,
        },
        revalidate: 60,
    }
}

export default Home
