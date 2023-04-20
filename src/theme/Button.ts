import { defineStyle, defineStyleConfig } from "@chakra-ui/react";
import { sikaai_colors } from "./color";

const baseStyles = {
  px: 3,
  py: 4,
  borderRadius: 8,
};

const primary = defineStyle({
  background: sikaai_colors.primary,
  color: sikaai_colors.white,
  // transition: "all 300ms ease-in-out",
  ...baseStyles,
  _disabled: {
    background: `${sikaai_colors.primary} !important`,
    color: `${sikaai_colors.white} !important`,
  },
  _hover: {
    background: sikaai_colors.secondary,
    color: sikaai_colors.primary,
  },
});

const primaryOutline = defineStyle({
  border: `1px solid  ${sikaai_colors.primary}`,
  color: sikaai_colors.primary,
  ...baseStyles,
  _hover: {
    background: sikaai_colors.secondary,
    color: sikaai_colors.primary,
  },
});

const reset = defineStyle({
  background: sikaai_colors.reset_btn_bg,
  color: sikaai_colors.reset_btn_txt,
  ...baseStyles,
  // transition: "all 300ms ease-in-out",
  _hover: {
    background: sikaai_colors.reset_btn_txt,
    color: sikaai_colors.reset_btn_bg,
  },
});

const secondary = defineStyle({
  background: sikaai_colors.secondary,
  color: sikaai_colors.primary,
  ...baseStyles,
  transition: "all 300ms ease-in-out",
  _hover: {
    background: sikaai_colors.primary,
    color: sikaai_colors.white,
    "svg path": {
      stroke: sikaai_colors.white,
    },
  },
});

const round = defineStyle({
  ...secondary,
  height: "34px",
  width: "34px",
  borderRadius: "50%",
});

export const buttonTheme = defineStyleConfig({
  variants: {
    primary,
    reset,
    primaryOutline,
    secondary,
    round,
  },
  sizes: {
    sm: {
      height: "40px",
      fontSize: 14,
      fontWeight: "500",
      width: 97,
    },
    md: {
      height: 12,
      fontSize: 14,
      fontWeight: "500",
      width: "fit-content",
    },
    fit: {
      height: "40px",
      fontSize: 14,
      fontWeight: "500",
      width: "fit-content",
    },
    lg_fit: {
      height: "50px",
      fontSize: 16,
      fontWeight: "600",
      width: "100%",
    },
    lg: {
      height: "40px",
      fontSize: 16,
      fontWeight: "600",
      width: "317px",
    },
  },

  defaultProps: {
    size: "sm",
    variant: "primary",
  },
});
