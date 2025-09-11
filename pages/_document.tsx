// pages/_document.tsx
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    // Pass the locale to the document props
    return { ...initialProps, locale: ctx.locale };
  }

  render() {
    // Check if the locale is a right-to-left language
    const isRtl = this.props.locale === 'fa';
    
    return (
      <Html lang={this.props.locale} dir={isRtl ? 'rtl' : 'ltr'}>
        <Head>
          {/* Your fonts and other head elements */}
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