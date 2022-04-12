import { GetUser_user } from '@crypto-koi/common/lib/graphql/queries/__generated__/GetUser'
import Cryptogotchi from '@crypto-koi/common/lib/mobx/Cryptogotchi'
import { HydrationState } from '@crypto-koi/common/lib/mobx/RootStore'
import { selectCurrentUser } from '@crypto-koi/common/lib/mobx/selectors'
import { observer } from 'mobx-react-lite'
import {
    GetServerSidePropsContext,
    GetServerSidePropsResult,
    NextPage,
} from 'next'
import React, { FunctionComponent, useMemo } from 'react'
import { cmsApi } from '../../cms/api'
import { IMenu } from '../../cms/menu'
import { IFooter, IPage } from '../../cms/page'
import { CryptogotchiView } from '../../components/CryptogotchiView'
import Page from '../../components/Page'
import CookieStorage from '../../CookieStorage'
import { AppStateProvider, useAppState } from '../../hooks/AppStateContext'
import { buildServiceLayer, fetchHydrationState } from '../../service-layer'

const UserContent: FunctionComponent<GetUser_user> = observer((props) => {
    const currentUser = useAppState(selectCurrentUser)

    return (
        <div className="max-w-screen-xl mx-auto">
            {props.cryptogotchies.map((c) => {
                let crypt: Cryptogotchi
                if (c.ownerId === currentUser?.id) {
                    crypt =
                        currentUser.cryptogotchies.find(
                            (gotchi) => gotchi.id === c.id
                        ) ?? new Cryptogotchi(c)
                } else {
                    crypt = new Cryptogotchi(c)
                }
                return <CryptogotchiView cryptogotchi={crypt} key={c.id} />
            })}
        </div>
    )
})

interface Props {
    page: IPage
    footer: IFooter
    menu: IMenu
    // will be defined - otherwise 404
    user: GetUser_user
    hydrationState?: HydrationState | null
}

const UserPage: NextPage<Props> = observer((props) => {
    return (
        <AppStateProvider hydrationState={props.hydrationState}>
            <Page
                addHeaderPadding={true}
                seo={props.page.attributes.SEO}
                menu={props.menu}
                footer={props.footer}
                animateHeader={false}
            >
                <div className="md:py-20 pt-5 pb-10 bg-slate-200 px-4">
                    <UserContent {...props.user} />
                </div>
            </Page>
        </AppStateProvider>
    )
})
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
        (async () => {
            try {
                return await services.userService.findById(userId)
            } catch (e) {
                return null
            }
        })(),
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
