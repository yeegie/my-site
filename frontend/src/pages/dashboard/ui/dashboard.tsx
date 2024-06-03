import styles from "./dashboard.module.scss";

import { WIDGETS } from "@shared/consts/widgets"
import { WidgetCard } from "@entities/widget";

export const DashboardPage = () => {
  const widgetsList = WIDGETS
    ? WIDGETS.map((widget, index) => (
        <WidgetCard
          key={index}
          title={widget.title}
          valueFirst={widget.valueFirst}
          valueSecond={widget.valueSecond}
          icon={widget.icon}
          gradient={widget.gradient}
          href={widget.href}
        />
      ))
    : null;

  return (
    <div className={styles.page}>
      {widgetsList ? (
        <div className={styles["widget-holder"]}>{widgetsList}</div>
      ) : null}
    </div>
  );
};
