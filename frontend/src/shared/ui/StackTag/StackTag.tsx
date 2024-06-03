import { StackTagProps } from "./StackTagProps";
import styles from "./StackTag.module.scss";
import clsx from "clsx";

export const StackTag: React.FC<StackTagProps> = ({
  title,
  gradient,
  mini,
}) => {
  let gradientStyle = {};

  if (gradient) {
    const [degree, colorStart, colorEnd] = gradient.split(","); // Gradietn looks like "90deg,#FFFFFF,#334455"

    gradientStyle = {
      background: `linear-gradient(${degree}, ${colorStart} 0%, ${colorEnd} 100%)`,
    };
  }

  return (
    <div
      className={clsx({
        [styles.tag]: !mini,
        [styles["tag-mini"]]: mini,
      })}
      style={{ ...gradientStyle }}
    >
      <p>{title ? title : "unnamed"}</p>
    </div>
  );
};
