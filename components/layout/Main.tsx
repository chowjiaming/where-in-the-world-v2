import type {FunctionComponent} from 'react';
import type {FlexProps} from '@chakra-ui/react';
import {Flex} from '@chakra-ui/react';

export const Main: FunctionComponent<FlexProps> = (props): JSX.Element => {
  return (
    <Flex
      as="main"
      role="main"
      direction="column"
      flex="1"
      p={{
        base: '4',
        md: '8',
        xl: '12',
      }}
      {...props}
    >
      {props.children}
    </Flex>
  );
};

Main.displayName = 'Main';
