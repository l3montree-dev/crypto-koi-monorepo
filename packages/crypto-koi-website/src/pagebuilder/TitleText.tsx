import React, { FunctionComponent } from 'react'
import { ITitleTextPB } from '../cms/page'
import CMSContent from '../components/CMSContent'
import Section from '../components/Section'

const TitleText: FunctionComponent<ITitleTextPB> = (props) => {
  return (
    <Section>
      <div className="p-4">
        <h3>{props.Title}</h3>
        <CMSContent>{props.Text}</CMSContent>
      </div>
    </Section>
  )
}

export default TitleText
