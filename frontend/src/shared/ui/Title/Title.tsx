import React from "react";
import { TitleProps } from "./Title.props";
import styles from "./Title.module.scss";

/**
 * ### Title just copied h1-6
 *
 * @param {number} size - (h)eader size, avaiable sizes 1-6. Default size is __1__.
 * @param {string} color - hex value like this __"#FFFFF"__.
 * @param {string} styleVariant - (h)eader variants. avaiable types is AvaiableVariants.
 *
 * @example
 * <Title>Some text</Title>
 * <Title size={2} color="#2F2F2F">Super some text</Title>
 */
export const Title: React.FC<TitleProps> = ({
  size,
  color,
  styleVariant,
  anchor,
  children,
}) => {
  const TitleTag = `h${size || 1}` as keyof JSX.IntrinsicElements;

  const titleClassName = styleVariant ? styles[styleVariant] : styles.title1;
  const titleColor = color ? { color: color } : {};

  return (
    <TitleTag
      id={anchor ? anchor : ""}
      className={titleClassName}
      style={titleColor}
    >
      {children}
    </TitleTag>
  );
};
