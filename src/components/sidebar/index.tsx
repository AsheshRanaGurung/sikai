import { Box, List, ListItem, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { NAVIGATION_ROUTES } from "@sikaai/routes/routes.constant";
import { sikaai_colors } from "@sikaai/theme/color";
import NavItem from "./NavItem";
import { images } from "@sikaai/assets/images";
import {
  AdvertisementIcon,
  DashboardIcon,
  DocumentTextIcon,
  LogoutIcon,
  MessageQuestionIcon,
  ServiceIcon,
  SettingsIcon,
} from "@sikaai/assets/svgs";

const Sidebar = ({
  isCollapse,
  isHovered,
  onEnterSidebar,
  onExitSidebar,
  width,
}: ISidebar) => {
  const navItems = [
    {
      name: "Dashboard",
      to: NAVIGATION_ROUTES.DASHBOARD,
      icon: <DashboardIcon />,
      visible: true,
    },
    {
      name: "Services",
      to: NAVIGATION_ROUTES.SERVICES,
      icon: <ServiceIcon />,
      visible: true,
    },
    {
      name: "Advertisement",
      to: NAVIGATION_ROUTES.ADVERTISEMENT,
      icon: <AdvertisementIcon />,
      visible: true,
      child: [
        {
          name: "Premium Ad",
          to: NAVIGATION_ROUTES.PREMIUM_AD,
          visible: true,
        },
        {
          name: "Advance Ad",
          to: NAVIGATION_ROUTES.ADVANCE_AD,
          visible: true,
        },
        {
          name: "Basic Ad",
          to: NAVIGATION_ROUTES.BASIC_AD,
          visible: true,
        },
      ],
    },
    {
      name: "FAQ",
      to: NAVIGATION_ROUTES.FAQ,
      icon: <MessageQuestionIcon />,
      visible: true,
    },
    {
      name: "Forum",
      to: NAVIGATION_ROUTES.FORUM,
      icon: <DocumentTextIcon />,
      visible: true,
    },
    {
      name: "Settings",
      to: NAVIGATION_ROUTES.SETTINGS,
      icon: <SettingsIcon />,
      visible: true,
    },
    {
      name: "Logout",
      to: NAVIGATION_ROUTES.LOGOUT,
      icon: <LogoutIcon />,
      visible: true,
    },
  ];

  return (
    <Box
      w={width}
      maxW={width}
      color={sikaai_colors.sidebar_text}
      sx={{
        "&::-webkit-scrollbar": {
          width: "3px",
          backgroundColor: sikaai_colors.primary,
        },
      }}
      transitionDuration="0.3s"
      position={"relative"}
      maxH="100vh"
      overflowY={"auto"}
      onMouseEnter={onEnterSidebar}
      onMouseLeave={onExitSidebar}
      bgColor={sikaai_colors.white}
    >
      <List>
        <ListItem mx={3} my={6}>
          <Link as={RouterLink} to={NAVIGATION_ROUTES.DASHBOARD}>
            <img src={images.logo} alt="logo" />
          </Link>
        </ListItem>
        {navItems.map((item) => (
          <NavItem
            key={item.name}
            {...item}
            isCollapse={isCollapse && !isHovered}
          />
        ))}
      </List>
    </Box>
  );
};

interface ISidebar {
  isCollapse: boolean;
  onEnterSidebar: () => void;
  onExitSidebar: () => void;
  isHovered: boolean;
  width: string;
}

export default Sidebar;
