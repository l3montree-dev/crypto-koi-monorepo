import React, { FunctionComponent } from 'react'
import ReactMarkdown from 'react-markdown'

const CMSContent: FunctionComponent<{ children: string }> = (props) => {
  return (
    <div className="markdown">
      <ReactMarkdown>{props.children}</ReactMarkdown>
    </div>
  )
}

export default CMSContent
