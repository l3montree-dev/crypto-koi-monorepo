import React, { FunctionComponent } from 'react'
import { Footer } from './Footer'
import Header from './Header'

interface Props {}
const Page: FunctionComponent<Props> = (props) => {
  return (
    <div className="page bg-soft">
      <Header />
      {props.children}
      <Footer />
    </div>
  )
}

export default Page
