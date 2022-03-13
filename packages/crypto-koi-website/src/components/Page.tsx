import { Button } from '@chakra-ui/button'
import Head from 'next/head'
import React, { FunctionComponent } from 'react'
import { IFooter, ISEO } from '../cms/page'
import { Footer } from './Footer'
import Header from './Header'
import Image from 'next/image'
import { colors } from '../../styles/theme'

interface Props {
  footer: IFooter
  seo: ISEO
}
const Page: FunctionComponent<Props> = (props) => {
  return (
    <>
      <Head>
        <title>{props.seo.metaTitle}</title>
        <meta name="theme-color" content={colors.cherry[600]}></meta>
        <meta name="description" content={props.seo.metaDescription} />
        <meta name="keywords" content={props.seo.keywords} />
        <meta name="robots" content={props.seo.metaRobots} />
      </Head>
      <div className="page bg-soft md:bg-white">
        <Header />
        {props.children}
        <Footer {...props.footer} />
      </div>
      <div
        id="app-bar"
        className="fixed bottom-0 bg-white left-0 flex-row flex items-center justify-between right-0 px-4 py-2"
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
        <Button colorScheme="cherry">Get the App</Button>
      </div>
    </>
  )
}

export default Page
