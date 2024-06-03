import React from "react";

import { ParagraphProps } from "./Paragraph.props";

import styles from "./Paragraph.module.scss";

/**
 * ### Paragraph just copied p tag
 *
 * @param {string} fontSize - font size may be px, em, rem an other. Default __18pt__.
 * @param {string} color - hex value like this __"#FFFFF"__.
 * @param {string} styleVariant - paragraph variants. avaiable types is AvaiableVariant.
 * @param {boolean} frozen - make text uncoping. Default __false__.
 *
 * @example
 * <Paragraph>Some text</Paragraph>
 * <Paragraph fontSize="2rem">Some text</Paragraph>
 * <Paragraph fontSize="1.5rem" color="#FF0000" frozen>Boring some text 😴</Paragraph>
 */
export const Paragraph: React.FC<ParagraphProps> = ({
  fontSize,
  color,
  styleVariant,
  frozen,
  bold,
  children,
}) => {
  const paragraphClassName = styleVariant
    ? styles[styleVariant]
    : styles.paragraph1;
  const paragraphFontSize = fontSize ? fontSize : "18pt";
  const paragraphColor = color ? { color: color } : {};
  const paragraphWeigth = bold ? "bolder" : "normal";

  return (
    <p
      className={`${paragraphClassName} ${frozen ? styles.frozen : " "}`}
      style={{
        ...paragraphColor,
        fontSize: paragraphFontSize,
        fontWeight: paragraphWeigth,
      }}
    >
      {children}
    </p>
  );
};
