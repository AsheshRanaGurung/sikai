import { Switch as ChakraSwitch } from "@chakra-ui/react";
import { sikaai_colors } from "@sikaai/theme/color";
interface ISwitch {
  value: boolean;
  variant?: keyof typeof variants;
  toggleSwitch: () => void;
  disabled?: boolean;
}

const variants = {
  primary: "green",
};

const Switch = ({ variant, value, toggleSwitch, disabled }: ISwitch) => {
  return (
    <>
      <ChakraSwitch
        disabled={disabled}
        size="md"
        colorScheme={variants[variant!]}
        isChecked={value}
        onChange={toggleSwitch}
      />
    </>
  );
};

Switch.defaultProps = {
  variant: "primary",
};

export default Switch;
