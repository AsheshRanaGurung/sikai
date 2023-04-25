import { Flex, FormLabel, Switch as ChakraSwitch } from "@chakra-ui/react";
import { sikaai_colors } from "@sikaai/theme/color";
interface ISwitch {
  value: boolean;
  variant?: keyof typeof variants;
  toggleSwitch: () => void;
  disabled?: boolean;
  label?: string;
  required?: boolean;
}

const variants = {
  primary: "green",
};

const Switch = ({
  variant,
  value,
  toggleSwitch,
  disabled,
  label,
  required,
}: ISwitch) => {
  return (
    <Flex>
      {label && (
        <FormLabel
          fontWeight={600}
          fontSize={"16px"}
          color={sikaai_colors.primary}
        >
          {label}
          {required && (
            <span style={{ color: sikaai_colors.black }}>&nbsp;*</span>
          )}
        </FormLabel>
      )}
      <ChakraSwitch
        disabled={disabled}
        size="md"
        colorScheme={variant ? variants[variant] : undefined}
        isChecked={value}
        onChange={toggleSwitch}
      />
    </Flex>
  );
};

Switch.defaultProps = {
  variant: "primary",
};

export default Switch;
