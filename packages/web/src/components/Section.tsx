import React, { FunctionComponent } from 'react'
import { IWithAlignment } from '../cms/page'

const Section: FunctionComponent<
  Partial<IWithAlignment & { className: string }>
> = (props) => {
  return (
    <section className={'py-10 md:py-14 ' + props.className}>
      {props.children}
    </section>
  )
}

export default Section
