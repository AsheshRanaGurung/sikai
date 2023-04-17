import {
  Box,
  Button,
  Flex,
  HStack,
  Spacer,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { sikaai_colors } from "@sikaai/theme/color";
import { SikaaiLoginIcon, SikaaiLogoIcon } from "@sikaai/assets/svgs";
import FormControl from "@sikaai/components/form/FormControl";

const Login = () => {
  const { t } = useTranslation();
  const { isOpen: isVisible, onToggle: onToggleVisibility } = useDisclosure();

  const { register } = useForm({
    mode: "onBlur",
  });

  return (
    <Box
      height={"100vh"}
      display="flex"
      justifyContent={"center"}
      alignItems="center"
    >
      <Flex w={"74rem"}>
        <Flex flex={1} flexDirection={"column"} gap={4} mx="6rem" py={"2rem"}>
          <Box>
            <SikaaiLogoIcon />
            <Flex mt={6}>
              <Text
                fontSize={"20px"}
                color={sikaai_colors.black}
                mb={3}
                fontWeight={400}
              >
                {"Welcome to"}&nbsp;
              </Text>
              <Text
                fontSize={"20px"}
                color={sikaai_colors.primary}
                mb={3}
                fontWeight={400}
              >
                {"Sikaai"}
              </Text>
            </Flex>
            <Text fontSize={"32px"} fontWeight={600} mb={1}>
              {"Sign in"}
            </Text>

            <form>
              <VStack pt={6} spacing={5}>
                <FormControl
                  control="input"
                  size="lg"
                  type="email"
                  register={register}
                  placeholder={"Email"}
                  label={t("Enter Your Email")}
                  name="email"
                  // error={t(errors?.email?.message ?? "")}
                />
                <FormControl
                  control="password"
                  register={register}
                  size="lg"
                  isVisible={isVisible}
                  onToggleVisibility={onToggleVisibility}
                  name="password"
                  placeholder={"Password"}
                  label={t("Enter your Password")}
                  // error={t(errors?.password?.message ?? "")}
                />

                <HStack width={"100%"}>
                  <Spacer />
                  {t("forgotPasswordText")}
                </HStack>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  // isLoading={isLoading}
                >
                  {"Sign in"}
                </Button>
              </VStack>
            </form>
          </Box>
        </Flex>

        <Box flex={1}>
          <Flex direction={"column"} color={sikaai_colors.white}>
            <SikaaiLoginIcon />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Login;
