import {Flex, Link, Text} from '@chakra-ui/react';

export function Footer(): JSX.Element {
  return (
    <Flex
      as="footer"
      role="contentinfo"
      direction="column"
      align="center"
      textAlign="center"
      py="2"
      boxShadow="rgba(0, 0, 0, 0.1) 0px -10px 15px -3px, rgba(0, 0, 0, 0.05) 0px -4px 6px -2px;"
    >
      <Text fontSize="sm" color="subtle">
        Country data provided by{' '}
        <Link fontWeight="bold" href="https://restcountries.com/" isExternal>
          Rest Countries
        </Link>
      </Text>
      <Text fontSize="sm" color="subtle">
        Made with ❤️ by{' '}
        <Link fontWeight="bold" href="https://josephchow.dev" isExternal>
          Joseph Chow
        </Link>
      </Text>
    </Flex>
  );
}

Footer.displayName = 'Footer';
