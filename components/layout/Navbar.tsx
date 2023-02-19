import {Flex, Heading} from '@chakra-ui/react';
import {ColorModeToggle} from '@/components/shared/buttons/ColorModeToggle';
import {useRouter} from 'next/navigation';
import Image from 'next/image';

export function Navbar(): JSX.Element {
  const router = useRouter();
  return (
    <Flex
      as="nav"
      role="navigation"
      justify="space-between"
      p="4"
      minH="20"
      boxShadow="rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;"
    >
      <Flex
        align="center"
        gap="4"
        cursor="pointer"
        onClick={() => router.push('/')}
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
