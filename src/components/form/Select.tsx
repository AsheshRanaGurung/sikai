import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Select as ChakraSelect,
  SelectProps,
} from "@chakra-ui/react";
import { sikaai_colors } from "@sikaai/theme/color";
import { RegisterOptions, UseFormRegister, FieldValues } from "react-hook-form";

const Select = ({
  placeholder,
  label,
  options,
  rules,
  register,
  helperText,
  name,
  error,
  isRequired,
  required,
  enabled,
  ...rest
}: ISelect) => {
  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      {label && (
        <FormLabel htmlFor={name} fontWeight={600} fontSize={"18px"}>
          {label}{" "}
          {required && (
            <span style={{ color: sikaai_colors.red }}>&nbsp;*</span>
          )}
        </FormLabel>
      )}
      <ChakraSelect
        {...register(name, rules)}
        {...rest}
        id={name}
        style={{ fontSize: "16px", color: "#718096" }}
      >
        {placeholder && (
          <option value="" disabled={!enabled}>
            {placeholder}
          </option>
        )}
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </ChakraSelect>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export interface ISelect<TFieldValues extends FieldValues = FieldValues>
  extends SelectProps {
  placeholder?: string;
  options: ISelectOption[];
  label?: string;
  name: string;
  register: UseFormRegister<TFieldValues>;
  error?: string;
  rules?: RegisterOptions;
  helperText?: string;
  isRequired?: boolean;
  required?: boolean;
  enabled?: boolean;
}
export default Select;

export interface ISelectOption {
  label: string;
  value: string;
}
