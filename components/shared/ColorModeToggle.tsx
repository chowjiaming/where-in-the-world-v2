import type {FunctionComponent} from 'react';
import type {FlexProps} from '@chakra-ui/react';
import {Flex, useColorMode} from '@chakra-ui/react';
import {FaSun, FaMoon} from 'react-icons/fa';
import {AnimatePresence} from 'framer-motion';
import {enterExitSpin} from '@/utils/animations';
import {AnimatedIconButton} from '@/components/shared/AnimatedIconButton';

export const ColorModeToggle: FunctionComponent<FlexProps> = (
  props: FlexProps
): JSX.Element => {
  const {colorMode, toggleColorMode} = useColorMode();
  const isDarkMode = colorMode === 'dark';

  return (
    <Flex {...props} align="center">
      <AnimatePresence>
        {isDarkMode ? (
          <AnimatedIconButton
            icon={FaSun}
            label="Light mode"
            colour="yellow.400"
            variants={enterExitSpin}
            onClick={toggleColorMode}
          />
        ) : (
          <AnimatedIconButton
            icon={FaMoon}
            label="Dark mode"
            colour="gray.400"
            variants={enterExitSpin}
            onClick={toggleColorMode}
          />
        )}
      </AnimatePresence>
    </Flex>
  );
};
