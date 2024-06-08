import { SkeletonTheme } from "react-loading-skeleton";
import { Outlet, } from "react-router-dom";

// import styles from "./layout.scss";

import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";

// const BASE_COLOR_LIGHT = '#ebebeb'
// const HIGHLIGT_COLOR_LIGHT = '#f5f5f5'

// const BASE_COLOR_DARK = '#202020'
// const HIGHLIGT_COLOR_DARK = '#44444480'

export const Layout = () => {
  return (
    <div>
      <SkeletonTheme baseColor="#ebebeb" highlightColor="#f5f5f5">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </SkeletonTheme>
    </div>
  );
};
