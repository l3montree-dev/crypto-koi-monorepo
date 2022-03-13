import Image from 'next/image'
import React, { FunctionComponent } from 'react'
import { IImageTextCardsPB } from '../cms/page'
import CMSContent from '../components/CMSContent'
import Section from '../components/Section'

const ImageTextCards: FunctionComponent<IImageTextCardsPB> = (props) => {
  const [imageOrder, textOrder] =
    props.Card_Positions === 'Image_Left_Text_Right'
      ? ['order-first', 'order-last']
      : ['order-last', 'order-first']
  return (
    <Section>
      <div className="flex-col md:flex-row max-w-screen-xl mx-auto flex p-4">
        <div
          className={'rounded-lg mb-4 md:mx-2 w-full shadow-lg ' + imageOrder}
          style={{ backgroundColor: props.Color }}
        >
          <Image
            alt={props.Image.data.attributes.alternativeText}
            width={props.Image.data.attributes.formats.medium.width}
            height={props.Image.data.attributes.formats.medium.height}
            src={props.Image.data.attributes.formats.medium.url}
          />
        </div>
        <div
          className={
            'bg-cherry-600 md:mx-2 flex-col flex items-center justify-end shadow-lg w-full text-white mb-4 p-4 rounded-lg ' +
            textOrder
          }
        >
          <CMSContent>{props.Text}</CMSContent>
        </div>
      </div>
    </Section>
  )
}

export default ImageTextCards
