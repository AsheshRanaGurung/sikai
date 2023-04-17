import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  FormErrorMessage,
  FormHelperText,
  InputProps,
  InputGroup,
} from "@chakra-ui/react";
import { sikaai_colors } from "@sikaai/theme/color";
import { RegisterOptions, UseFormRegister, FieldValues } from "react-hook-form";

const FileUpload = ({
  label,
  helperText,
  name,
  error = "",
  rules,
  register,
  isDisabled,
  labelDisabled,
  isRequired,
  type,
  startIcon,
  endIcons,
  onIconClick,
  required,
  ...rest
}: IInput) => {
  return (
    <FormControl
      isInvalid={!!error}
      isRequired={isRequired}
      isDisabled={isDisabled}
    >
      {label && (
        <FormLabel htmlFor={name} fontWeight={600} fontSize={"18px"}>
          {label}
          {required && (
            <span style={{ color: sikaai_colors.black }}>&nbsp;*</span>
          )}
        </FormLabel>
      )}
      {labelDisabled && (
        <FormLabel
          htmlFor={name}
          fontWeight={400}
          fontSize={"16px"}
          opacity={"1 !important"}
        >
          {labelDisabled}
        </FormLabel>
      )}
      <InputGroup>
        <ChakraInput
          id={name}
          type={"file"}
          {...register(name, rules)}
          {...rest}
        />
      </InputGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
export interface IInput<TFieldValues extends FieldValues = FieldValues>
  extends InputProps {
  label?: string;
  helperText?: string;
  error?: string;
  name: string;
  register: UseFormRegister<TFieldValues>;
  rules?: RegisterOptions;
  isRequired?: boolean;
  isDisabled?: boolean;
  startIcon?: React.ReactNode;
  endIcons?: React.ReactNode;
  onIconClick?: () => void;
  required?: boolean;
  labelDisabled?: string;
}
export default FileUpload;
