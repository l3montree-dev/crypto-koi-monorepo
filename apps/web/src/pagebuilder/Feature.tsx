import React, { FunctionComponent } from 'react'
import { IFeaturesPB } from '../cms/page'
import { CMSContent } from '../components/CMSContent'
import Section from '../components/Section'
import Image from 'next/image'

const Feature: FunctionComponent<IFeaturesPB> = (props) => {
    return (
        <Section className="bg-cherry text-white">
            <div className="px-4 text-center max-w-screen-xl mx-auto">
                <h2 className="text-4xl md:text-5xl mb-4 font-bold font-poppins">
                    {props.Title}
                </h2>
                <CMSContent>{props.Text}</CMSContent>
                <div className="md:flex flex-row md:-mx-2">
                    {props.Feature_Cards.map((card) => (
                        <div
                            className="rounded-lg md:mx-2 flex-1 text-center bg-white text-black mb-4 p-8 shadow-lg"
                            key={card.id}
                        >
                            <div className="flex-row items-center justify-center flex rounded-lg mx-auto mb-4 p-0">
                                <Image
                                    alt={
                                        card.Icon.data.attributes
                                            .alternativeText
                                    }
                                    width={125}
                                    height={125}
                                    src={card.Icon.data.attributes.url}
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
