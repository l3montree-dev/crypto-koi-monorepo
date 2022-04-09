import { Button } from '@chakra-ui/react'
import type {
    GetServerSidePropsContext,
    GetServerSidePropsResult,
    GetStaticPropsContext,
    GetStaticPropsResult,
    NextPage,
} from 'next'
import { cmsApi } from '../cms/api'
import { IMenu } from '../cms/menu'
import { IFooter, IPage } from '../cms/page'
import Page from '../components/Page'
import pageBuilder from '../pagebuilder/page-builder'
import Image from 'next/image'
import { getMobileOperatingSystem } from '../utils'
import Link from 'next/link'
import { AppStateProvider } from '../hooks/AppStateContext'
import { HydrationState } from '@crypto-koi/common/lib/mobx/RootStore'
import { buildServiceLayer, fetchHydrationState } from '../service-layer'
import CookieStorage from '../CookieStorage'

interface Props {
    page: IPage
    footer: IFooter
    menu: IMenu
    hydrationState?: HydrationState | null
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
        <AppStateProvider hydrationState={props.hydrationState}>
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
        </AppStateProvider>
    )
}

export async function getServerSideProps(
    ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> {
    const services = buildServiceLayer(new CookieStorage(ctx.req.cookies))
    const [startPage, footer, menu, hydrationState] = await Promise.all([
        cmsApi<{ data: IPage[] }>(`pages?filters[Link][$eq]=/&populate=deep`),
        cmsApi<{ data: { attributes: IFooter } }>(`footer?populate=deep`),
        cmsApi<{ data: { attributes: IMenu } }>(`menu?populate=deep`),
        fetchHydrationState(services),
    ])

    return {
        props: {
            page: startPage.data[0],
            footer: footer.data.attributes,
            menu: menu.data.attributes,
            hydrationState,
        },
    }
}

export default Home
