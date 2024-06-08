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
    icon && React.isValidElement(icon)
      ? React.cloneElement(icon, {
          style: iconColor ? { fill: iconColor } : undefined,
        } as React.HTMLAttributes<HTMLElement>)
      : null;

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
