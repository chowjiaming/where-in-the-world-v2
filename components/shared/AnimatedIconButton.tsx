import type {FunctionComponent} from 'react';
import type {Variants} from 'framer-motion';
import type {IconType} from 'react-icons';
import {Icon, Tooltip, chakra, ColorProps} from '@chakra-ui/react';
import {motion} from 'framer-motion';

type AnimatedIconProps = {
  icon: IconType;
  label: string;
  colour: ColorProps['color'];
  variants: Variants;
  onClick: () => void;
};
export const AnimatedIconButton: FunctionComponent<AnimatedIconProps> = ({
  icon,
  label,
  colour,
  variants,
  onClick,
}: AnimatedIconProps): JSX.Element => {
  return (
    <Tooltip label={label}>
      <MotionButton
        key={icon.name}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        display="flex"
        alignItems="center"
      >
        <Icon
          as={icon}
          aria-label={label}
          boxSize="8"
          color={colour}
          onClick={onClick}
        />
      </MotionButton>
    </Tooltip>
  );
};

const MotionButton = chakra(motion.button);
