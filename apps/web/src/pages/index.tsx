import { Button } from '@chakra-ui/react'
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
import Image from 'next/image'
import { getMobileOperatingSystem } from '../utils'
import Link from 'next/link'

interface Props {
    page: IPage
    footer: IFooter
    menu: IMenu
}
const Home: NextPage<Props> = (props) => {
    const handleButtonClick = () => {
        const os = getMobileOperatingSystem()
        if (os === 'ios') {
            window.open(props.menu.Store_Links.Apple_App_Store_Link, '_blank')
        } else {
            window.open(props.menu.Store_Links.Google_Play_Store_Link, '_blank')
        }
    }
    return (
        <Page
            addHeaderPadding={false}
            animateHeader={true}
            menu={props.menu}
            footer={props.footer}
            seo={props.page.attributes.SEO}
        >
            {pageBuilder(props.page.attributes.Pagebuilder, props.menu)}
            <div
                id="app-bar"
                className="fixed md:hidden bottom-0 bg-white left-0 flex-row flex items-center justify-between right-0 px-2 py-2"
            >
                <div className="flex flex-row items-center">
                    <div className="bg-soft flex items-center justify-center w-10 rounded-lg border-black border-2 h-10">
                        <Image
                            alt="Logo"
                            width={25}
                            height={25}
                            src={'/assets/crypto-koi-logo.svg'}
                        />
                    </div>
                    <span className="font-bold ml-2">CryptoKoi</span>
                </div>
                <Link href="/register">
                    <a>
                        <Button
                            //onClick={handleButtonClick}
                            colorScheme="cherry"
                        >
                            Start
                        </Button>
                    </a>
                </Link>
            </div>
        </Page>
    )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
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
