import { IMenuCategory } from "@/shared/types";

// icons

import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import WidgetsRoundedIcon from "@mui/icons-material/WidgetsRounded";

import HomeRepairServiceRoundedIcon from "@mui/icons-material/HomeRepairServiceRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";

// import LockRoundedIcon from "@mui/icons-material/LockRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

export const SIDEBAR_CATEGORIES: IMenuCategory[] = [
  {
    title: "Main",
    buttons: [
      {
        icon: <DashboardRoundedIcon />,
        text: "Dashboard",
        iconColor: "#de2114",
        href: "/admin",
      },
      {
        icon: <AssessmentRoundedIcon />,
        text: "Statistics",
        iconColor: "#c9702c",
        href: "/admin/statistics",
      },
      {
        icon: <WidgetsRoundedIcon />,
        text: "Widgets",
        iconColor: "#562cc9",
        href: "/admin/widgets",
      },
    ],
  },
  {
    title: "Data",
    buttons: [
      {
        icon: <HomeRepairServiceRoundedIcon />,
        text: "Works",
        iconColor: "#c92f2c",
        href: "/admin/work",
      },
      {
        icon: <ImageRoundedIcon />,
        text: "Images",
        iconColor: "#58c92c",
        href: "/admin/image",
      },
      {
        icon: <AccountCircleRoundedIcon />,
        text: "Users",
        iconColor: "#ff00a4",
        href: "/admin/user",
      },
    ],
  },
  {
    title: "Components",
    buttons: [
      {
        icon: <EditRoundedIcon />,
        text: "Editor",
        iconColor: "#2c7ac9",
        href: "/admin/components",
      },
    ],
  },
  {
    title: "General",
    buttons: [
      {
        icon: <ShieldRoundedIcon />,
        text: "Security",
        iconColor: "#2e2e2e",
        href: "/admin/security",
      },
      {
        icon: <SettingsRoundedIcon />,
        text: "Settings",
        iconColor: "#2e2e2e",
        href: "/admin/settings",
      },
    ],
  },
];
