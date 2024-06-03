import clsx from "clsx";
import styles from "./welcome.module.scss";

export const Welcome: React.FC = () => {
  return (
    <div className={styles.welcome}>
      <div className={styles.container}>
        <div id={styles["orbit-container"]}>
          <div className={styles["moon-orbit"]}>
            <img
              src="/moon.png"
              className={clsx(styles.moon, styles.unselectable)}
            />
          </div>
          <img
            src="/earth.gif"
            className={clsx(styles.earth, styles.unselectable)}
          />
        </div>
      </div>
    </div>
  );
};
