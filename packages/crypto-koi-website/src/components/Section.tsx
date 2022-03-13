import React, { FunctionComponent } from 'react'
import { IWithAlignment } from '../cms/page'

const Section: FunctionComponent<
  Partial<IWithAlignment & { className: string }>
> = (props) => {
  return (
    <section className="md:max-w-2xl md:mx-auto md:bg-soft">
      {props.children}
    </section>
  )
}

export default Section
