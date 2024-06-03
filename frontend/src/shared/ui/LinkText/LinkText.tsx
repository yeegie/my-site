import { LinkTextProps } from "./LinkText.props";
import styles from "./LinkText.module.scss";

/** ### LinkText copyied tag - a
 *
 * @param {string} size - size in this format: pt, px and other. default 18pt.
 * @param {string} color - color in hex or string format. default color is __white__.
 * @param {string} url - link. default is __*__.
 * @param {string} styleVariant - style variant for LinkText.
 *
 * @example
 * <LinkText url="/work">Work</LinkText>
 * <LinkText url="/reviews" styleVariant="variant1" color="red" size="12pt">Work</LinkText>
 */
export const LinkText: React.FC<LinkTextProps> = ({
  size,
  color,
  url,
  styleVariant,
  children,
}) => {
  const sizeLinkText = size ? size : "18pt"; // default 18 pt
  const colorLinkText = color ? color : "white"; // default white
  const linkClassName = styleVariant ? styleVariant : styles.link1;
  const href = url ? url : "*";

  return (
    <a
      href={href}
      className={linkClassName}
      style={{
        fontSize: sizeLinkText,
        color: colorLinkText,
      }}
    >
      {children}
    </a>
  );
};
