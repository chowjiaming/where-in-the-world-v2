import {extendTheme} from '@chakra-ui/react';
import {colours, config, fonts} from '@/theme/styles';
import {layerStyles} from '@/theme/styles/layerStyles';
import {textStyles} from '@/theme/styles/textStyles';

export const theme = extendTheme({
  colors: colours,
  fonts,
  layerStyles,
  textStyles,
  config,
});
