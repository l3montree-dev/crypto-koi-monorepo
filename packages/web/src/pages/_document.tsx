import React from 'react'
import NextDocument, { Head, Html, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="de">
        <Head />
        <script
          data-website-id="eb66d026-ab52-4f6f-83b4-efe828b7e742"
          async
          defer
          src="https://peek.l3montree.com/umami.js"
          integrity="sha256-Iu824csMXYHj2h2prIxlQVcYjaYggAfZG623+2aeDCg="
          crossOrigin="anonymous"
        />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
