import {Html, Head, Main, NextScript} from 'next/document';
import {ColorModeScript} from '@chakra-ui/react';
import {config} from '@/theme/styles';

export default function Document(): JSX.Element {
  return (
    <Html lang="en">
      <Head />
      <body>
        <ColorModeScript initialColorMode={config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
