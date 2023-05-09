import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  BreadcrumbItem,
  Breadcrumb,
  BreadcrumbLink,
  Text,
  Flex,
  Button,
  Box,
  Divider,
  Icon,
} from "@chakra-ui/react";
import { NotificationIcon } from "@sikaai/assets/svgs";

import { sikaai_colors } from "@sikaai/theme/color";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface IBreadCrumb {
  items: { name: string; route: string }[];
  goBack?: string;
  title: { name: string; route: string };
}

export const BreadCrumb = ({ items, goBack, title }: IBreadCrumb) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box pb={6} my={6}>
      <Flex justifyContent="space-between" alignItems="center" height={4}>
        <Breadcrumb spacing={1} separator={""}>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Flex alignItems={"center"}>
                <Text
                  fontWeight={700}
                  color={sikaai_colors.primary}
                  fontSize={"32px"}
                  onClick={() => navigate(title.route)}
                >
                  {title.name}
                </Text>
                {items.length != 0 && (
                  <Divider
                    orientation="vertical"
                    borderColor={sikaai_colors.black}
                    height={"30px"}
                    mx={2}
                    borderWidth="1px"
                  />
                )}
              </Flex>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {items.map((item, i) => (
            <BreadcrumbItem key={i}>
              <BreadcrumbLink onClick={() => navigate(item.route)}>
                <Text fontWeight={700} color={sikaai_colors.primary}>
                  {item.name}
                </Text>
              </BreadcrumbLink>
              {items.length - 1 !== i && (
                <Icon
                  as={ChevronRightIcon}
                  color={sikaai_colors.light_gray_text}
                  fontSize="xl"
                  pb={0.5}
                  ml={2}
                />
              )}
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
        <Flex
          bgColor={sikaai_colors.white}
          borderRadius={"30px"}
          width={"48px"}
          height={"48px"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Icon as={NotificationIcon} fontSize="2xl"></Icon>
        </Flex>
        {goBack && (
          <Button
            size={"xs"}
            onClick={() => {
              navigate(goBack);
            }}
          >
            {t("global_goBack")}
          </Button>
        )}
      </Flex>
    </Box>
  );
};
