import { useRoutes } from "react-router-dom";
import { NAVIGATION_ROUTES } from "./routes.constant";
import Dashboard from "@sikaai/pages/Dashboard";
import Login from "@sikaai/pages/Auth/Login";
import Layout from "@sikaai/components/layouts/Layout";
import PremiumAd from "@sikaai/pages/Advertisement/PremiumAd";
import AdvanceAd from "@sikaai/pages/Advertisement/AdvanceAd";
import BasicAd from "@sikaai/pages/Advertisement/BasicAd";
import FAQ from "@sikaai/pages/FAQ";
import CreateFAQ from "@sikaai/pages/FAQ/CreateFAQ";

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
    path: NAVIGATION_ROUTES.FAQ_CREATE,
    element: (
      <Layout>
        <CreateFAQ />
      </Layout>
    ),
  },
  {
    path: NAVIGATION_ROUTES.FAQ_CREATE,
    element: (
      <Layout>
        <CreateFAQ />
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
