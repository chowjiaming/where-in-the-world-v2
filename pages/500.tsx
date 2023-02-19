import {Meta} from '@/components/Meta';
import {Button, Center, Heading} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

export default function FiveHundred(): JSX.Element {
  return (
    <>
      <Meta page="404" />
      <Center flexDir="column" gap="8">
        <Heading as="h1">500 - Server Error 😔</Heading>
        <Image
          src="/svg/404.svg"
          alt="500 - Server Error 😔"
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

FiveHundred.displayName = 'FiveHundred';
