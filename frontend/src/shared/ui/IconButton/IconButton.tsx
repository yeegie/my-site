import React from "react";

import styles from "./IconButton.module.scss";
import { IconButtonProps } from "./IconButton.props";
import { Button } from "@mui/material";

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  iconColor,
  text,
  onClick,
  href,
}) => {
  const coloredIcon =
    React.isValidElement(icon) && iconColor
      ? React.cloneElement(icon, {
          style: {
            fill: iconColor,
          },
        })
      : React.cloneElement(icon);

  return (
    <Button
      className={styles.button}
      startIcon={coloredIcon}
      href={href}
      onClick={onClick}
      disableRipple
    >
      {text}
    </Button>
  );
};
