import styles from "./signin.module.scss";

import { FormAuth } from '@/features/ui/formAuth'

export const SigninPage = () => {
  return <div className={styles.singin}>
    <FormAuth type='signin' />
  </div>
};
