import { WorkCardProps } from "./workCard.props";
// import { NavLink } from 'react-router-dom';
import { NavLinkUp } from "@/shared/ui/NavLinkUp";

import styles from "./workCard.module.scss";

import { Title } from "@/shared/ui/Title";
import { Paragraph } from "@/shared/ui/Paragraph";
import { StackTag } from "@/shared/ui/StackTag";

export const WorkCard: React.FC<WorkCardProps> = ({
  id,
  title,
  description_short,
  image,
  stack,
  editMode,
}) => {
  const stack_list = stack?.map((stack) => (
    <StackTag
      key={stack.id}
      title={stack.title}
      gradient={stack.gradient}
      mini
    />
  ));

  const API_URL = import.meta.env.VITE_API_URL;
  const workUrl = editMode ? `/admin/work/${id}` : `/work/${id}`;
  const preview =
    image && image.length > 0 ? (
      <img src={`${API_URL}${image[0].full_path}`} />
    ) : null;

  return (
    <NavLinkUp to={workUrl} className={styles.card}>
      <div>
        {preview}
        <div>
          {title ? <Title size={2}>{title}</Title> : null}
          {stack ? (
            <div className={styles["stack-group"]}>{stack_list}</div>
          ) : null}
          {description_short ? (
            <Paragraph fontSize="15pt">{description_short}</Paragraph>
          ) : null}
        </div>
      </div>
    </NavLinkUp>
  );
};
