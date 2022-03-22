import { ArrowDownIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'
import Image from 'next/image'
import React, { FunctionComponent } from 'react'
import { IMenu } from '../cms/menu'
import { IHeroSectionPB } from '../cms/page'
import CMSContent from '../components/CMSContent'
import Section from '../components/Section'

const Hero: FunctionComponent<IHeroSectionPB & IMenu> = (props) => {
  return (
    <Section className="hero-section relative pt-14 md:py-0">
      <div className="absolute hidden md:block pb-10 right-0 bottom-0">
        <Image
          width={props.Image.data.attributes.width}
          height={props.Image.data.attributes.height}
          src={props.Image.data.attributes.url}
          alt={props.Image.data.attributes.alternativeText}
        />
      </div>
      <div className="max-w-screen-xl md:px-4 mx-auto">
        <div className="md:flex md:py-48 justify-center flex-1 items-center flex-row">
          <div className="p-4 md:px-0 flex-1">
            <span className="text-xl">{props.Subtitle}</span>
            <h2 className="font-poppins font-bold text-4xl md:text-5xl">
              Let a <span className="text-cherry-500">KOI</span> prove your
              determination and generate great value
            </h2>
            <div className="md:block pt-5">
              <CMSContent>{props.Text}</CMSContent>

              <div className="flex-row flex justify-center md:justify-start">
                <div className="pr-3">
                  {/*<a
                    target={'_blank'}
                    href={props.Store_Links.Apple_App_Store_Link}
                    rel="noreferrer"
                  >*/}
                  <Image
                    alt="Appstore Badge"
                    src={'/assets/appstore-badge.svg'}
                    height={40}
                    width={120}
                  />
                  {/*</a>*/}
                </div>
                {/*<a
                  target={'_blank'}
                  href={props.Store_Links.Google_Play_Store_Link}
                  rel="noreferrer"
                >*/}
                <Image
                  alt="Google Play Badge"
                  src={'/assets/google-play-badge.svg'}
                  height={40}
                  width={130}
                />
                {/*</a>*/}
              </div>
              <div className="md:hidden">
                <Image
                  width={props.Image.data.attributes.width}
                  height={props.Image.data.attributes.height}
                  src={props.Image.data.attributes.url}
                  alt={props.Image.data.attributes.alternativeText}
                />
              </div>
              <div className="mt-4 flex-row flex justify-center md:justify-start">
                <Button
                  leftIcon={
                    <Image
                      alt="Opensea.io logo"
                      height={30}
                      width={30}
                      src="/assets/opensea.svg"
                    />
                  }
                  colorScheme="cherry"
                >
                  Visit collection on opensea.io
                </Button>
              </div>
            </div>
          </div>
          <div className="flex-col flex-1 flex justify-end relative items-center"></div>
        </div>
      </div>
    </Section>
  )
}

export default Hero
