import Image from 'next/image'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { IHeroSectionPB } from '../cms/page'
import Section from '../components/Section'
import { isBrowser, win } from '../misc/utils'
import moment, { Moment } from 'moment'
import RoundProgress from '../components/RoundProgress'
import ReactMarkdown from 'react-markdown'
import { colors } from '../../styles/theme'
import { ArrowDownIcon } from '@chakra-ui/icons'
import CMSContent from '../components/CMSContent'

const fix2Digits = (n: number) => {
  return n < 10 ? '0' + n : n
}
const transformToString = (from: Moment, till: Moment) => {
  const diff = till.diff(from, 'seconds')
  const s = diff % 60
  const h = Math.floor(diff / (60 * 60))
  const m = Math.floor(diff / 60) % 60

  return '' + fix2Digits(h) + ':' + fix2Digits(m) + ':' + fix2Digits(s)
}
const Hero: FunctionComponent<IHeroSectionPB> = (props) => {
  const [clock, setNow] = useState(moment())
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(moment())
    }, 1000)
    return () => clearInterval(interval)
  })
  const progress = moment().endOf('hour').diff(clock, 'seconds') / (60 * 60)

  return (
    <Section className="hero-section md:py-0 md:bg-bottom md:bg-contain">
      <div className="max-w-screen-xl md:px-4 mx-auto">
        <div className="md:flex md:py-20 justify-center flex-1 items-center flex-row">
          <div className="p-4 md:px-0 flex-1 pt-8">
            <span className="text-xl">{props.Subtitle}</span>
            <h2 className="font-poppins font-bold text-2xl md:text-4xl">
              Let a <span className="text-cherry-600">KOI</span> steal your
              lifetime for a <span className="line-through">speculative</span>
              <span className="font-gochi font-normal pl-2">great</span> value
            </h2>
            <div className="md:block pt-5 hidden">
              <CMSContent>{props.Text}</CMSContent>
              <div className="flex-row flex items-start">
                <div className="pr-3">
                  <Image
                    alt="Appstore Badge"
                    src={'/assets/appstore-badge.svg'}
                    height={40}
                    width={120}
                  />
                </div>

                <Image
                  alt="Appstore Badge"
                  src={'/assets/google-play-badge.svg'}
                  height={40}
                  width={130}
                />
              </div>
            </div>
          </div>
          <div
            id="radial-gradient"
            className="flex-col flex-1 flex justify-center relative items-center"
          >
            <div className="absolute">
              <RoundProgress
                circleOneStroke={colors.cherry[600]}
                circleTwoStroke="rgba(0,0,0)"
                size={Math.min(win().innerWidth, 400) - 100}
                fill="rgba(0,0,0,0)"
                strokeWidth={15}
                progress={progress}
              />
            </div>
            <div className="floating max-w-md">
              <Image
                id="hero-img"
                alt={props.Image.data.attributes.alternativeText}
                src={props.Image.data.attributes.formats.small.url}
                quality={100}
                height={Math.min(
                  400,
                  props.Image.data.attributes.formats.small.height
                )}
                width={Math.min(
                  400,
                  props.Image.data.attributes.formats.small.width
                )}
              />
            </div>

            <div className="flex-col pb-5 justify-center flex">
              <b className="text-center">
                {transformToString(clock, moment().endOf('hour'))}
              </b>
              <span className="text-center text-sm">
                <a
                  target={'_blank'}
                  href="https://www.instagram.com/tamxily.tattoo/"
                  rel="noreferrer"
                >
                  Artwork by:{' '}
                  <span className="text-cherry">@tamxily.tattoo</span>
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className="px-4 md:hidden">
          <CMSContent>{props.Text}</CMSContent>
        </div>
        <div className="flex-col pb-5 flex items-center">
          <span className="text-sm pb-2">{props.Learn_More}</span>
          <ArrowDownIcon className="simple-float" fontSize={24} />
        </div>
      </div>
    </Section>
  )
}

export default Hero
