import { ArrowDownIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'
import Image from 'next/image'
import React, { FunctionComponent } from 'react'
import { IMenu } from '../cms/menu'
import { IHeroSectionPB } from '../cms/page'
import { CMSContent } from '../components/CMSContent'
import Section from '../components/Section'

const Hero: FunctionComponent<IHeroSectionPB & IMenu> = (props) => {
    return (
        <Section className="hero-section flex-row items-center relative pt-14 lg:py-0">
            <div className="absolute hidden w-1/2 lg:block pb-10 bottom-0 right-0">
                <Image
                    quality={100}
                    width={props.Image.data.attributes.width}
                    height={props.Image.data.attributes.height}
                    src={props.Image.data.attributes.url}
                    alt={props.Image.data.attributes.alternativeText}
                />
            </div>
            <div className="max-w-screen-xl lg:px-4 mx-auto">
                <div className="lg:flex lg:py-20 xl:py-48 pt-10 justify-center flex-1 items-center flex-row">
                    <div className="p-4 lg:px-0 flex-1">
                        <span className="text-xl">{props.Subtitle}</span>
                        <h2 className="font-poppins font-bold text-4xl lg:text-5xl">
                            Let a <span className="text-cherry-500">KOI</span>{' '}
                            prove your determination and generate great value
                        </h2>
                        <div className="lg:block pt-5">
                            <CMSContent>{props.Text}</CMSContent>
                            <div className="flex-row flex justify-center lg:justify-start">
                                <div className="pr-3 flex-row flex items-center">
                                    {/*<a
                                        target={'_blank'}
                                        href={props.Store_Links.Apple_App_Store_Link}
                                        rel="noreferrer"
                                    >*/}
                                    <Image
                                        alt="Appstore Badge"
                                        src={'/assets/appstore-badge.svg'}
                                        height={40}
                                        width={130}
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
                            <div className="lg:hidden -mx-4">
                                <Image
                                    width={props.Image.data.attributes.width}
                                    height={props.Image.data.attributes.height}
                                    src={props.Image.data.attributes.url}
                                    alt={
                                        props.Image.data.attributes
                                            .alternativeText
                                    }
                                />
                            </div>
                            <div className="mt-4 flex-row flex justify-center lg:justify-start">
                                <a
                                    href={props.Button.Link}
                                    target={
                                        props.Button.Target_Blank
                                            ? '_blank'
                                            : ''
                                    }
                                    rel="noreferrer"
                                >
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
                                        {props.Button.Text}
                                    </Button>
                                </a>
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
