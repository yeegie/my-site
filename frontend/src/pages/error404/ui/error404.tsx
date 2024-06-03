import { Link } from "react-router-dom";
import styles from "./error404.module.scss";
import { Title } from "@shared/ui/Title";

export const Error404Page = () => {
  return (
    <div className={styles['blue-screen']}>
      <div className={styles.content}>
        <span className={styles['error-code']}>Error 404. Page not found.</span>
        <p className={styles['text-left']}>
          A fatal exception 0E has occurred at 0028:C0034B23. The current
          application will be terminated.
        </p>
        <ul className={styles['text-left']}>
          <li>* Press any key to terminate the current application.</li>
          <li>
            * Press CTRL+ALT+DEL again to restart your computer. You will lose
            any unsaved information in all applications.
          </li>
        </ul>
        <Link className={styles['goto-homepage']} to="/">
          Click on me to go to homepage
        </Link>
      </div>
    </div>
  );
};
