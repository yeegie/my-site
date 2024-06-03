import React from "react";
import styles from "./LinkButton.module.scss";
import { LinkButtonProps } from "./LinkButton.props";
import clsx from "clsx";

import LinkIcon from "@mui/icons-material/Link";
import GitHubIcon from "@mui/icons-material/GitHub";

export const LinkButton: React.FC<LinkButtonProps> = ({ type, title, url }) => {
  const types = {
    github: "GitHub",
    url: "Link",
  };

  const icon_types = {
    github: <GitHubIcon />,
    url: <LinkIcon />,
  };

  return (
    <a
      href={url}
      className={clsx(styles["link-button"], {
        [styles.github]: type === "github",
        [styles.url]: type === "url",
      })}
    >
      {icon_types[type]}
      <span>{title ? title : types[type]}</span>
    </a>
  );
};
