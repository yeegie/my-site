import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./header.module.scss";

import { ThemeButton } from "@/features/ui/themeButton";
import { Title } from "@/shared/ui/Title";

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Title>
        <NavLink to="/">_Berdovskiy</NavLink>
      </Title>
      <nav className={styles.navbar}>
        {/* <NavLink to='/#reviews'>Отзывы</NavLink> */}
        <NavLink to="/#works">Работы</NavLink>
      </nav>
      <div className={styles["theme-switcher"]}>
        <ThemeButton hover />
      </div>
    </header>
  );
};
