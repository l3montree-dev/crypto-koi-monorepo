import React, { FunctionComponent } from 'react'
import { IWithAlignment } from '../cms/page'

const Section: FunctionComponent<
  Partial<IWithAlignment & { className: string }>
> = (props) => {
  return (
    <section className={'p-4 ' + props.className}>{props.children}</section>
  )
}

export default Section
