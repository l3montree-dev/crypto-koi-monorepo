import React, { FunctionComponent } from 'react'
import { IFeaturesPB } from '../cms/page'
import CMSContent from '../components/CMSContent'
import Section from '../components/Section'
import Image from 'next/image'

const Feature: FunctionComponent<IFeaturesPB> = (props) => {
  return (
    <Section>
      <div className="px-4 max-w-screen-xl mx-auto py-4">
        <h2 className="text-3xl mb-4 font-bold font-poppins">{props.Title}</h2>
        <div className="md:flex flex-row md:-mx-2">
          {props.Feature_Cards.map((card) => (
            <div
              className="rounded-lg md:mx-2 text-center bg-white mb-4 p-4 shadow-lg"
              key={card.id}
            >
              <div className="w-14 rounded-full h-14 mx-auto mb-4 p-3 bg-cherry">
                <Image
                  alt={card.Icon.data.attributes.alternativeText}
                  width={card.Icon.data.attributes.formats.small.width}
                  height={card.Icon.data.attributes.formats.small.height}
                  src={card.Icon.data.attributes.formats.small.url}
                />
              </div>
              <CMSContent>{card.Text}</CMSContent>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default Feature
