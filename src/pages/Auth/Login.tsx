import {
  Box,
  Button,
  Flex,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { sikaai_colors } from "@sikaai/theme/color";
import { SikaaiLoginIcon, SikaaiLogoIcon } from "@sikaai/assets/svgs";
import FormControl from "@sikaai/components/form/FormControl";
import { LoginDetails, useLoginMutation } from "@sikaai/service/sikaai-auth";
import { NAVIGATION_ROUTES } from "@sikaai/routes/routes.constant";
import { useNavigate } from "react-router-dom";
import httpStatus from "http-status";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TokenService from "@sikaai/service/service-token";

const defaultValues: LoginDetails = {
  email: "",
  password: "",
};

const schema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  TokenService.clearToken();
  const navigate = useNavigate();
  const { isOpen: isVisible, onToggle: onToggleVisibility } = useDisclosure();
  const { mutateAsync: initLogin, isLoading } = useLoginMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (loginDetails: LoginDetails) => {
    const response = await initLogin(loginDetails);
    if (response?.status === httpStatus.OK) {
      navigate(NAVIGATION_ROUTES.DASHBOARD, { replace: true });
    }
    reset(defaultValues);
  };

  return (
    <Box
      height={"100vh"}
      display="flex"
      justifyContent={"center"}
      alignItems="center"
    >
      <Flex w={"100rem"}>
        <Flex
          flex={1}
          flexDirection={"column"}
          gap={4}
          ml="6rem"
          mr="20rem"
          py={"2rem"}
        >
          <Box>
            <SikaaiLogoIcon />
            <Flex mt={6}>
              <Text
                fontSize={"20px"}
                color={sikaai_colors.black}
                fontWeight={400}
              >
                {"Welcome to"}&nbsp;
              </Text>
              <Text
                fontSize={"20px"}
                color={sikaai_colors.primary}
                mb={1}
                fontWeight={400}
              >
                {"Sikaai"}
              </Text>
            </Flex>
            <Text fontSize={"32px"} fontWeight={600} mb={1}>
              {"Sign in"}
            </Text>

            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <VStack pt={6} spacing={8}>
                <FormControl
                  control="input"
                  size="lg"
                  type="email"
                  register={register}
                  placeholder={"Email"}
                  label="Enter Your Email"
                  name="email"
                  error={errors?.email?.message ?? ""}
                />
                <FormControl
                  control="password"
                  register={register}
                  size="lg"
                  isVisible={isVisible}
                  onToggleVisibility={onToggleVisibility}
                  name="password"
                  placeholder={"Password"}
                  label="Enter your Password"
                  error={errors?.password?.message ?? ""}
                />

                <Button
                  type="submit"
                  variant="primaryLarge"
                  size="lg_fit"
                  isLoading={isLoading}
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
