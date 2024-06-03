import styles from "./topPanel.module.scss";
import { useNavigate } from "react-router-dom";
import { ThemeButton } from "@/features/ui/themeButton";
import { IconButton } from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import LogoutIcon from "@mui/icons-material/Logout";

export const TopPanel: React.FC = () => {
  const navigate = useNavigate();
  const repository = ''  // import.meta.env.REPOSITORY;

  return (
    <div className={styles.panel}>
      <div className={styles["button-holder"]}>
        <IconButton onClick={() => (window.location.href = repository)}>
          <GitHubIcon />
        </IconButton>
        <ThemeButton />
        <IconButton
          onClick={() => {
            navigate("/logout");
          }}
        >
          <LogoutIcon />
        </IconButton>
      </div>
    </div>
  );
};
