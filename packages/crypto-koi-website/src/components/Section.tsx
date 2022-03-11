import React, { FunctionComponent } from 'react'
import { IWithAlignment } from '../cms/page'

const Section: FunctionComponent<
  Partial<IWithAlignment & { className: string }>
> = (props) => {
  return <section>{props.children}</section>
}

export default Section
