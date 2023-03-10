import type {ReactNode} from 'react';
import {Flex} from '@chakra-ui/react';
import {Navbar} from '@/components/layout/Navbar';
import {Main} from '@/components/layout/Main';
import {Footer} from '@/components/layout/Footer';

type LayoutProps = {
  children: ReactNode;
};
export function Layout({children}: LayoutProps): JSX.Element {
  return (
    <Flex direction="column" minH="100vh">
      <Navbar />
      <Main>{children}</Main>
      <Footer />
    </Flex>
  );
}

Layout.displayName = 'Layout';
