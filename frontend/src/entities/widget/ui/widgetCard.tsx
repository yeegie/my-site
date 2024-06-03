import React from "react";

import styles from "./widgetCard.module.scss";
import { widgetUniqueUsersProps } from "./widgetCard.props";

import { Title } from "@shared/ui/Title";
import { Paragraph } from "@shared/ui/Paragraph";
import { Link } from "react-router-dom";

export const WidgetCard: React.FC<widgetUniqueUsersProps> = ({
  title,
  valueFirst,
  valueSecond,
  icon,
  gradient,
  href,
}) => {
  let gradientStyle = {};

  if (gradient) {
    const [colorStart, colorEnd] = gradient.split(","); // Gradietn looks like "#FFFFFF,#334455"

    gradientStyle = {
      background: `linear-gradient(90deg, ${colorStart} 0%, ${colorEnd} 100%)`,
    };
  }

  const second_value =
    valueSecond && gradient ? (
      <div
        className={styles.second}
        style={{ background: gradient.split(",")[0] + 80 }}
      >
        <Title>{valueSecond}</Title>
      </div>
    ) : null;

  const coloredIcon =
    React.isValidElement(icon) && gradient
      ? React.cloneElement(icon, {
          style: {
            fill: gradient.split(",")[0] + 80,
          },
        })
      : icon;

  return (
    <Link to={href ? href : ""}>
      <div className={styles.widget} style={gradientStyle}>
        <div className={styles.content}>
          <Paragraph>{title}</Paragraph>
          <div>
            <Title>{valueFirst}</Title>
            {second_value}
          </div>
        </div>
        <div className={styles.icon}>{coloredIcon}</div>
      </div>
    </Link>
  );
};
