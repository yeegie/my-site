import styles from "./SocialIcon.module.scss";
import { SocialIconProps } from "./SocialIcon.props";

export const SocialIcon: React.FC<SocialIconProps> = ({ href, children }) => {
  return (
    <a href={href} className={styles.a}>
      {children}
    </a>
  );
};
