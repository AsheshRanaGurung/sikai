import { extendTheme } from "@chakra-ui/react";
import { sikaai_colors } from "./color";
import { buttonTheme } from "./Button";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bgColor: sikaai_colors.secondary,
        fontFamily: "'Urbanist', sans-serif",
      },
      a: {
        _hover: {
          textDecoration: "none !important",
          outline: "none !important",
          border: "0px !important",
        },
      },
      button: {
        _hover: {
          textDecoration: "none !important",
          outline: "none !important",
          border: "0px !important",
        },
        _focus: {
          outline: "none !important",
          border: "0px !important",
        },
      },
    },
  },
  components: {
    Button: buttonTheme,
  },
});
