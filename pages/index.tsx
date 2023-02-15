import {Flex} from '@chakra-ui/react';
import Meta from '@/components/Meta';

export default function Home() {
  return (
    <>
      <Meta />
      <Flex as={'main'} minH={'100vh'} />
    </>
  );
}
