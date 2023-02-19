import {Meta} from '@/components/Meta';
import {Button, Center, Heading} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

export default function ErrorPage(): JSX.Element {
  return (
    <>
      <Meta page="404" />
      <Center flexDir="column" gap="8">
        <Heading as="h1">Error - Something went wrong 😔</Heading>
        <Image
          src="/svg/404.svg"
          alt="Error - Something went wrong 😔"
          width={300}
          height={300}
          priority
        />
        <Button as={Link} href="/" colorScheme="blue">
          Go back home
        </Button>
      </Center>
    </>
  );
}

ErrorPage.displayName = 'ErrorPage';
