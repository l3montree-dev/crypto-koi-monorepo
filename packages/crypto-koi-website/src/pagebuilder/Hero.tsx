import { ArrowDownIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'
import Image from 'next/image'
import React, { FunctionComponent } from 'react'
import { IMenu } from '../cms/menu'
import { IHeroSectionPB } from '../cms/page'
import CMSContent from '../components/CMSContent'
import Koi from '../components/Koi'
import Section from '../components/Section'

const Hero: FunctionComponent<IHeroSectionPB & IMenu> = (props) => {
  return (
    <Section className="hero-section md:py-0 md:bg-bottom md:bg-contain">
      <div className="max-w-screen-xl md:px-4 mx-auto">
        <div className="md:flex md:py-20 justify-center flex-1 items-center flex-row">
          <div className="p-4 md:px-0 flex-1 pt-8">
            <span className="text-xl">{props.Subtitle}</span>
            <h2 className="font-poppins font-bold text-3xl md:text-4xl">
              Let a <span className="text-cherry-600">KOI</span> steal your
              lifetime for a <span className="line-through">speculative</span>
              <span className="font-gochi font-normal pl-2">great</span> value
            </h2>
            <div className="md:block pt-5 hidden">
              <CMSContent>{props.Text}</CMSContent>

              <div className="flex-row flex items-start">
                <div className="pr-3">
                  <a
                    target={'_blank'}
                    href={props.Store_Links.Apple_App_Store_Link}
                    rel="noreferrer"
                  >
                    <Image
                      alt="Appstore Badge"
                      src={'/assets/appstore-badge.svg'}
                      height={40}
                      width={120}
                    />
                  </a>
                </div>
                <a
                  target={'_blank'}
                  href={props.Store_Links.Google_Play_Store_Link}
                  rel="noreferrer"
                >
                  <Image
                    alt="Google Play Badge"
                    src={'/assets/google-play-badge.svg'}
                    height={40}
                    width={130}
                  />
                </a>
              </div>
            </div>
          </div>
          <div
            id="radial-gradient"
            className="flex-col flex-1 flex justify-center relative items-center"
          >
            <div className="floating pb-12  max-w-md">
              <Koi
                species="TANCHO KOHAKO"
                patterns={1}
                src={props.Image.data.attributes.url}
                colors={['#FFFFFF', '#FFFFFF', '#BA1B05']}
              />
            </div>
            <div className="hidden md:flex flex-row justify-center mb-5">
              <Button
                leftIcon={
                  <Image
                    alt="Opensea.io logo"
                    height={30}
                    width={30}
                    src="/assets/opensea.svg"
                  />
                }
                colorScheme="blue"
              >
                Visit collection on opensea.io
              </Button>
            </div>
          </div>
        </div>
        <div className="px-4 md:hidden">
          <CMSContent>{props.Text}</CMSContent>
          <div className="flex flex-row justify-center mb-5">
            <Button
              leftIcon={
                <Image
                  alt="Opensea.io logo"
                  height={30}
                  width={30}
                  src="/assets/opensea.svg"
                />
              }
              colorScheme="blue"
            >
              Visit collection on opensea.io
            </Button>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <span className="text-sm text-center pb-2">{props.Learn_More}</span>
          <ArrowDownIcon className="" fontSize={24} />
        </div>
      </div>
    </Section>
  )
}

export default Hero
