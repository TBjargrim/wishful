import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="sv">
        <Head>
          <title>Wishful</title>
          <meta charset="utf-8"></meta>
          <meta
            name="description"
            content="Wishful - provides the user with information about friends birthdays and celebrations. Follow your friends to get to see their wishlists"
          ></meta>
          <link
            href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,500&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
