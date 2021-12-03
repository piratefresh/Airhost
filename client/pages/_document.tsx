import Document, { Html, Head, Main, NextScript } from "next/document";

const backgroundStyles = {
  background: "#f9f9f9 url(./background_texture.png) repeat",
};

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="icon"
            href="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/271/cloud-with-lightning-and-rain_26c8-fe0f.png"
          />
        </Head>
        <div id="modal-root"></div>
        <body
          className="bg-gray-50 dark:bg-gray-900 dark:text-gray-500 h-full overflow-y-scroll"
          // style={backgroundStyles}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
