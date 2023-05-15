import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  SelectProps,
} from "@chakra-ui/react";
import ReactSelect from "react-select";
import { RegisterOptions } from "react-hook-form";
import { Controller } from "react-hook-form";
import { sikaai_colors } from "@sikaai/theme/color";
import { useTranslation } from "react-i18next";
import { ISelectOption } from "./Select";

const MultiSelect = ({
  label,
  options,
  helperText,
  name,
  isRequired,
  selectControl,
  style,
  placeholder,
  required,
  multiValue,
}: IMultiSelect) => {
  const { t } = useTranslation();
  return (
    <Controller
      control={selectControl}
      name={name ?? ""}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { error },
      }) => {
        // note: react select ko design select or input component sanga match garam hai.

        return (
          <FormControl isInvalid={!!error} isRequired={isRequired}>
            {label && (
              <FormLabel htmlFor={name} fontWeight={400} fontSize={"14px"}>
                {label}
                {required && (
                  <span style={{ color: sikaai_colors.red }}>&nbsp;*</span>
                )}
              </FormLabel>
            )}
            <ReactSelect
              isMulti
              name={name}
              onChange={onChange}
              onBlur={onBlur}
              value={value || multiValue}
              options={options}
              placeholder={placeholder}
              ref={ref}
              styles={{
                control: baseStyles => ({
                  ...baseStyles,
                  minHeight: "50px",
                  borderColor: error
                    ? sikaai_colors.red
                    : sikaai_colors.gray_text,
                  borderRadius: "8px",
                  borderWidth: error ? "2px" : "1px",
                  ...style,
                }),
              }}
            />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
            {error?.message && (
              <FormErrorMessage>{t(error.message)}</FormErrorMessage>
            )}
          </FormControl>
        );
      }}
    />
  );
};

interface IMultiSelect extends SelectProps {
  placeholder?: string;
  options: ISelectOption[];
  label?: string;
  name?: string;
  error?: string;
  rules?: RegisterOptions;
  helperText?: string;
  isRequired?: boolean;
  selectControl?: any;
  style?: Record<string, string>;
  required?: boolean;
  multiValue?: { label: string; value: string }[];
}
export default MultiSelect;
