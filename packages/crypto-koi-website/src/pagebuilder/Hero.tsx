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
  if (!isBrowser()) {
    // component can only be client side rendered.
    return null
  }
  console.log(props.Text)
  return (
    <Section className="p-0">
      <div className="p-4">
        <span className="">{props.Subtitle}</span>
        <h2 className="font-poppins font-bold text-2xl">
          Let a <span className="text-cherry-600">KOI</span> steal your lifetime
          for a <span className="line-through">speculative</span>
          <span className="font-gochi font-normal pl-2">great</span> value
        </h2>
      </div>
      <div id="hero-wave" className="flex justify-center items-center">
        <div className="absolute">
          <RoundProgress
            circleOneStroke={colors.cherry[600]}
            circleTwoStroke="rgba(0,0,0)"
            size={win().innerWidth - 100}
            fill="rgba(0,0,0,0)"
            strokeWidth={15}
            progress={progress}
          />
        </div>
        <Image
          id="hero-img"
          className="floating"
          alt={props.Image.data.attributes.alternativeText}
          src={props.Image.data.attributes.formats.medium.url}
          height={props.Image.data.attributes.formats.medium.height}
          width={props.Image.data.attributes.formats.medium.width}
        />
      </div>
      <div className="flex-row -mt-5 pb-5 justify-center flex">
        <b className="text-center">
          {transformToString(clock, moment().endOf('hour'))}
        </b>
      </div>

      <div className="px-4">
        <ReactMarkdown>{props.Text}</ReactMarkdown>
      </div>
      <div className="flex-col pb-5 flex items-center">
        <span className="text-sm pb-2">{props.Learn_More}</span>
        <ArrowDownIcon className="simple-float" fontSize={24} />
      </div>
    </Section>
  )
}

export default Hero
