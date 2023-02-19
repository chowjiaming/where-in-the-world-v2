import {ButtonGroup, Flex, IconButton, Link, Text} from '@chakra-ui/react';
import {FaGithub, FaLinkedin, FaTwitter} from 'react-icons/fa';

export function Footer(): JSX.Element {
  return (
    <Flex
      as="footer"
      role="contentinfo"
      direction="column"
      align="center"
      justify="center"
      gap="1"
      pt="2"
      pb="1"
      boxShadow="rgba(0, 0, 0, 0.1) 0px -10px 15px -3px, rgba(0, 0, 0, 0.05) 0px -4px 6px -2px;"
    >
      <Text fontSize="sm" color="subtle">
        Made with ❤️ by{' '}
        <Link
          href="https://josephchow.dev"
          isExternal
          color="subtle"
          fontWeight="bold"
        >
          Joseph Chow
        </Link>
      </Text>
      <ButtonGroup variant="ghost">
        <IconButton
          as={Link}
          isExternal
          href="https://www.linkedin.com/in/chowjiaming/"
          aria-label="LinkedIn"
          icon={<FaLinkedin fontSize="1.25rem" />}
        />
        <IconButton
          as={Link}
          isExternal
          href="https://github.com/chowjiaming"
          aria-label="GitHub"
          icon={<FaGithub fontSize="1.25rem" />}
        />
        <IconButton
          as={Link}
          isExternal
          href="https://twitter.com/chowjiaming"
          aria-label="Twitter"
          icon={<FaTwitter fontSize="1.25rem" />}
        />
      </ButtonGroup>
    </Flex>
  );
}

Footer.displayName = 'Footer';
