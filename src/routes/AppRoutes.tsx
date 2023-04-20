import { useRoutes } from "react-router-dom";
import { NAVIGATION_ROUTES } from "./routes.constant";
import Dashboard from "@sikaai/pages/Dashboard";
import Login from "@sikaai/pages/Auth/Login";
import Layout from "@sikaai/components/layouts/Layout";
import PremiumAd from "@sikaai/pages/Advertisement/PremiumAd";
import AdvanceAd from "@sikaai/pages/Advertisement/AdvanceAd";
import BasicAd from "@sikaai/pages/Advertisement/BasicAd";
import Services from "@sikaai/pages/Services";
import ServiceSection from "@sikaai/pages/Services/CMAT/AddSection";
import QuestionSet from "@sikaai/pages/Services/CMAT/QuestionSet";
import AddQuestionSet from "@sikaai/pages/Services/CMAT/AddQuestionSet";
import AbroadStudies from "@sikaai/pages/Services/AbroadStudies";
import Test from "../pages";

const routes = [
  {
    path: NAVIGATION_ROUTES.DASHBOARD,
    element: (
      <Layout>
        <Test />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.PREMIUM_AD,
    element: (
      <Layout>
        <PremiumAd />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.ADVANCE_AD,
    element: (
      <Layout>
        <AdvanceAd />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.BASIC_AD,
    element: (
      <Layout>
        <BasicAd />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.SERVICES,
    element: (
      <Layout>
        <Services />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.CMAT_SECTION,
    element: (
      <Layout>
        <ServiceSection />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.QUESTION_SET,
    element: (
      <Layout>
        <QuestionSet />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.CREATE_QUESTION_SET,
    element: (
      <Layout>
        <AddQuestionSet />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.ABROAD_STUDIES,
    element: (
      <Layout>
        <AbroadStudies />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.LOGIN,
    element: <Login />,
  },
];

const AppRoutes = () => {
  return useRoutes(routes);
};

export default AppRoutes;
