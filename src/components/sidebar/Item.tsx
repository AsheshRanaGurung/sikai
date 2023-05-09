import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ListItem, Link, Flex, Text } from "@chakra-ui/react";
import { sikaai_colors } from "@sikaai/theme/color";

const Item = ({
  name,
  to,
  icon,
  active,
  isCollapse,
  isChild,
}: {
  name: string;
  to: string;
  icon?: React.ReactNode;
  active: boolean;
  isCollapse?: boolean;
  isChild?: boolean;
}) => {
  const { t } = useTranslation();
  if (location.pathname === to) active = true;
  return (
    <Link as={RouterLink} to={to} color={sikaai_colors.white}>
      <ListItem
        display={"flex"}
        mr={4}
        ml={isChild ? 10 : 4}
        p={2}
        mb={3}
        borderRadius={9}
        bgColor={
          active
            ? isChild
              ? sikaai_colors.secondary
              : sikaai_colors.primary
            : ""
        }
        transition="all ease-in-out"
        color={
          active
            ? isChild
              ? sikaai_colors.light_gray_text
              : sikaai_colors.white
            : sikaai_colors.light_gray_text
        }
        sx={{
          "svg path": {
            transition: "all ease-in-out",
            fill: `${active ? sikaai_colors.white : ""}`,
          },
          "&:hover": {
            transition: "all ease-in-out",
            textDecoration: "none",
            color: isChild
              ? sikaai_colors.light_gray_text
              : sikaai_colors.white,
            bgColor: isChild ? sikaai_colors.secondary : sikaai_colors.primary,
            "svg path": {
              transition: "all ease-in-out",
              fill: `${name !== "Logout" ? sikaai_colors.white : ""}`,
            },
          },
        }}
        fontSize="15px"
        fontWeight="600"
      >
        <Flex alignItems="center" justify={isCollapse ? "center" : "left"}>
          {icon}
          {!isCollapse && (
            <Text ml={3} whiteSpace="nowrap">
              {t(name)}
            </Text>
          )}
        </Flex>
      </ListItem>
    </Link>
  );
};

export default Item;
