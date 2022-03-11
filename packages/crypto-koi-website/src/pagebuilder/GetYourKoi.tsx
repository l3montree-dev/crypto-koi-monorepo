import React, { FunctionComponent } from 'react'
import { IGetYourKoiPB } from '../cms/page'
import CMSContent from '../components/CMSContent'
import Section from '../components/Section'
import Image from 'next/image'

const GetYourKoi: FunctionComponent<IGetYourKoiPB> = (props) => {
  return (
    <Section>
      <div className="p-4">
        <h3>{props.Title}</h3>
        <CMSContent>{props.Text}</CMSContent>
      </div>
      <div id="kois" className="pb-8 flex-row flex">
        {props.Koi_Images.data.slice(0, 3).map((koiImg) => {
          return (
            <div key={koiImg.id}>
              <Image
                alt={koiImg.attributes.alternativeText}
                width={koiImg.attributes.formats.small.width}
                height={koiImg.attributes.formats.small.height}
                src={koiImg.attributes.formats.small.url}
              />
            </div>
          )
        })}
      </div>
    </Section>
  )
}

export default GetYourKoi
