import Image from 'next/image'
import React, { FunctionComponent, useState } from 'react'
import { IOnboardingPB } from '../cms/page'
import CMSContent from '../components/CMSContent'
import Lightbox from '../components/Lightbox'
import Section from '../components/Section'

const Onboarding: FunctionComponent<IOnboardingPB> = (props) => {
  const [lightboxImg, setLightboxImg] = useState<{
    alt: string
    width: number
    height: number
    src: string
    text?: string
  } | null>(null)

  const handleClose = () => {
    setLightboxImg(null)
  }
  return (
    <>
      <Section>
        <div className="px-4 max-w-screen-xl mx-auto">
          <h2 className="text-3xl md:text-5xl md:text-center mb-4 font-poppins font-bold">
            {props.Title}
          </h2>
          <div className="md:text-center">
            <CMSContent>{props.Text}</CMSContent>
          </div>
          <div className="relative mt-10">
            <div className="absolute bottom-0 top-0 md:hidden onboarding-dots border-slate-200 border-l-4 md:border-l-0 md:border-t-4 border-dotted" />
            <div className="relative flex-wrap md:flex justify-center flex-row">
              {props.Onboarding_Steps.map((step, index) => {
                return (
                  <div
                    className={
                      'mb-5 flex-row md:w-1/3 md:px-5 items-center md:flex-col flex'
                    }
                    key={step.id}
                  >
                    <span className="bg-slate-100 flex border-4 border-white rounded-full h-10 w-10 flex flex-row items-center justify-center font-bold">
                      {index + 1}.
                    </span>
                    <div
                      onClick={() =>
                        setLightboxImg({
                          alt: step.Image.data.attributes.alternativeText,
                          width:
                            step.Image.data.attributes.formats.medium.width,
                          height:
                            step.Image.data.attributes.formats.medium.height,
                          src: step.Image.data.attributes.formats.medium.url,
                          text: step.Text,
                        })
                      }
                      className="md:flex relative cursor-pointer flex-1 flex-col"
                    >
                      <Image
                        src={step.Image.data.attributes.formats.small.url}
                        height={step.Image.data.attributes.formats.small.height}
                        width={step.Image.data.attributes.formats.small.width}
                        alt={step.Image.data.attributes.alternativeText}
                      />
                      <div className="flex flex-1 rounded-lg mb-3 bg-slate-100 p-2 px-3">
                        <p>{step.Text}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </Section>
      {lightboxImg && <Lightbox {...lightboxImg} onClose={handleClose} />}
    </>
  )
}

export default Onboarding
