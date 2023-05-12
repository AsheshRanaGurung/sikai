import { useNavigate, useRoutes } from "react-router-dom";
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
import AboutUs from "@sikaai/pages/AboutUs";
import {
  useAuthentication,
  useLogoutMutation,
} from "@sikaai/service/sikaai-auth";
import { useEffect } from "react";
import Spinner from "@sikaai/components/spinner";
import NonQuestionnaire from "@sikaai/pages/Services/NonQuestionnaire";
import ForumAnswer from "@sikaai/pages/Forum/ForumComment";
import Roles from "@sikaai/pages/roles";
import ContactUs from "@sikaai/pages/ContactUs";

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
    path: `${NAVIGATION_ROUTES.COURSES}/:service/:serviceId`,
    element: (
      <Layout>
        <Courses />
      </Layout>
    ),
  },
  {
    path: `${NAVIGATION_ROUTES.SUBJECTS}/:service/:serviceId/:course/:courseId`,
    element: (
      <Layout>
        <ServiceSection />
      </Layout>
    ),
  },
  {
    path: `${NAVIGATION_ROUTES.QUESTION_SET}/:service/:serviceId/:course/:courseId/:subject/:subjectId`,
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
    path: `${NAVIGATION_ROUTES.NON_QUESTIONNAIRE}/:service/:id`,
    element: (
      <Layout>
        <NonQuestionnaire />
      </Layout>
    ),
  },
  {
    path: `${NAVIGATION_ROUTES.CREATE_QUESTION_SET}/:id`,
    element: (
      <Layout>
        <Question />
      </Layout>
    ),
  },
  {
    path: `${NAVIGATION_ROUTES.MODEL_SET}/:service/:serviceId/:course/:courseId`,
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
    path: `${NAVIGATION_ROUTES.FORUM_ANSWER}/:id`,
    element: (
      <Layout>
        <ForumAnswer />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.ROLES,
    element: (
      <Layout>
        <Roles />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.ABOUT_US,
    element: (
      <Layout>
        <AboutUs />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.CONTACT_US,
    element: (
      <Layout>
        <ContactUs />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.LOGIN,
    element: <Login />,
  },
];

const AppRoutes = () => {
  const { data: isAuthenticated, isFetching } = useAuthentication();
  const navigate = useNavigate();
  useEffect(() => {
    if (typeof isAuthenticated === "boolean" && !isAuthenticated) {
      useLogoutMutation();
      navigate(NAVIGATION_ROUTES.LOGIN);
    }
  }, [isAuthenticated]);

  if (isFetching) {
    return <Spinner />;
  }

  return useRoutes(routes);
};

export default AppRoutes;
