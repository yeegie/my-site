import styles from "./layout.module.scss";

import { SkeletonTheme } from "react-loading-skeleton";
import { Outlet } from "react-router-dom";

import { Sidebar } from "@widgets/sidebar";
import { TopPanel } from "@widgets/topPanel";

import { SIDEBAR_CATEGORIES } from "@shared/consts/sidebar"

export const Layout = () => {
  return (
    <div>
      <SkeletonTheme baseColor="#ebebeb" highlightColor="#f5f5f5">
        <main className={styles["main-layout"]}>
          <Sidebar categories={SIDEBAR_CATEGORIES} />
          <div className={styles['main-content']}>
            <TopPanel />
            <Outlet />
          </div>
        </main>
      </SkeletonTheme>
    </div>
  );
};
