import type {FunctionComponent} from 'react';
import type {AppProps} from 'next/app';
import {ChakraProvider} from '@chakra-ui/react';
import {theme} from '@/theme';
import {Layout} from '@/components/layout';

const App: FunctionComponent<AppProps> = ({
  Component,
  pageProps,
}: AppProps): JSX.Element => {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
};

export default App;
