import {Flex, Heading} from '@chakra-ui/react';
import {ColorModeToggle} from '@/components/shared/buttons/ColorModeToggle';
import Image from 'next/image';
import Link from 'next/link';

export function Navbar(): JSX.Element {
  return (
    <Flex
      as="nav"
      role="navigation"
      justify="space-between"
      p="4"
      minH="20"
      boxShadow="rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px"
    >
      <Flex
        as={Link}
        href="/"
        target="_self"
        rel="noopener noreferrer"
        align="center"
        gap="4"
      >
        <Image
          src="/svg/logo.svg"
          alt="Where in the World logo"
          width={50}
          height={50}
        />
        <Heading as="h1" size="lg">
          Where in the World
        </Heading>
      </Flex>
      <ColorModeToggle
        mr={{
          base: '0',
          md: '4',
        }}
        ml={{
          base: '4',
          md: '0',
        }}
      />
    </Flex>
  );
}

Navbar.displayName = 'Navbar';
