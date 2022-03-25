import React, { FunctionComponent } from 'react'
import { ITitleTextPB } from '../cms/page'
import CMSContent from '../components/CMSContent'
import Section from '../components/Section'

const TitleText: FunctionComponent<ITitleTextPB> = (props) => {
    return (
        <Section>
            <div className="px-4 max-w-screen-xl mx-auto">
                <h3 className="text-3xl mb-4 font-bold font-poppins">
                    {props.Title}
                </h3>
                <CMSContent>{props.Text}</CMSContent>
            </div>
        </Section>
    )
}

export default TitleText
