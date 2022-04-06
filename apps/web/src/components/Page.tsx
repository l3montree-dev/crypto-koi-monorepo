import { Button } from '@chakra-ui/button'
import Head from 'next/head'
import React, { FunctionComponent } from 'react'
import { IFooter, ISEO } from '../cms/page'
import { Footer } from './Footer'
import Header from './Header'
import Image from 'next/image'
import { colors } from '../../styles/theme'
import { IMenu } from '../cms/menu'
import { getMobileOperatingSystem } from '../utils'

interface Props {
    footer: IFooter
    seo: ISEO
    menu: IMenu
    addHeaderPadding: boolean
    animateHeader: boolean
}
const Page: FunctionComponent<Props> = (props) => {
    return (
        <>
            <Head>
                <title>{props.seo.Meta_Title}</title>
                <meta name="theme-color" content={colors.cherry[600]}></meta>
                <meta name="description" content={props.seo.Meta_Description} />
                <meta name="keywords" content={props.seo.Keywords} />
                <meta name="robots" content={props.seo.Meta_Robots} />
            </Head>
            <div className="page">
                <Header animate={props.animateHeader} {...props.menu} />
                <main>
                    <div
                        className={
                            'wrapper ' +
                            (props.addHeaderPadding ? 'header-padding' : '')
                        }
                    >
                        {props.children}{' '}
                    </div>
                </main>
                <Footer {...props.footer} />
            </div>
        </>
    )
}

export default Page
