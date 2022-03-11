import Head from 'next/head'
import React, { FunctionComponent } from 'react'
import { IFooter, ISEO } from '../cms/page'
import { Footer } from './Footer'
import Header from './Header'

interface Props {
  footer: IFooter
  seo: ISEO
}
const Page: FunctionComponent<Props> = (props) => {
  return (
    <>
      <Head>
        <title>{props.seo.metaTitle}</title>
        <meta name="description" content={props.seo.metaDescription} />
        <meta name="keywords" content={props.seo.keywords} />
        <meta name="robots" content={props.seo.metaRobots} />
      </Head>
      <div className="page bg-soft">
        <Header />
        {props.children}
        <Footer {...props.footer} />
      </div>
    </>
  )
}

export default Page
