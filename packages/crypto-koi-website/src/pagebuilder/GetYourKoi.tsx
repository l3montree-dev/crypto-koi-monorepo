import React, { FunctionComponent, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { IGetYourKoiPB } from '../cms/page'
import CMSContent from '../components/CMSContent'
import Section from '../components/Section'

const GetYourKoi: FunctionComponent<IGetYourKoiPB> = (props) => {
  const { ref, inView, entry } = useInView()

  useEffect(() => {
    if (inView && entry) {
      entry.target.classList.add('animate')
    } else if (entry) {
      entry.target.classList.remove('animate')
    }
  }, [inView, entry])

  return (
    <Section>
      <div className="p-4 max-w-screen-xl mx-auto">
        <h3 className="text-3xl mb-4 font-bold font-poppins">{props.Title}</h3>
        <CMSContent>{props.Text}</CMSContent>
      </div>
      <div
        ref={ref}
        id="kois"
        className="pb-8 relative max-w-screen-xl mx-auto flex-row flex"
      >
        <div className="koi-gradient"></div>

        <div className="koi-gradient"></div>
      </div>
    </Section>
  )
}

export default GetYourKoi
