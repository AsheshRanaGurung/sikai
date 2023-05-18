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
import { useAuthentication } from "@sikaai/service/sikaai-auth";
import { useEffect } from "react";
import Spinner from "@sikaai/components/spinner";
import NonQuestionnaire from "@sikaai/pages/Services/NonQuestionnaire";
import ForumAnswer from "@sikaai/pages/Forum/ForumComment";
import Roles from "@sikaai/pages/roles";
import ContactUs from "@sikaai/pages/ContactUs";

const AppRoutes = () => {
  const { data: isAuthenticated, isFetching } = useAuthentication();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isFetching && !isAuthenticated) {
      // useLogoutMutation();
      navigate(NAVIGATION_ROUTES.LOGIN);
    }
  }, [isAuthenticated]);

  const routes = [
    {
      path: NAVIGATION_ROUTES.DASHBOARD,
      element: isAuthenticated ? (
        <Layout>
          <Dashboard />
        </Layout>
      ) : (
        <>hello</>
      ),
    },
    {
      path: NAVIGATION_ROUTES.PREMIUM_AD,
      element: isAuthenticated ? (
        <Layout>
          <PremiumAd />
        </Layout>
      ) : (
        <>hello</>
      ),
    },
    {
      path: NAVIGATION_ROUTES.ADVANCE_AD,
      element: isAuthenticated ? (
        <Layout>
          <AdvanceAd />
        </Layout>
      ) : (
        <>hello</>
      ),
    },
    {
      path: NAVIGATION_ROUTES.BASIC_AD,
      element: isAuthenticated ? (
        <Layout>
          <BasicAd />
        </Layout>
      ) : (
        <>hello</>
      ),
    },
    {
      path: NAVIGATION_ROUTES.FAQ,
      element: isAuthenticated ? (
        <Layout>
          <FAQ />
        </Layout>
      ) : (
        <>hello</>
      ),
    },
    {
      path: NAVIGATION_ROUTES.SERVICES,
      element: isAuthenticated ? (
        <Layout>
          <Services />
        </Layout>
      ) : (
        <>hello</>
      ),
    },
    {
      path: `${NAVIGATION_ROUTES.COURSES}/:service/:serviceId`,
      element: isAuthenticated ? (
        <Layout>
          <Courses />
        </Layout>
      ) : (
        <>hello</>
      ),
    },
    {
      path: `${NAVIGATION_ROUTES.SUBJECTS}/:service/:serviceId/:course/:courseId`,
      element: isAuthenticated ? (
        <Layout>
          <ServiceSection />
        </Layout>
      ) : (
        <>hello</>
      ),
    },
    {
      path: `${NAVIGATION_ROUTES.QUESTION_SET}/:service/:serviceId/:course/:courseId/:subject/:subjectId`,
      element: isAuthenticated ? (
        <Layout>
          <QuestionSet />
        </Layout>
      ) : (
        <>hello</>
      ),
    },
    {
      path: `${NAVIGATION_ROUTES.FORM}/:service/:id`,
      element: isAuthenticated ? (
        <Layout>
          <FormBased />
        </Layout>
      ) : (
        <>hello</>
      ),
    },
    {
      path: `${NAVIGATION_ROUTES.NON_QUESTIONNAIRE}/:service/:id`,
      element: isAuthenticated ? (
        <Layout>
          <NonQuestionnaire />
        </Layout>
      ) : (
        <>hello</>
      ),
    },
    {
      path: `${NAVIGATION_ROUTES.CREATE_QUESTION_SET}/:id`,
      element: isAuthenticated ? (
        <Layout>
          <Question />
        </Layout>
      ) : (
        <>hello</>
      ),
    },
    {
      path: `${NAVIGATION_ROUTES.MODEL_SET}/:service/:serviceId/:course/:courseId`,
      element: isAuthenticated ? (
        <Layout>
          <ModelSet />
        </Layout>
      ) : (
        <>hello</>
      ),
    },
    {
      path: NAVIGATION_ROUTES.ABROAD_STUDIES,
      element: isAuthenticated ? (
        <Layout>
          <AbroadStudies />
        </Layout>
      ) : (
        <>hello</>
      ),
    },
    {
      path: NAVIGATION_ROUTES.FORUM,
      element: isAuthenticated ? (
        <Layout>
          <Forum />
        </Layout>
      ) : (
        <>hello</>
      ),
    },
    {
      path: `${NAVIGATION_ROUTES.FORUM_ANSWER}/:id`,
      element: isAuthenticated ? (
        <Layout>
          <ForumAnswer />
        </Layout>
      ) : (
        <>hello</>
      ),
    },
    {
      path: NAVIGATION_ROUTES.ROLES,
      element: isAuthenticated ? (
        <Layout>
          <Roles />
        </Layout>
      ) : (
        <>hello</>
      ),
    },
    {
      path: NAVIGATION_ROUTES.ABOUT_US,
      element: isAuthenticated ? (
        <Layout>
          <AboutUs />
        </Layout>
      ) : (
        <>hello</>
      ),
    },
    {
      path: NAVIGATION_ROUTES.CONTACT_US,
      element: isAuthenticated ? (
        <Layout>
          <ContactUs />
        </Layout>
      ) : (
        <>hello</>
      ),
    },
    {
      path: NAVIGATION_ROUTES.LOGIN,
      element: <Login />,
    },
  ];

  if (isFetching) {
    return <Spinner />;
  }

  return useRoutes(routes);
};

export default AppRoutes;
