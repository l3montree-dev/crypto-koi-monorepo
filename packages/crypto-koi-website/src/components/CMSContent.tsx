import React, { FunctionComponent } from 'react'
import ReactMarkdown from 'react-markdown'

const CMSContent: FunctionComponent<{ children: string }> = (props) => {
  return <ReactMarkdown>{props.children}</ReactMarkdown>
}

export default CMSContent
