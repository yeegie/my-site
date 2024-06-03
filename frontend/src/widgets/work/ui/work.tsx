import styles from "./work.module.scss";
import { WorkCard } from "@entities/work";
import { WorkProps } from "./work.props";
import clsx from "clsx";

export const Work: React.FC<WorkProps> = ({ works, editMode, className }) => {
  const work_list = works.map((work) => (
    <WorkCard
      key={work.id}
      id={work.id}
      title={work.title}
      description_short={work.description_short}
      image={work.image}
      stack={work.stack}
      editMode={editMode ? editMode : false}
    />
  ));

  return <div className={clsx(
    styles.content,
    className
  )}>{work_list}</div>;
};
