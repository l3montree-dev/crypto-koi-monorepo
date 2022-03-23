import { Button } from '@chakra-ui/button'
import Head from 'next/head'
import React, { FunctionComponent } from 'react'
import { IFooter, ISEO } from '../cms/page'
import { Footer } from './Footer'
import Header from './Header'
import Image from 'next/image'
import { colors } from '../../styles/theme'
import { IMenu } from '../cms/menu'
import { getMobileOperatingSystem } from '../misc/utils'

interface Props {
  footer: IFooter
  seo: ISEO
  menu: IMenu
}
const Page: FunctionComponent<Props> = (props) => {
  const handleButtonClick = () => {
    const os = getMobileOperatingSystem()
    if (os === 'ios') {
      window.open(props.menu.Store_Links.Apple_App_Store_Link, '_blank')
    } else {
      window.open(props.menu.Store_Links.Google_Play_Store_Link, '_blank')
    }
  }
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
        <Header {...props.menu} />
        <main>
          <div className="wrapper">{props.children} </div>
        </main>
        <Footer {...props.footer} />
      </div>
      <div
        id="app-bar"
        className="fixed md:hidden bottom-0 bg-white left-0 flex-row flex items-center justify-between right-0 px-4 py-2"
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
        <Button onClick={handleButtonClick} colorScheme="cherry">
          Get the App
        </Button>
      </div>
    </>
  )
}

export default Page
