import { NAVIGATION_ROUTES } from "@sikaai/routes/routes.constant";
import { useNavigate } from "react-router-dom";

const navigateLogin = () => {
  console.log("here");

  const navigate = useNavigate();
  navigate(NAVIGATION_ROUTES.LOGIN);
};

export default navigateLogin;
