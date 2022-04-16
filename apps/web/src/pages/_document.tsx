import React from 'react'
import NextDocument, { Head, Html, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
    render() {
        return (
            <Html lang="de">
                <Head>
                    <link rel="manifest" href="/manifest.json" />
                    <link
                        rel="apple-touch-icon"
                        href="/icon-192x192.png"
                    ></link>
                    <meta name="theme-color" content="#fff" />
                    <script
                        data-website-id="eb66d026-ab52-4f6f-83b4-efe828b7e742"
                        async
                        defer
                        src="https://peek.l3montree.com/umami.js"
                        integrity="sha256-YPlcWStQyt6XusHt8RZcGD2qBQ1WSMd/xNPIOvtx+tA="
                        crossOrigin="anonymous"
                    />
                </Head>

                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
