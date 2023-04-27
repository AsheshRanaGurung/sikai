import { useRoutes } from "react-router-dom";
import { NAVIGATION_ROUTES } from "./routes.constant";
import Login from "@sikaai/pages/Auth/Login";
import Layout from "@sikaai/components/layouts/Layout";
import PremiumAd from "@sikaai/pages/Advertisement/PremiumAd";
import AdvanceAd from "@sikaai/pages/Advertisement/AdvanceAd";
import BasicAd from "@sikaai/pages/Advertisement/BasicAd";
import FAQ from "@sikaai/pages/FAQ";
import Services from "@sikaai/pages/Services";
import ServiceSection from "@sikaai/pages/Services/QuestionBased/Subjects";
import QuestionSet from "@sikaai/pages/Services/QuestionBased/QuestionSet";
import AbroadStudies from "@sikaai/pages/Services/FormBased";
import ModelSet from "@sikaai/pages/Services/QuestionBased/ModelSet";
import Courses from "@sikaai/pages/Services/QuestionBased/Courses";
import Question from "../pages/Services/QuestionBased/Questions/Question";
import Dashboard from "@sikaai/pages/Dashboard";
import FormBased from "@sikaai/pages/Services/FormBased";
import Forum from "@sikaai/pages/Forum";
import Forum_answer from "@sikaai/pages/ForumAnswer";

const routes = [
  {
    path: NAVIGATION_ROUTES.DASHBOARD,
    element: (
      <Layout>
        <Dashboard />
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
    path: NAVIGATION_ROUTES.FAQ,
    element: (
      <Layout>
        <FAQ />
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
    path: `${NAVIGATION_ROUTES.COURSES}/:service`,
    element: (
      <Layout>
        <Courses />
      </Layout>
    ),
  },
  {
    path: `${NAVIGATION_ROUTES.SUBJECTS}/:service/:course`,
    element: (
      <Layout>
        <ServiceSection />
      </Layout>
    ),
  },
  {
    path: `${NAVIGATION_ROUTES.QUESTION_SET}/:service/:course/:subject/:id`,
    element: (
      <Layout>
        <QuestionSet />
      </Layout>
    ),
  },
  {
    path: `${NAVIGATION_ROUTES.FORM}/:service/:id`,
    element: (
      <Layout>
        <FormBased />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.CREATE_QUESTION_SET,
    element: (
      <Layout>
        <Question />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.MODEL_SET,
    element: (
      <Layout>
        <ModelSet />
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
    path: NAVIGATION_ROUTES.FORUM,
    element: (
      <Layout>
        <Forum />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.FORUM_ANSWER,
    element: (
      <Layout>
        <Forum_answer />
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
