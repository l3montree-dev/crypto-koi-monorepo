import { Button } from '@chakra-ui/react'
import Image from 'next/image'
import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { IStoryPB } from '../cms/page'

const shouldBeVisible = (
  elIndex: number,
  totalElements: number,
  percentage: number
) => {
  if (elIndex === 0) {
    return percentage <= 0 ? 'opacity-1' : 'opacity-0'
  }

  // calculate start and stop.

  // the last element should get twice the size. - therefore add 1.
  const percentageVisible = 100 / (totalElements + 1)
  const start = percentageVisible * (elIndex - 1)
  const stop = percentageVisible * elIndex

  // check if last element
  // never fade out the last element
  if (elIndex === totalElements - 1) {
    return percentage > start ? 'opacity-1' : 'opacity-0'
  }
  return percentage > start && percentage <= stop ? 'opacity-1' : 'opacity-0'
}

const Story: FunctionComponent<IStoryPB> = (props) => {
  const containerRef = useRef<HTMLElement | null>(null)
  const currentPos = useRef(0)
  const [percentageScrolled, setPercentageScrolled] = useState(0)

  const toTop = () => {
    window.scrollTo({
      top: Math.max(
        0,
        // scroll to just a bit above the container
        (containerRef.current?.offsetTop ?? 0) - window.innerHeight / 2
      ),
      behavior: 'smooth',
    })
  }

  const skip = () => {
    window.scrollTo({
      top:
        (containerRef.current?.offsetTop ?? 0) +
        (containerRef.current?.clientHeight ?? 0) -
        window.innerHeight / 2,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const listener = () => {
      const height = containerRef.current?.clientHeight ?? 0
      const offsetTop = containerRef.current?.offsetTop ?? 0
      const percentageScrolled =
        ((window.pageYOffset - offsetTop) / height) * 100

      const fixedTo5 = Math.floor(Math.max(-5, percentageScrolled) / 5) * 5
      if (fixedTo5 !== currentPos.current) {
        setPercentageScrolled(fixedTo5)
        currentPos.current = fixedTo5
        const header = document.getElementsByTagName('header')

        if (fixedTo5 <= -5 || fixedTo5 > 90) {
          header.item(0)?.classList.add('scrolled')
        } else if (fixedTo5 > -5 && fixedTo5 <= 100) {
          header.item(0)?.classList.remove('scrolled')
        }
      }
    }
    window.addEventListener('scroll', listener)
    return () => window.removeEventListener('scroll', listener)
  }, [])
  return (
    <section ref={containerRef} className={'py-10 text-white story'}>
      <div className="max-w-screen-xl sticky sticky-story mx-auto px-4">
        {props.Story_Steps.map((step, index) => {
          return (
            <div
              className={
                'duration-1000 font-gochi  left-0 right-0 bottom-0 top-0 px-4 flex-1 items-center md:flex-row flex-col justify-center flex absolute ' +
                shouldBeVisible(
                  index,
                  props.Story_Steps.length,
                  percentageScrolled
                )
              }
              key={step.id}
            >
              <div className="md:mb-0 mb-10 md:flex-1  text-center">
                <span className="text-center text-lg md:text-2xl opacity-75">
                  {index + 1} / {props.Story_Steps.length}
                </span>
                <p className="text-3xl md:text-5xl">{step.Text}</p>
              </div>
              {step.Image.data && (
                <div className="md:flex-1 md:ml-5">
                  <Image
                    width={step.Image.data.attributes.formats.medium.width}
                    height={step.Image.data.attributes.formats.medium.height}
                    alt={step.Image.data.attributes.alternativeText}
                    src={step.Image.data.attributes.formats.medium.url}
                  />
                </div>
              )}
            </div>
          )
        })}
        <div className="absolute items-center bottom-0 flex-row flex justify-center left-0 right-0 pb-16">
          <Button
            onClick={toTop}
            _hover={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
            variant={'outline'}
          >
            To top
          </Button>

          <div className="w-24 h-4 mx-10 rounded border-2 border-white">
            <div
              className="h-full border-white duration-300 bg-white"
              style={{
                width:
                  Math.min(
                    100,
                    percentageScrolled + 100 / props.Story_Steps.length
                  ) + '%',
              }}
            />
          </div>
          <Button
            onClick={skip}
            _hover={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
            variant={'outline'}
          >
            Skip
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Story
