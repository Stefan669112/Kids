import { Html, Head, Main, NextScript } from 'next/document'
 
export default function Document() {
  return (
    <Html lang="en">
      <Head>
      
      </Head>
      <body>
        <Main />
        <NextScript />
        <link rel="stylesheet" href="https://unpkg.com/@leapwallet/elements@1.4.2/dist/style.css" />
        <script defer src="https://unpkg.com/@leapwallet/elements@1.4.2/dist/umd/main.js" />
      </body>
    </Html>
  )
}