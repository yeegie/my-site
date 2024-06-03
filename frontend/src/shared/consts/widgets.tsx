import { IWidget } from "@shared/types";

import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import LanguageIcon from "@mui/icons-material/Language";
import ApiIcon from "@mui/icons-material/Api";
import HomeRepairServiceRoundedIcon from "@mui/icons-material/HomeRepairServiceRounded";
import TelegramIcon from "@mui/icons-material/Telegram";

export const WIDGETS: IWidget[] = [
  {
    title: "Unique users",
    valueFirst: 31,
    valueSecond: "+11",
    gradient: "#3F2B96,#A8C0FF",
    icon: <EmojiPeopleIcon />,
  },
  {
    title: "All users",
    valueFirst: 92,
    gradient: "#1d3cfd,#fc4545",
    icon: <LanguageIcon />,
  },
  {
    title: "Backend",
    valueFirst: "Active",
    gradient: "#008552,#9ebd13",
    icon: <ApiIcon />,
  },
  {
    title: "Works",
    valueFirst: 9,
    gradient: "#fd1d1d,#fcb045",
    icon: <HomeRepairServiceRoundedIcon />,
    href: "/admin/work",
  },
  {
    title: "Telgram",
    valueFirst: "@yeegie",
    gradient: "#008d8e,#00d4ff",
    icon: <TelegramIcon />,
  },
];
