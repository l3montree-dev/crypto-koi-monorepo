import React, { FunctionComponent } from 'react'
import { IOnboardingPB } from '../cms/page'
import CMSContent from '../components/CMSContent'
import Section from '../components/Section'
import Image from 'next/image'

const Onboarding: FunctionComponent<IOnboardingPB> = (props) => {
  return (
    <Section>
      <div className="px-4 max-w-screen-xl mx-auto">
        <h2 className="text-3xl md:text-5xl md:text-center mb-4 font-poppins font-bold">
          {props.Title}
        </h2>
        <div className="md:text-center">
          <CMSContent>{props.Text}</CMSContent>
        </div>
        <div className="relative">
          <div className="absolute bottom-0 top-0 onboarding-dots border-slate-200 border-l-4 border-dotted" />
          <div className="relative">
            {props.Onboarding_Steps.map((step, index) => {
              return (
                <div
                  className={'mb-5 flex-row items-center flex'}
                  key={step.id}
                >
                  <span className="bg-slate-100 border-4 border-white rounded-full h-10 w-10 flex flex-row items-center justify-center font-bold">
                    {index + 1}.
                  </span>
                  <div className="flex-1 md:flex flex-row items-end">
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
  )
}

export default Onboarding
