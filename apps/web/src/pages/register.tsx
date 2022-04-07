import { GetStaticPropsResult, NextPage } from 'next'
import React from 'react'
import { api } from '../cms/api'
import { IMenu } from '../cms/menu'
import { IFooter, IPage } from '../cms/page'
import Page from '../components/Page'
import RegistrationForm from '../components/RegistrationForm'
import { AppStateProvider } from '../hooks/AppStateContext'

interface Props {
    page: IPage
    footer: IFooter
    menu: IMenu
}

const Register: NextPage<Props> = (props) => {
    return (
        <AppStateProvider>
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

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
    const [page, footer, menu] = await Promise.all([
        api<{ data: IPage[] }>(
            `pages?filters[Link][$eq]=/register&populate=deep`
        ),
        api<{ data: { attributes: IFooter } }>(`footer?populate=deep`),
        api<{ data: { attributes: IMenu } }>(`menu?populate=deep`),
    ])

    return {
        props: {
            page: page.data[0],
            footer: footer.data.attributes,
            menu: menu.data.attributes,
        },
        revalidate: 60,
    }
}

export default Register
